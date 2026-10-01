# duvar.com — domain-for-sale page

Single-page Nuxt 4 site advertising duvar.com for sale. Design borrowed from sylow.net (`/Users/sylow/Work/sylow/sylow.net/ui`) with a brick-terracotta accent.

## Where things live
- `app/data/domain.ts` — all copy + settings. `ASKING_PRICE` (null = "make an offer"), `MIN_OFFER`, currencies, facts, use cases, steps.
- `app/pages/index.vue` — the page + SEO meta.
- `app/components/OfferForm.vue` — offer form (honeypot, min time on page, localStorage rate limit + dedup — ported from sylow's SiteContact.vue).
- `app/assets/css/{tokens,site}.css` — tokens (from sylow, accent swapped) + page styles.

## Offer form
POSTs JSON to the sylow forms API: `https://api.sylow.net/api/v1/forms/duvar.com/offer` (override with `NUXT_PUBLIC_FORMS_ENDPOINT`). Payload: `domain, name, email, offer, currency, note, message`. The offer is prepended to `message` because the API's Telegram ping only shows name/email/message.
Production origins (`https://www.duvar.com`, `https://duvar.com`) must be in the API's `FORMS_ALLOWED_ORIGINS` (`sylow.net/api/config/deploy.yml`), or the browser blocks the POST.

## Commands
- `npm run dev` · `npm run build` (→ `.vercel/output`, deploy with `vercel deploy --prebuilt`)
- Not yet linked to a Vercel project. Do NOT copy sylow.net's `.vercel/project.json`.
