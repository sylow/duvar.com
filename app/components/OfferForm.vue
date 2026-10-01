<script setup lang="ts">
import { CURRENCIES, DOMAIN, MIN_OFFER, PRICE_CURRENCY, formatPrice, type Currency } from '~/data/domain'

const { lang, t } = useLang()

// Posts to the shared sylow forms API (site "duvar.com", form "offer").
// The API stores the JSON verbatim and pings Telegram with name/email/message,
// so the offer amount is also prepended to `message` to show up in the ping.
const FORM_ENDPOINT = useRuntimeConfig().public.formsEndpoint

const MIN_NAME = 2
const MIN_SECONDS_ON_PAGE = 3
const COOLDOWN_MS = 60_000           // 60s between sends
const HOURLY_CAP = 3                 // max 3 sends per hour from same browser
const STORAGE_KEY = 'duvar-offer-state'
// Same as the browser's built-in email regex (HTML5 input[type=email])
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const form = reactive({
  name: '',
  email: '',
  offer: '',
  currency: PRICE_CURRENCY as Currency,
  message: '',
  website: '', // honeypot
})
const touched = reactive({ name: false, email: false, offer: false })
const submitAttempted = ref(false)
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const mountedAt = Date.now()

const offerAmount = computed(() => Number(form.offer.replace(/\D/g, '')))

type StoredState = { sentAt: number[]; lastHashes: string[] }
function readState(): StoredState {
  if (typeof localStorage === 'undefined') return { sentAt: [], lastHashes: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { sentAt: [], lastHashes: [] }
    const parsed = JSON.parse(raw) as StoredState
    return { sentAt: parsed.sentAt ?? [], lastHashes: parsed.lastHashes ?? [] }
  } catch {
    return { sentAt: [], lastHashes: [] }
  }
}
function writeState(s: StoredState) {
  if (typeof localStorage === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch { /* ignore */ }
}
function hashMessage(s: string): string {
  // small djb2 — enough to detect identical resends, not a security hash
  let h = 5381
  const norm = s.toLowerCase().replace(/\s+/g, ' ').trim()
  for (let i = 0; i < norm.length; i++) h = ((h << 5) + h + norm.charCodeAt(i)) | 0
  return String(h)
}

const errors = computed(() => {
  const e: { name?: string; email?: string; offer?: string } = {}
  if (form.name.trim().length < MIN_NAME) e.name = t.value.errName
  if (!EMAIL_RE.test(form.email.trim())) e.email = t.value.errEmail
  if (!Number.isFinite(offerAmount.value) || offerAmount.value <= 0) e.offer = t.value.errOffer
  else if (MIN_OFFER && form.currency === PRICE_CURRENCY && offerAmount.value < MIN_OFFER)
    e.offer = t.value.errMin(formatPrice(MIN_OFFER, PRICE_CURRENCY, t.value.locale))
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)
const showError = (field: 'name' | 'email' | 'offer') =>
  (touched[field] || submitAttempted.value) && Boolean(errors.value[field])

function rateLimitReason(): string | null {
  const now = Date.now()
  const recent = readState().sentAt.filter((t) => now - t < 60 * 60 * 1000)
  if (recent.length >= HOURLY_CAP) return t.value.errHourly
  const last = recent[recent.length - 1]
  if (last && now - last < COOLDOWN_MS) {
    const wait = Math.ceil((COOLDOWN_MS - (now - last)) / 1000)
    return t.value.errCooldown(wait)
  }
  return null
}

async function submit() {
  submitAttempted.value = true
  if (status.value === 'submitting') return
  if (!isValid.value) return // inline errors will render

  // Honeypot: if a bot filled the hidden field, pretend success and bail.
  if (form.website.trim() !== '') {
    status.value = 'success'
    return
  }
  // Bots usually post within milliseconds.
  if (Date.now() - mountedAt < MIN_SECONDS_ON_PAGE * 1000) {
    errorMsg.value = t.value.errTooFast
    status.value = 'error'
    return
  }

  const limited = rateLimitReason()
  if (limited) {
    errorMsg.value = limited
    status.value = 'error'
    return
  }

  const offerLabel = formatPrice(offerAmount.value, form.currency)
  const hash = hashMessage(`${form.email}|${offerLabel}|${form.message}`)
  const state = readState()
  if (state.lastHashes.includes(hash)) {
    errorMsg.value = t.value.errDuplicate
    status.value = 'error'
    return
  }

  status.value = 'submitting'
  errorMsg.value = ''
  const note = form.message.trim()
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        domain: DOMAIN,
        lang: lang.value,
        name: form.name.trim(),
        email: form.email.trim(),
        offer: offerAmount.value,
        currency: form.currency,
        note,
        message: `Offer for ${DOMAIN}: ${offerLabel}${note ? `\n\n${note}` : ''}`,
      }),
    })
    if (res.ok) {
      const now = Date.now()
      writeState({
        sentAt: [...state.sentAt.filter((t) => now - t < 60 * 60 * 1000), now],
        lastHashes: [...state.lastHashes, hash].slice(-5),
      })
      status.value = 'success'
      return
    }
    const data = await res.json().catch(() => null)
    errorMsg.value = data?.error?.message || t.value.errGeneric
    status.value = 'error'
  } catch {
    errorMsg.value = t.value.errNetwork
    status.value = 'error'
  }
}
</script>

