<script setup lang="ts">
import { CONTACT } from '~/data/domain'

// Email and phone are decoded only in the browser so they never appear in
// the server-rendered HTML that scrapers read.
const { t } = useLang()
const email = ref('')
const phone = ref('')

onMounted(() => {
  email.value = atob(CONTACT.email)
  phone.value = atob(CONTACT.phone)
})

const digits = computed(() => phone.value.replace(/\D/g, ''))
const mailHref = computed(() => `mailto:${email.value}?subject=${encodeURIComponent(t.value.mailSubject)}`)
const telHref = computed(() => `tel:+${digits.value}`)
const waHref = computed(() => `https://wa.me/${digits.value}?text=${encodeURIComponent(t.value.waText)}`)
</script>

<template>
  <div class="contacts">
    <a class="contact" :href="email ? mailHref : undefined">
      <span class="contact-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></svg>
      </span>
      <span class="contact-text">
        <span class="contact-label">{{ t.email }}</span>
        <span class="contact-value">{{ email || '…' }}</span>
      </span>
    </a>
    <a class="contact" :href="phone ? telHref : undefined">
      <span class="contact-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" /></svg>
      </span>
      <span class="contact-text">
        <span class="contact-label">{{ t.phone }}</span>
        <span class="contact-value">{{ phone || '…' }}</span>
      </span>
    </a>
    <a class="contact contact--wa" :href="phone ? waHref : undefined" target="_blank" rel="noopener noreferrer">
      <span class="contact-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.3-3.9A7.5 7.5 0 1112 19.5a7.4 7.4 0 01-3.8-1L4 20z" /><path d="M9 9.2c.2-.6.4-.6.7-.6h.5c.2 0 .4 0 .6.5l.6 1.4c0 .2 0 .3-.1.5l-.4.5c-.1.1-.2.3 0 .5a5 5 0 002.5 2.1c.2.1.4.1.5 0l.5-.6c.2-.2.3-.1.5-.1l1.4.7c.2.1.3.2.3.3.1.5-.2 1.2-.5 1.4a2.6 2.6 0 01-2.4.4 8 8 0 01-4.6-4.3 3 3 0 01-.6-1.6c0-.7.3-1.1.5-1.3z" fill="currentColor" stroke="none" /></svg>
      </span>
      <span class="contact-text">
        <span class="contact-label">{{ t.whatsapp }}</span>
        <span class="contact-value">{{ phone || '…' }}</span>
      </span>
    </a>
  </div>
</template>
