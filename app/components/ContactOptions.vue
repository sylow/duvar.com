<script setup lang="ts">
import { CONTACT_EMAIL } from '~/data/domain'

// The address is decoded only in the browser so it never appears in the
// server-rendered HTML that scrapers read.
const { t } = useLang()
const email = ref('')

onMounted(() => {
  email.value = atob(CONTACT_EMAIL)
})

const mailHref = computed(() => `mailto:${email.value}?subject=${encodeURIComponent(t.value.mailSubject)}`)
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
  </div>
</template>
