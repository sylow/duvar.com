// Everything the sale page says lives here, in both languages.

export const DOMAIN = 'duvar.com'
export const SITE_URL = 'https://www.duvar.com'

// Set to a number (e.g. 25000) to show a fixed asking price; null = "make an offer".
export const ASKING_PRICE: number | null = null
export const PRICE_CURRENCY = 'USD'

// Offers below this (in PRICE_CURRENCY) are rejected client-side. null = no floor.
export const MIN_OFFER: number | null = null

export const CURRENCIES = ['USD', 'EUR', 'TRY'] as const
export type Currency = (typeof CURRENCIES)[number]

export const LANGS = ['tr', 'en'] as const
export type Lang = (typeof LANGS)[number]

export const COPY = {
  tr: {
    locale: 'tr-TR',
    title: 'duvar.com satılık',
    description: 'duvar.com alan adı satılık. Kısa, akılda kalıcı, tek kelime. Teklifinizi iletin.',
    badge: 'Satılık alan adı',
    tagline: 'Kısa, akılda kalıcı, tek kelime.',
    sub: 'Bu alan adı satılıktır. Teklifinizi aşağıdaki formdan iletebilirsiniz.',
    priceFixed: (p: string) => `Fiyat: ${p}`,
    name: 'Adınız',
    namePh: 'Ad Soyad',
    email: 'E-posta',
    emailPh: 'siz@ornek.com',
    offer: 'Teklifiniz',
    note: 'Not',
    optional: 'isteğe bağlı',
    notePh: 'duvar.com ile ne yapmayı düşünüyorsunuz?',
    send: 'Teklif gönder',
    sending: 'Gönderiliyor…',
    success: 'Teklifiniz alındı. En kısa sürede e-posta ile dönüş yapılacak.',
    errName: 'Lütfen adınızı yazın.',
    errEmail: 'Lütfen geçerli bir e-posta adresi yazın.',
    errOffer: 'Lütfen teklif tutarını yazın.',
    errMin: (p: string) => `Teklifler ${p} üzerinden başlar.`,
    errTooFast: 'Lütfen teklifinizi gözden geçirmek için bir saniye bekleyin.',
    errHourly: 'Birkaç teklif gönderdiniz — hepsi ulaştı. Yakında dönüş yapılacak.',
    errCooldown: (s: number) => `Yeni teklif göndermeden önce lütfen ${s} sn bekleyin.`,
    errDuplicate: 'Bu teklifi zaten gönderdiniz, tekrar göndermenize gerek yok.',
    errGeneric: 'Bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.',
    errNetwork: 'Bağlantı hatası. Lütfen biraz sonra tekrar deneyin.',
    footer: 'Bu alan adı satılıktır.',
  },
  en: {
    locale: 'en-US',
    title: 'duvar.com is for sale',
    description: 'The domain duvar.com is for sale. Short, memorable, one word. Make an offer.',
    badge: 'Domain for sale',
    tagline: 'Short, memorable, one word.',
    sub: '"Duvar" means wall in Turkish. This domain is for sale — send your offer below.',
    priceFixed: (p: string) => `Price: ${p}`,
    name: 'Your name',
    namePh: 'Jane Doe',
    email: 'Email',
    emailPh: 'you@company.com',
    offer: 'Your offer',
    note: 'Note',
    optional: 'optional',
    notePh: 'What would you build on duvar.com?',
    send: 'Send offer',
    sending: 'Sending…',
    success: "Offer received. You'll get a reply by email soon.",
    errName: 'Please enter your name.',
    errEmail: 'Please enter a valid email address.',
    errOffer: 'Please enter your offer amount.',
    errMin: (p: string) => `Offers start at ${p}.`,
    errTooFast: 'Please take a moment to review your offer.',
    errHourly: "You've sent a few offers already — they arrived. You'll hear back soon.",
    errCooldown: (s: number) => `Please wait ${s}s before sending another offer.`,
    errDuplicate: "You've already sent this offer — no need to resend.",
    errGeneric: 'Something went wrong. Please try again in a moment.',
    errNetwork: 'Network error. Please try again in a moment.',
    footer: 'This domain is for sale.',
  },
} as const

export function formatPrice(amount: number, currency: string, locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}
