// Everything the sale page says lives here, in both languages.

export const DOMAIN = 'duvar.com'
export const SITE_URL = 'https://www.duvar.com'

// Set to a number (e.g. 25000) to show a fixed asking price; null = "open to offers".
export const ASKING_PRICE: number | null = null
export const PRICE_CURRENCY = 'USD'

// Contact details, base64-encoded so they aren't sitting in the HTML for
// scrapers — they're decoded in the browser after the page loads.
// Encode with: node -e "console.log(btoa('teklif@example.com'))"
// TODO: replace the placeholders with the real email and phone (+90…, digits/spaces only).
export const CONTACT = {
  email: 'b3JuZWtAZXBvc3RhLmNvbQ==', // ornek@eposta.com
  phone: 'KzkwIDUwMCAwMDAgMDAgMDA=', // +90 500 000 00 00
}

export const LANGS = ['tr', 'en'] as const
export type Lang = (typeof LANGS)[number]

export const COPY = {
  tr: {
    locale: 'tr-TR',
    title: 'duvar.com satılık — tek kelime, beş harf, .com',
    description:
      'duvar.com alan adı satılık. Kısa, akılda kalıcı, herkesin bildiği bir Türkçe kelime. İnşaat, dekorasyon, medya ve güvenlik markaları için ideal. Teklifinizi iletin.',
    badge: 'Satılık alan adı',
    sale: 'satılık.',
    sign: 'Satılık',
    signSub: 'alan adı',
    tagline: 'Herkesin bildiği bir kelime. Şimdi sizin markanız olabilir.',
    sub: 'Beş harf, tek kelime, .com. Markanızı ilk günden akılda kalan, güven veren bir adres üzerine kurun.',
    cta: 'Teklif ver',
    openToOffers: 'Ciddi tekliflere açık',
    priceFixed: (p: string) => `Fiyat: ${p}`,
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
    contactEyebrow: 'Teklif ver',
    contactTitle: '<em>duvar.com</em> sizin olsun.',
    contactBody: 'Fiyat ve devir süreci için e-posta, telefon ya da WhatsApp üzerinden ulaşın. Her ciddi teklife dönüş yapılır.',
    contactNote: 'Ödeme ve alan adı devri, isterseniz güvenli emanet (escrow) hizmeti üzerinden yapılabilir.',
    email: 'E-posta',
    phone: 'Telefon',
    whatsapp: 'WhatsApp',
    mailSubject: 'duvar.com teklifi',
    waText: 'Merhaba, duvar.com alan adı için teklif vermek istiyorum.',
    footer: 'Bu alan adı satılıktır.',
  },
  en: {
    locale: 'en-US',
    title: 'duvar.com is for sale — one word, five letters, .com',
    description:
      'The domain duvar.com is for sale. Short, memorable, a word every Turkish speaker knows. Ideal for construction, décor, media and security brands. Make an offer.',
    badge: 'Domain for sale',
    sale: 'is for sale.',
    sign: 'For sale',
    signSub: 'domain name',
    tagline: 'A word everyone knows. Now it can be your brand.',
    sub: '“Duvar” means wall in Turkish. Five letters, one word, .com — build your brand on an address that sticks from day one.',
    cta: 'Make an offer',
    openToOffers: 'Open to serious offers',
    priceFixed: (p: string) => `Price: ${p}`,
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
    contactEyebrow: 'Make an offer',
    contactTitle: 'Make <em>duvar.com</em> yours.',
    contactBody: 'Get in touch by email, phone or WhatsApp to discuss price and transfer. Every serious offer gets a reply.',
    contactNote: 'Payment and transfer can go through a secure escrow service if you prefer.',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    mailSubject: 'Offer for duvar.com',
    waText: 'Hi, I would like to make an offer for duvar.com.',
    footer: 'This domain is for sale.',
  },
} as const

export function formatPrice(amount: number, currency: string, locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}
