<script setup lang="ts">
// Running-bond wall of outline bricks with one solid ".com" brick — the
// missing piece — and a "for sale" sign hung on it so the page reads as a
// sale at first glance. Rows alternate which end carries the half brick.
defineProps<{ sign: string; signSub: string }>()

const ROWS = 6
const MISSING = { row: 3, col: 1 }

const rows = Array.from({ length: ROWS }, (_, r) => {
  const full = Array.from({ length: 4 }, (_, c) => ({ half: false, missing: r === MISSING.row && c === MISSING.col }))
  const half = { half: true, missing: false }
  return r % 2 ? [half, ...full] : [...full, half]
})
</script>

<template>
  <div class="wall">
    <div class="sale-sign">
      <span class="sale-sign-main">{{ sign }}</span>
      <span class="sale-sign-sub">{{ signSub }}</span>
    </div>
    <div v-for="(row, r) in rows" :key="r" class="wall-row" aria-hidden="true">
      <span
        v-for="(b, c) in row" :key="c"
        class="brick" :class="{ 'brick--half': b.half, 'brick--com': b.missing }"
      >{{ b.missing ? '.com' : '' }}</span>
    </div>
  </div>
</template>
