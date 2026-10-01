<script setup lang="ts">
// Running-bond wall of outline bricks with one solid ".com" brick — the
// missing piece. Rows alternate which end carries the half brick.
const ROWS = 6
const MISSING = { row: 3, col: 1 }

const rows = Array.from({ length: ROWS }, (_, r) => {
  const full = Array.from({ length: 4 }, (_, c) => ({ half: false, missing: r === MISSING.row && c === MISSING.col }))
  const half = { half: true, missing: false }
  return r % 2 ? [half, ...full] : [...full, half]
})
</script>

<template>
  <div class="wall" aria-hidden="true">
    <div v-for="(row, r) in rows" :key="r" class="wall-row">
      <span
        v-for="(b, c) in row" :key="c"
        class="brick" :class="{ 'brick--half': b.half, 'brick--com': b.missing }"
      >{{ b.missing ? '.com' : '' }}</span>
    </div>
  </div>
</template>
