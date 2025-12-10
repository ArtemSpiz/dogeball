<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#8247E5" />
      <!-- Polygon logo -->
      <path
        d="M15.5 9.5L12 7L8.5 9.5V14.5L12 17L15.5 14.5V9.5Z"
        fill="white"
        fill-opacity="0.9"
      />
      <path d="M12 7L15.5 9.5L12 12V7Z" fill="white" fill-opacity="0.7" />
      <path d="M12 12L15.5 14.5L12 17V12Z" fill="white" fill-opacity="0.5" />
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
const clipId = computed(() => `matic-clip-${uid}`);
</script>
