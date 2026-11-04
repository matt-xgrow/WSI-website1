# Production SEO behaviour

This document describes what changes at go-live. Nothing in this file is an instruction to deploy, attach a domain, or change DNS. Those steps stay with the person doing the cutover.

## Canonical host

- Canonical origin is always `https://wsicleaning.com` (no www, trailing slash).
- `src/proxy.ts` sends one 301 when the host is `www.wsicleaning.com` or the forwarded protocol is `http`, and it applies the path map in the same hop.
- Uppercase paths and missing trailing slashes also 301 in that same response.
- `trailingSlash: true` is set, and `skipTrailingSlashRedirect` is set so Next.js does not add a second 308.
- `/sitemap_index.xml` 301s to `/sitemap.xml`.
- Nothing under `/_next/` is redirected or returned as 410.

## Indexing

`X-Robots-Tag: noindex, nofollow` is sent unless both of these are true:

- `VERCEL_ENV` is `production`
- the request host is exactly `wsicleaning.com`

Preview, staging and the `*.vercel.app` production alias stay noindex. `robots.txt` disallows all crawling when `VERCEL_ENV` is not `production`. On production it allows `/` and points at `https://wsicleaning.com/sitemap.xml`.

Ads landing pages are `noindex` in the HTML and, on the production host, `noindex, follow` in the header. They are omitted from the sitemap.

`/thank-you/` is `noindex, follow` in both the HTML robots meta and the `X-Robots-Tag` header, including on production.

## Tracking

The layout loads:

- GTM `GTM-M9FBSTTS` once
- GA4 `G-JCY0TFZGHZ` once, on a single `gtag.js`

The published GTM container already loads Google Ads `AW-738839583`. This site does not call `gtag('config')` or `gtag('event', 'conversion')` for Ads. The thank-you conversion `AW-738839583/dFcSCO6hqsYDEJ-Yp-AC` is fired by GTM when the URL contains `thank-you`. There is no `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`. GTM currently has that conversion tag twice; pausing one of them is a GTM change, not a code change.

The WhatsApp button keeps `whatsapp-button` and also uses `joinchat__button`, which is the class the existing GTM WhatsApp triggers listen for.

Clixtell (`scripts.clixtell.com/track.js`) is injected by a custom HTML tag inside GTM-M9FBSTTS. It is not in this repository. Delaying it until window load has to be done in GTM (change that tag's trigger from Page View to Window Loaded). The site cannot defer a script that GTM injects during its own page-view tag.

## Quote form

The form posts to the same HighLevel webhook as the live site:

`https://services.leadconnectorhq.com/hooks/6ksBbMfBYrXKzD7guCyk/webhook-trigger/6bfc99c0-fcce-4629-8dd5-9317512cdd68`

`gclid` and `utm_*` are stored for the session and included on the webhook and on the redirect to `/thank-you/`.

## Google Business Profile fields

`gbpProfile` in `src/lib/site.ts` is the place to paste `sameAs` (Maps, Facebook, Instagram) and the street, locality and postcode from the GBP. Empty strings are omitted from the JSON-LD. `aggregateRating` is not emitted.

## Redirect test

```bash
node scripts/test-redirects.mjs https://<preview-host>
```

The script reads `data/url-map.csv`. `quote.wsicleaning.com` rows and rows marked `IGNORAR` are skipped. It also checks that `/_next/` is absent from the redirect map, that the live font file is not a 410, and that `/sitemap_index.xml` 301s to `/sitemap.xml`.

## Go-live checklist (do not run these from this change)

1. Publish a Production deployment (merge to the production branch, or `vercel --prod`). A preview build keeps `Disallow: /` in `robots.txt`.
2. In Vercel → Domains, set `wsicleaning.com` as the primary production domain and set `www.wsicleaning.com` to redirect to it. If www is the primary domain, the host will not match `wsicleaning.com` and the whole site stays noindex.
3. Before the DNS cutover, with the domain already attached in Vercel, confirm the production deployment does not send a robots header and that robots allows crawling:

```bash
curl -skI --resolve wsicleaning.com:443:76.76.21.21 https://wsicleaning.com/
curl -sk --resolve wsicleaning.com:443:76.76.21.21 https://wsicleaning.com/robots.txt
```

The header response must not include `x-robots-tag`. The robots body must be `Allow: /` plus the sitemap. Repeat both checks on day 0 after DNS is updated. Do not change DNS, MX, or the `quote` record as part of that test.
