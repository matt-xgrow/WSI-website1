# Production SEO behaviour

This document describes what changes at go-live. It does not change DNS, attach the production domain, or deploy production.

## Canonical host

- Canonical origin is always `https://wsicleaning.com` (no www, trailing slash).
- `src/proxy.ts` sends one 301 when the host is `www.wsicleaning.com` or the forwarded protocol is `http`, and it applies the path map in the same hop.
- Uppercase paths and missing trailing slashes also 301 in that same response.
- `trailingSlash: true` is set, and `skipTrailingSlashRedirect` is set so Next.js does not add a second 308.

Attaching `wsicleaning.com` and `www.wsicleaning.com` in the Vercel project is a go-live step. It is not done in this change. Until the domain is attached, www and http cannot be tested on the preview hostname.

## Indexing

`X-Robots-Tag: noindex, nofollow` is sent unless both of these are true:

- `VERCEL_ENV` is `production`
- the request host is exactly `wsicleaning.com`

Preview, staging and the `*.vercel.app` production alias stay noindex. `robots.txt` disallows all crawling when `VERCEL_ENV` is not `production`. On production it allows `/` and points at `https://wsicleaning.com/sitemap.xml`.

Ads landing pages and `/thank-you/` are `noindex` in the HTML and in the response header even on the production host, and they are omitted from the sitemap.

## Tracking

The layout loads:

- GTM `GTM-M9FBSTTS` once
- GA4 `G-JCY0TFZGHZ` once, on a single `gtag.js`

A Lighthouse run against this build showed the GTM container already requests `gtag/js?id=AW-738839583`. Google Ads is therefore not configured a second time in the page. If that tag is later removed from GTM, add one `gtag('config', 'AW-738839583')` next to the GA4 config so Ads is still loaded once.

## Google Ads conversion

`/thank-you/` fires a conversion only when `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` is set to the real label (the part after `AW-738839583/`). The old placeholder `AW-CONVERSION_ID/CONVERSION_LABEL` is not sent.

## Quote form

The form posts to the same HighLevel webhook as the live site:

`https://services.leadconnectorhq.com/hooks/6ksBbMfBYrXKzD7guCyk/webhook-trigger/6bfc99c0-fcce-4629-8dd5-9317512cdd68`

`gclid` and `utm_*` are stored for the session and included on the webhook and on the redirect to `/thank-you/`.

## Redirect test

```bash
node scripts/test-redirects.mjs https://<preview-host>
```

The script reads `data/url-map.csv`. `quote.wsicleaning.com` rows are skipped (phase 2).
