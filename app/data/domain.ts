// Everything the sale page says lives here, in both languages.

export const DOMAIN = 'duvar.com'
export const SITE_URL = 'https://www.duvar.com'

// Fixed asking price, shown in the hero and contact block. null = "open to offers" mode.
export const ASKING_PRICE: number | null = 20000
export const PRICE_CURRENCY = 'USD'

// Contact email, base64-encoded so it isn't sitting in the HTML for
// scrapers — it's decoded in the browser after the page loads.
// Encode with: node -e "console.log(btoa('name@example.com'))"
export const CONTACT_EMAIL = 'c2FoaW5kYUBpY2xvdWQuY29t'

export const LANGS = ['tr', 'en'] as const
export type Lang = (typeof LANGS)[number]

export const COPY = {
  tr: {
    locale: 'tr-TR',
    title: 'duvar.com satılık — tek kelime, beş harf, .com',
    description:
      'duvar.com alan adı satılık. Kısa, akılda kalıcı, herkesin bildiği bir Türkçe kelime. İnşaat, dekorasyon, medya ve güvenlik markaları için ideal. Sabit fiyat: 20.000 USD.',
    badge: 'Satılık alan adı',
    sale: 'satılık.',
    sign: 'Satılık',
    signSub: 'alan adı',
    tagline: 'Herkesin bildiği bir kelime. Şimdi sizin markanız olabilir.',
    sub: 'Beş harf, tek kelime, .com. Markanızı ilk günden akılda kalan, güven veren bir adres üzerine kurun.',
    cta: 'Teklif ver',
    ctaBuy: 'Satın al',
    openToOffers: 'Ciddi tekliflere açık',
    priceLabel: 'Sabit fiyat',
    whyEyebrow: 'Neden duvar.com?',
    whyTitle: 'Akılda kalan bir isim, <em>sağlam</em> bir temel.',
    why: [
      { title: 'Kısa ve akılda kalıcı', body: 'Söylemesi, yazması ve hatırlaması kolay. Yanlış yazılma ihtimali neredeyse yok; bir kez duyan bir daha unutmaz.' },
      { title: 'Herkesin bildiği bir kelime', body: 'Türkiye’de herkesin her gün kullandığı bir kelime. Tanınırlık için reklam bütçesi harcamanıza gerek kalmaz.' },
      { title: '.com güveni', body: 'Dünyanın en bilinen ve en çok güvenilen uzantısı. İnsanlar bir adresi tahmin ederken önce .com yazar.' },
      { title: 'Kalıcı bir dijital varlık', body: 'Tek kelimelik .com alan adları sınırlıdır ve yeni üretilemez. Doğru isim, yıllar boyunca değer taşır.' },
    ],
    fitsEyebrow: 'Kimler için?',
    fitsTitle: 'Bir kelime, <em>birçok</em> sektör.',
    fits: ['İnşaat', 'Yapı market', 'Mimarlık', 'Dekorasyon', 'Duvar kağıdı', 'Boya', 'Tablo & sanat', 'Emlak', 'Sosyal medya', 'Güvenlik duvarı', 'Haber & medya'],
    contactEyebrow: 'Satın al',
    contactTitle: '<em>duvar.com</em> sizin olsun.',
    contactBody: 'Satın almak ya da devir sürecini konuşmak için e-posta ile ulaşın.',
    contactNote: 'Ödeme ve alan adı devri, isterseniz güvenli emanet (escrow) hizmeti üzerinden yapılabilir.',
    email: 'E-posta',
    mailSubject: 'duvar.com satın alma',
    footer: 'Bu alan adı satılıktır.',
  },
  en: {
    locale: 'en-US',
    title: 'duvar.com is for sale — one word, five letters, .com',
    description:
      'The domain duvar.com is for sale. Short, memorable, a word every Turkish speaker knows. Ideal for construction, décor, media and security brands. Fixed price: 20,000 USD.',
    badge: 'Domain for sale',
    sale: 'is for sale.',
    sign: 'For sale',
    signSub: 'domain name',
    tagline: 'A word everyone knows. Now it can be your brand.',
    sub: '“Duvar” means wall in Turkish. Five letters, one word, .com — build your brand on an address that sticks from day one.',
    cta: 'Make an offer',
    ctaBuy: 'Buy now',
    openToOffers: 'Open to serious offers',
    priceLabel: 'Fixed price',
    whyEyebrow: 'Why duvar.com?',
    whyTitle: 'A memorable name, a <em>solid</em> foundation.',
    why: [
      { title: 'Short and memorable', body: 'Easy to say, type and remember. Almost impossible to misspell — hear it once and it stays.' },
      { title: 'A word everyone knows', body: 'Every Turkish speaker uses it every day. Instant recognition without spending on ads.' },
      { title: 'The trust of .com', body: 'The best-known, most trusted extension in the world. When people guess an address, they type .com first.' },
      { title: 'A lasting digital asset', body: 'One-word .com domains are finite and can’t be made new. The right name holds its value for years.' },
    ],
    fitsEyebrow: 'Who is it for?',
    fitsTitle: 'One word, <em>many</em> industries.',
    fits: ['Construction', 'Building supplies', 'Architecture', 'Interior design', 'Wallpaper', 'Paint', 'Wall art', 'Real estate', 'Social media', 'Firewall & security', 'News & media'],
    contactEyebrow: 'Buy now',
    contactTitle: 'Make <em>duvar.com</em> yours.',
    contactBody: 'To buy it or talk through the transfer, get in touch by email.',
    contactNote: 'Payment and transfer can go through a secure escrow service if you prefer.',
    email: 'Email',
    mailSubject: 'Buying duvar.com',
    footer: 'This domain is for sale.',
  },
} as const

export function formatPrice(amount: number, currency: string, locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}
