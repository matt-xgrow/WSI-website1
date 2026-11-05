#!/usr/bin/env node
/**
 * Build src/lib/redirects.json from data/url-map.csv.
 * Only apex wsicleaning.com rows become redirects or 410s.
 * quote.wsicleaning.com, www/http wildcards, IGNORAR, Fase 2 and WP 404 rows are skipped.
 * Destinations are flattened so nothing in the map points at another redirect.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const csvPath = resolve(process.cwd(), "data/url-map.csv");
const outPath = resolve(process.cwd(), "src/lib/redirects.json");
const text = readFileSync(csvPath, "utf8");

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') inQuotes = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") field += char;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows.filter((item) => item.some((cell) => cell.trim()));
  return body.map((cells) =>
    Object.fromEntries(header.map((key, index) => [key, cells[index] ?? ""])),
  );
}

function barePath(url) {
  const parsed = new URL(url);
  let path = parsed.pathname || "/";
  try {
    path = decodeURIComponent(path);
  } catch {
    /* keep raw */
  }
  path = path.toLowerCase();
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}

function withSlash(path) {
  if (path === "/") return "/";
  const last = path.split("/").pop() ?? "";
  if (last.includes(".")) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

const redirects = {};
const gone = new Set();

for (const row of parseCsv(text)) {
  const action = (row.action || "").trim();
  const oldUrl = (row.old_url || "").trim();
  if (!oldUrl || oldUrl.includes("*")) continue;

  let host = "";
  try {
    host = new URL(oldUrl).host;
  } catch {
    continue;
  }
  if (host !== "wsicleaning.com") continue;
  if (
    action.startsWith("IGNORAR") ||
    action.startsWith("Fase") ||
    action.startsWith("manter") ||
    action.startsWith("404")
  ) {
    continue;
  }

  const source = barePath(oldUrl);
  if (source.startsWith("/_next")) continue;

  if (action === "410" || action.startsWith("410")) {
    if (source !== "/") gone.add(source);
    continue;
  }

  const proposed = (row.proposed_new_url || "").trim();
  if (!proposed) continue;
  const destination = barePath(proposed);
  if (destination === source) continue;

  const isRedirect =
    action.startsWith("301") ||
    action.includes("301") ||
    action.startsWith("CRIAR");
  if (!isRedirect) continue;

  redirects[source] = withSlash(destination);
}

// Preserved outside the CSV: old Yoast index, already enforced in proxy.ts.
redirects["/sitemap_index.xml"] = "/sitemap.xml";

function flatten(path) {
  let current = path;
  const seen = new Set();
  while (seen.size < 8) {
    const key = current.length > 1 && current.endsWith("/") ? current.slice(0, -1) : current;
    if (seen.has(key)) throw new Error(`redirect loop at ${path}`);
    seen.add(key);
    const next = redirects[key];
    if (!next) return withSlash(key === "/" ? "/" : key);
    current = next;
  }
  throw new Error(`redirect chain too long from ${path}`);
}

for (const [source, destination] of Object.entries(redirects)) {
  const flat = flatten(destination);
  if (gone.has(flat.length > 1 && flat.endsWith("/") ? flat.slice(0, -1) : flat)) {
    throw new Error(`${source} redirects to a 410 (${flat})`);
  }
  redirects[source] = flat;
}

for (const source of Object.keys(redirects)) {
  const destKey =
    redirects[source] === "/"
      ? "/"
      : redirects[source].replace(/\/$/, "");
  if (redirects[destKey]) {
    throw new Error(`chain remains: ${source} -> ${redirects[source]} -> ${redirects[destKey]}`);
  }
}

const orderedRedirects = Object.fromEntries(
  Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b)),
);
const orderedGone = [...gone].sort((a, b) => a.localeCompare(b));

writeFileSync(
  outPath,
  `${JSON.stringify({ redirects: orderedRedirects, gone: orderedGone }, null, 2)}\n`,
);

console.log(
  JSON.stringify(
    {
      redirects: Object.keys(orderedRedirects).length,
      gone: orderedGone.length,
    },
    null,
    2,
  ),
);
