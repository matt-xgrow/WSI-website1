#!/usr/bin/env node
/**
 * Validate data/url-map.csv against a base URL (the Vercel preview or local server).
 *
 * Usage:
 *   node scripts/test-redirects.mjs https://preview.example.vercel.app
 *
 * Does not follow redirect chains. A 301 must land on the final path in one hop.
 * quote.wsicleaning.com rows are phase 2 and are reported as skipped, not failed.
 * http/www wildcard rows are checked only when the base host is wsicleaning.com.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const baseArg = process.argv[2];
if (!baseArg) {
  console.error("Usage: node scripts/test-redirects.mjs <baseUrl>");
  process.exit(2);
}

const base = new URL(baseArg.endsWith("/") ? baseArg : `${baseArg}/`);
const csvPath = resolve(process.cwd(), "data/url-map.csv");
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
    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
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

function pathOf(url) {
  if (!url || url.includes("*")) return null;
  const parsed = new URL(url);
  return parsed.pathname || "/";
}

function samePath(actual, expected) {
  const norm = (value) => {
    if (!value) return "";
    if (value.length > 1 && value.endsWith("/")) return value.slice(0, -1);
    return value;
  };
  return norm(actual) === norm(expected);
}

const rows = parseCsv(text);
const results = { pass: 0, fail: 0, skip: 0, failures: [] };

async function check(row) {
  const action = row.action || "";
  const oldUrl = row.old_url || "";
  const host = (() => {
    try {
      return new URL(oldUrl).host;
    } catch {
      return "";
    }
  })();

  if (
    host === "quote.wsicleaning.com" ||
    action.startsWith("Fase") ||
    action.startsWith("manter") ||
    action.startsWith("IGNORAR")
  ) {
    results.skip += 1;
    return;
  }

  if (oldUrl.startsWith("http://") || host === "www.wsicleaning.com") {
    if (base.hostname !== "wsicleaning.com") {
      results.skip += 1;
      return;
    }
  }

  const oldPath = pathOf(oldUrl);
  const newPath = row.proposed_new_url ? pathOf(row.proposed_new_url) : null;
  if (!oldPath) {
    results.skip += 1;
    return;
  }

  const target = new URL(oldPath, base);
  let response;
  try {
    response = await fetch(target, {
      redirect: "manual",
      headers: {
        "user-agent": "wsi-redirect-test",
        ...(process.env.REDIRECT_COOKIE ? { cookie: process.env.REDIRECT_COOKIE } : {}),
      },
    });
  } catch (error) {
    results.fail += 1;
    results.failures.push(`${oldPath} network error: ${error.message}`);
    return;
  }

  const location = response.headers.get("location");
  let locationPath = "";
  if (location) {
    try {
      locationPath = new URL(location, target).pathname;
    } catch {
      locationPath = location;
    }
  }

  const fail = (message) => {
    results.fail += 1;
    results.failures.push(`${oldPath} ${message} (got ${response.status} -> ${locationPath || "-"})`);
  };

  if (action === "410") {
    if (response.status !== 410) fail("expected 410");
    else results.pass += 1;
    return;
  }

  if (action.startsWith("404")) {
    const bare = oldPath.replace(/\/$/, "") || "/";
    const vercelBlocksWp = ["/wp-admin", "/wp-login.php", "/wp-json", "/xmlrpc.php"].includes(bare);
    if (response.status === 404 || (response.status === 403 && vercelBlocksWp)) {
      results.pass += 1;
    } else fail("expected 404");
    return;
  }

  const isRedirect =
    action.startsWith("301") ||
    (oldPath.replace(/\/$/, "") === "/privacy" && newPath?.replace(/\/$/, "") === "/privacy-policy");

  if (isRedirect) {
    if (response.status !== 301) {
      fail(`expected 301 to ${newPath}`);
      return;
    }
    if (!samePath(locationPath, newPath)) {
      fail(`expected location ${newPath}`);
      return;
    }
    results.pass += 1;
    return;
  }

  // keep, recreate, create, noindex: final URL must be 200.
  // A single trailing-slash or lowercase hop to the canonical path is allowed.
  let final = response;
  let hops = 0;
  let currentPath = oldPath;
  while (final.status >= 300 && final.status < 400 && hops < 2) {
    const nextLocation = final.headers.get("location");
    if (!nextLocation) break;
    const nextUrl = new URL(nextLocation, target);
    if (nextUrl.hostname !== base.hostname) {
      fail(`redirect left the base host for ${nextUrl.href}`);
      return;
    }
    currentPath = nextUrl.pathname;
    final = await fetch(nextUrl, {
      redirect: "manual",
      headers: {
        "user-agent": "wsi-redirect-test",
        ...(process.env.REDIRECT_COOKIE ? { cookie: process.env.REDIRECT_COOKIE } : {}),
      },
    });
    hops += 1;
  }

  const canonical = newPath || oldPath;
  if (final.status !== 200) {
    fail(`expected 200 at ${canonical}`);
    return;
  }
  if (!samePath(currentPath, canonical)) {
    fail(`ended on ${currentPath}, expected ${canonical}`);
    return;
  }
  if (hops > 1) {
    fail("more than one redirect hop");
    return;
  }
  if (action.includes("noindex")) {
    const robots = final.headers.get("x-robots-tag") || "";
    const html = await final.text();
    const metaNoindex = /noindex/i.test(html);
    if (!/noindex/i.test(robots) && !metaNoindex) {
      fail("expected noindex");
      return;
    }
  }
  results.pass += 1;
}

const concurrency = 8;
let index = 0;
async function worker() {
  while (index < rows.length) {
    const current = index;
    index += 1;
    await check(rows[current]);
  }
}
await Promise.all(Array.from({ length: concurrency }, () => worker()));

const map = JSON.parse(readFileSync(resolve(process.cwd(), "src/lib/redirects.json"), "utf8"));
const nextPaths = [
  ...Object.keys(map.redirects || {}),
  ...(map.gone || []),
].filter((path) => path.startsWith("/_next"));
if (nextPaths.length) {
  results.fail += 1;
  results.failures.push(`/_next must not be redirected or 410: ${nextPaths.join(", ")}`);
}

const headers = {
  "user-agent": "wsi-redirect-test",
  ...(process.env.REDIRECT_COOKIE ? { cookie: process.env.REDIRECT_COOKIE } : {}),
};
const fontUrl = new URL("/_next/static/media/caa3a2e1cccd8315-s.p.09~u27dqhyhd6.woff2", base);
const fontResponse = await fetch(fontUrl, { redirect: "manual", headers });
if (fontResponse.status === 410 || fontResponse.status >= 300 && fontResponse.status < 400) {
  results.fail += 1;
  results.failures.push(`font path must not redirect or 410 (got ${fontResponse.status})`);
} else if (fontResponse.status !== 200) {
  results.fail += 1;
  results.failures.push(`font path expected 200 (got ${fontResponse.status})`);
} else {
  results.pass += 1;
}

const sitemapUrl = new URL("/sitemap_index.xml", base);
const sitemapResponse = await fetch(sitemapUrl, { redirect: "manual", headers });
const sitemapLocation = sitemapResponse.headers.get("location") || "";
if (sitemapResponse.status === 301 && samePath(new URL(sitemapLocation, sitemapUrl).pathname, "/sitemap.xml")) {
  results.pass += 1;
} else {
  results.fail += 1;
  results.failures.push(`sitemap_index.xml expected 301 to /sitemap.xml (got ${sitemapResponse.status} -> ${sitemapLocation})`);
}

console.log(JSON.stringify({
  base: base.origin,
  rows: rows.length,
  pass: results.pass,
  fail: results.fail,
  skip: results.skip,
  failures: results.failures.slice(0, 40),
}, null, 2));

process.exit(results.fail === 0 ? 0 : 1);
