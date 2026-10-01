# duvar.com — domain-for-sale page

Single-page Nuxt 4 site advertising duvar.com for sale. Turkish by default, TR/EN switch in the top bar (choice saved in localStorage `duvar-lang`). Sections: hero (domain, pitch, fixed price, outline brick wall with a SATILIK sign and the price on a hanging tag), why duvar.com, who it fits (sector chips), contact (email only — the owner asked for no phone). No form, no logo. Fonts/tokens borrowed from sylow.net (`/Users/sylow/Work/sylow/sylow.net/ui`) with a brick-terracotta accent. Light/dark follows the system setting.

## Where things live
- `app/data/domain.ts` — settings (`ASKING_PRICE` null = "open to offers", `CONTACT`) and all copy in `COPY.tr` / `COPY.en`. Add strings to both.
- `app/composables/useLang.ts` — current language + `t` (copy for that language).
- `app/components/HeroWall.vue` — the hero brick wall, sale sign and price tag.
- `app/components/ContactOptions.vue` — the email link. The address is base64 in `CONTACT_EMAIL` (domain.ts) and decoded only in the browser, so they're not in the server HTML. Don't simplify.
- `app/pages/index.vue` — the page + SEO meta.
- `app/assets/css/{tokens,site}.css` — tokens (from sylow, accent swapped) + page styles.

## Commands
- `npm run dev` · `npm run build` (→ `.vercel/output`, deploy with `vercel deploy --prebuilt`)
- Not yet linked to a Vercel project. Do NOT copy sylow.net's `.vercel/project.json`.
