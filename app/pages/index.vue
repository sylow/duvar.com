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
</script>

<template>
  <div class="shell">
    <header class="top">
      <a class="brand" href="/" aria-label="duvar.com">
        <DuvarLogo :size="34" />
        <span>duvar</span>
      </a>
      <div class="lang" role="group" aria-label="Dil / Language">
        <button
          v-for="l in LANGS" :key="l" type="button"
          :class="{ on: lang === l }" :aria-pressed="lang === l" @click="setLang(l)"
        >{{ l.toUpperCase() }}</button>
      </div>
    </header>

    <main class="main">
      <p class="badge">{{ t.badge }}</p>
      <h1 class="domain">duvar<span>.com</span></h1>
      <p class="tagline">{{ t.tagline }}</p>
      <p class="sub">{{ t.sub }}</p>
      <p v-if="price" class="price">{{ price }}</p>

      <OfferForm />
    </main>

    <footer class="foot">© {{ new Date().getFullYear() }} duvar.com · {{ t.footer }}</footer>
  </div>
</template>
