import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import redirectData from "@/lib/redirects.json";

const CANONICAL_HOST = "wsicleaning.com";
const CANONICAL_ORIGIN = "https://wsicleaning.com";

const REDIRECTS: Record<string, string> = {
  ...(redirectData.redirects as Record<string, string>),
  "/sitemap_index.xml": "/sitemap.xml",
};
const GONE = new Set(
  (redirectData.gone as string[]).filter((path) => !path.startsWith("/_next")),
);

const NOINDEX_PATHS = new Set([
  "/thank-you",
  "/house-washing-brisbane",
  "/house-washing-brisbane-lp",
  "/pressure-washing-brisbane-lp",
  "/window-cleaning-brisane-lp",
]);

function stripSlash(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname || "/";
}

function hasFileExtension(pathname: string) {
  const last = pathname.split("/").pop() ?? "";
  return last.includes(".");
}

function requestHostname(request: NextRequest) {
  const host = request.headers.get("host") ?? request.nextUrl.host;
  return host.split(":")[0]?.toLowerCase() ?? "";
}

function isProductionIndexHost(hostname: string) {
  return process.env.VERCEL_ENV === "production" && hostname === CANONICAL_HOST;
}

function applyRobots(response: NextResponse, host: string, barePath: string) {
  if (barePath === "/thank-you") {
    response.headers.set("X-Robots-Tag", "noindex, follow");
    return response;
  }
  if (!isProductionIndexHost(host) || NOINDEX_PATHS.has(barePath)) {
    response.headers.set(
      "X-Robots-Tag",
      NOINDEX_PATHS.has(barePath) && isProductionIndexHost(host)
        ? "noindex, follow"
        : "noindex, nofollow",
    );
  }
  return response;
}

export function proxy(request: NextRequest) {
  const hostname = requestHostname(request);
  const rawPath = request.nextUrl.pathname;
  let decoded = rawPath;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch {
    decoded = rawPath;
  }

  const barePath = stripSlash(decoded.toLowerCase()) || "/";

  // Never redirect or 410 Next internals. A previous URL map marked a live font as gone.
  if (barePath.startsWith("/_next") || decoded.toLowerCase().startsWith("/_next")) {
    return applyRobots(NextResponse.next(), hostname, barePath);
  }

  if (barePath === "/api" || barePath.startsWith("/api/")) {
    return applyRobots(NextResponse.next(), hostname, barePath);
  }

  const mapped = REDIRECTS[barePath];
  const gone = GONE.has(barePath);

  let targetPath: string | null = null;
  if (mapped) {
    targetPath = mapped;
  } else if (!gone && !hasFileExtension(barePath) && !barePath.startsWith("/.well-known")) {
    targetPath = barePath === "/" ? "/" : `${barePath}/`;
  }

  const proto = (
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "")
  ).toLowerCase();

  const onCanonicalHost =
    hostname === CANONICAL_HOST || hostname === `www.${CANONICAL_HOST}`;
  const hostChanged = onCanonicalHost && hostname !== CANONICAL_HOST;
  const protoChanged = onCanonicalHost && proto === "http";
  const pathChanged = Boolean(targetPath) && decoded !== targetPath;

  if (gone) {
    const response = new NextResponse("Gone", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
    return applyRobots(response, hostname, barePath);
  }

  if (targetPath && (pathChanged || hostChanged || protoChanged)) {
    const origin = onCanonicalHost ? CANONICAL_ORIGIN : request.nextUrl.origin;
    const url = new URL(targetPath, origin);
    url.search = request.nextUrl.search;
    const response = NextResponse.redirect(url, 301);
    return applyRobots(response, hostname, stripSlash(targetPath));
  }

  return applyRobots(NextResponse.next(), hostname, barePath);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
