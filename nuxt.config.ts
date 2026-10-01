export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  future: { compatibilityVersion: 4 },

  modules: ['@nuxt/fonts', '@nuxtjs/robots'],

  css: ['~/assets/css/tokens.css', '~/assets/css/site.css'],

  site: {
    url: 'https://www.duvar.com',
    name: 'duvar.com',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'tr' },
      bodyAttrs: { class: 'wordy' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#A4462A' }],
    },
  },

  fonts: {
    families: [
      { name: 'Instrument Serif', provider: 'google', weights: [400], styles: ['normal', 'italic'] },
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] },
    ],
  },

  robots: {
    allow: '/',
  },

  nitro: {
    preset: 'vercel',
  },

  runtimeConfig: {
    public: {
      // Offer form endpoint — the shared sylow forms API. Override locally with
      // NUXT_PUBLIC_FORMS_ENDPOINT (e.g. http://localhost:3013/api/v1/forms/duvar.com/offer).
      // Production origins must be in the API's FORMS_ALLOWED_ORIGINS.
      formsEndpoint: 'https://api.sylow.net/api/v1/forms/duvar.com/offer',
    },
  },

  typescript: {
    strict: true,
  },
});
