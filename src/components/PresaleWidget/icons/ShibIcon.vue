<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#FFA409" />
      <!-- Shiba face simplified -->
      <ellipse cx="12" cy="13" rx="6" ry="5" fill="#FFCF54" />
      <!-- Ears -->
      <path d="M6 8L8 13L5 11Z" fill="#FFCF54" />
      <path d="M18 8L16 13L19 11Z" fill="#FFCF54" />
      <!-- Eyes -->
      <circle cx="9.5" cy="12" r="1.3" fill="#1A1A1A" />
      <circle cx="14.5" cy="12" r="1.3" fill="#1A1A1A" />
      <!-- Nose -->
      <ellipse cx="12" cy="14.5" rx="1.5" ry="1" fill="#1A1A1A" />
      <!-- Mouth lines -->
      <path
        d="M10.5 15.5Q12 17 13.5 15.5"
        stroke="#1A1A1A"
        stroke-width="0.7"
        fill="none"
      />
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
const clipId = computed(() => `shib-clip-${uid}`);
</script>
