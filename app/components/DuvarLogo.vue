<script setup lang="ts">
// A little brick with a face: rounded block, mortar lines, sleepy-happy eyes.
withDefaults(defineProps<{ size?: number }>(), { size: 36 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40" class="logo" aria-hidden="true">
    <rect x="2" y="5" width="36" height="30" rx="9" fill="var(--accent)" />
    <g stroke="var(--bg)" stroke-width="1.6" stroke-linecap="round" opacity="0.55">
      <path d="M2.8 14.5h34.4M2.8 25.5h34.4M14 5.8v8.7M27 25.5v8.7" />
    </g>
    <g fill="none" stroke="var(--bg)" stroke-width="2" stroke-linecap="round">
      <path d="M12.6 19.4q1.6-1.8 3.2 0" />
      <path d="M24.2 19.4q1.6-1.8 3.2 0" />
      <path d="M17.6 21.4q2.4 2.2 4.8 0" />
    </g>
    <g fill="#F2A68A">
      <circle cx="11" cy="22" r="1.5" />
      <circle cx="29" cy="22" r="1.5" />
    </g>
  </svg>
</template>
