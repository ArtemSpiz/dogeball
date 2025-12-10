<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#F7931A" />
      <!-- Floki Viking helmet simplified -->
      <ellipse cx="12" cy="13" rx="5" ry="4" fill="#FFD93D" />
      <!-- Horns -->
      <path
        d="M6 10C5 7 6 5 7 4"
        stroke="#FFD93D"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
      />
      <path
        d="M18 10C19 7 18 5 17 4"
        stroke="#FFD93D"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
      />
      <!-- Eyes -->
      <circle cx="10" cy="12" r="1.2" fill="#1A1A1A" />
      <circle cx="14" cy="12" r="1.2" fill="#1A1A1A" />
      <!-- Nose -->
      <ellipse cx="12" cy="14.5" rx="1" ry="0.7" fill="#1A1A1A" />
    </g>
    <defs>
      <clipPath :id="clipId">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
});

const uid = Math.random().toString(36).slice(2, 9);
const clipId = computed(() => `floki-clip-${uid}`);
</script>