<template>
  <form v-if="status !== 'success'" class="offer-form" novalidate @submit.prevent="submit">
    <div class="field">
      <label class="field-label" for="offer-amount">{{ t.offer }}</label>
      <div class="offer-input" :class="{ 'is-invalid': showError('offer') }">
        <input
          id="offer-amount" v-model="form.offer" type="text" inputmode="numeric" name="offer"
          maxlength="15" required :disabled="status === 'submitting'"
          :aria-invalid="showError('offer') || undefined" placeholder="10.000" @blur="touched.offer = true"
        >
        <select v-model="form.currency" name="currency" :aria-label="t.offer" :disabled="status === 'submitting'">
          <option v-for="c in CURRENCIES" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <span v-if="showError('offer')" class="field-error">{{ errors.offer }}</span>
    </div>

    <div class="field-row">
      <label class="field">
        <span class="field-label">{{ t.name }}</span>
        <input
          v-model="form.name" type="text" name="name" autocomplete="name" maxlength="100" required
          :disabled="status === 'submitting'" :aria-invalid="showError('name') || undefined"
          :placeholder="t.namePh" @blur="touched.name = true"
        >
        <span v-if="showError('name')" class="field-error">{{ errors.name }}</span>
      </label>
      <label class="field">
        <span class="field-label">{{ t.email }}</span>
        <input
          v-model="form.email" type="email" name="email" autocomplete="email" maxlength="200" required
          :disabled="status === 'submitting'" :aria-invalid="showError('email') || undefined"
          :placeholder="t.emailPh" @blur="touched.email = true"
        >
        <span v-if="showError('email')" class="field-error">{{ errors.email }}</span>
      </label>
    </div>

    <label class="field">
      <span class="field-label">{{ t.note }} <span class="field-optional">({{ t.optional }})</span></span>
      <textarea
        v-model="form.message" name="message" rows="3" maxlength="4000"
        :disabled="status === 'submitting'" :placeholder="t.notePh"
      />
    </label>

    <!-- Honeypot — invisible to humans, irresistible to naive bots. -->
    <div class="honeypot" aria-hidden="true">
      <label>
        Website
        <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
      </label>
    </div>

    <button
      type="submit" class="btn"
      :disabled="status === 'submitting' || (submitAttempted && !isValid)"
    >
      {{ status === 'submitting' ? t.sending : t.send }}
    </button>

    <p v-if="status === 'error'" class="form-error" role="alert">{{ errorMsg }}</p>
  </form>

  <p v-else class="form-success" role="status">{{ t.success }}</p>
</template>
