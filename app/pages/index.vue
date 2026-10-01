<script setup lang="ts">
import { ASKING_PRICE, DOMAIN, LANGS, PRICE_CURRENCY, SITE_URL, formatPrice } from '~/data/domain'

const { lang, t, setLang } = useLang()
useTheme()

useSeoMeta({
  title: () => t.value.title,
  description: () => t.value.description,
  ogType: 'website',
  ogUrl: SITE_URL,
  ogTitle: () => t.value.title,
  ogDescription: () => t.value.description,
  ogSiteName: DOMAIN,
  ogLocale: 'tr_TR',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: { lang },
  link: [{ rel: 'canonical', href: SITE_URL }],
})

const price = computed(() =>
  ASKING_PRICE ? t.value.priceFixed(formatPrice(ASKING_PRICE, PRICE_CURRENCY, t.value.locale)) : null,
)

function goToContact() {
  document.getElementById('teklif')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="shell">
    <header class="top">
      <div class="lang" role="group" aria-label="Dil / Language">
        <button
          v-for="l in LANGS" :key="l" type="button"
          :class="{ on: lang === l }" :aria-pressed="lang === l" @click="setLang(l)"
        >{{ l.toUpperCase() }}</button>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="hero-text">
          <p class="badge"><span class="dot" />{{ t.badge }}</p>
          <h1 class="domain">duvar<span>.com</span></h1>
          <p class="tagline">{{ t.tagline }}</p>
          <p class="sub">{{ t.sub }}</p>
          <div class="hero-actions">
            <button type="button" class="btn" @click="goToContact">{{ t.cta }}</button>
            <span class="hero-note">{{ price ?? t.openToOffers }}</span>
          </div>
        </div>
        <HeroWall />
      </section>

      <section class="section wrap">
        <p class="eyebrow">{{ t.whyEyebrow }}</p>
        <h2 class="h2" v-html="t.whyTitle" />
        <div class="why">
          <article v-for="(w, i) in t.why" :key="w.title" class="why-item">
            <span class="why-num">0{{ i + 1 }}</span>
            <h3>{{ w.title }}</h3>
            <p>{{ w.body }}</p>
          </article>
        </div>
      </section>

      <section class="section wrap">
        <p class="eyebrow">{{ t.fitsEyebrow }}</p>
        <h2 class="h2" v-html="t.fitsTitle" />
        <ul class="chips">
          <li v-for="f in t.fits" :key="f">{{ f }}</li>
        </ul>
      </section>

      <section id="teklif" class="section wrap">
        <div class="cta">
          <div class="cta-glow" />
          <p class="eyebrow">{{ t.contactEyebrow }}</p>
          <h2 class="h2" v-html="t.contactTitle" />
          <p class="cta-body">{{ t.contactBody }}</p>
          <ContactOptions />
          <p class="cta-note">{{ t.contactNote }}</p>
        </div>
      </section>
    </main>

    <footer class="foot">© {{ new Date().getFullYear() }} duvar.com · {{ t.footer }}</footer>
  </div>
</template>
