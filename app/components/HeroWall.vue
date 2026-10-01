<script setup lang="ts">
// Running-bond wall of outline bricks with a "for sale" sign hung on it so
// the page reads as a sale at first glance, the price on a tag hanging from
// the sign. Rows alternate which end carries the half brick.
defineProps<{ sign: string; signSub: string; price: string | null; priceLabel: string }>()

const ROWS = 6

const rows = Array.from({ length: ROWS }, (_, r) => {
  const full = Array.from({ length: 4 }, () => ({ half: false }))
  const half = { half: true }
  return r % 2 ? [half, ...full] : [...full, half]
})
</script>

<template>
  <div class="wall">
    <div class="hang">
      <div class="sale-sign">
        <span class="sale-sign-main">{{ sign }}</span>
        <span class="sale-sign-sub">{{ signSub }}</span>
      </div>
      <div v-if="price" class="price-tag">
        <span class="price-tag-string" aria-hidden="true" />
        <span class="price-tag-card">
          <span class="price-tag-hole" aria-hidden="true" />
          <span class="price-tag-text">
            <span class="price-tag-label">{{ priceLabel }}</span>
            <span class="price-tag-value">{{ price }}</span>
          </span>
        </span>
      </div>
    </div>
    <div v-for="(row, r) in rows" :key="r" class="wall-row" aria-hidden="true">
      <span v-for="(b, c) in row" :key="c" class="brick" :class="{ 'brick--half': b.half }" />
    </div>
  </div>
</template>
