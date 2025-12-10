<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#0098EA" />
      <path d="M7.5 8.5L12 5L16.5 8.5L12 19L7.5 8.5Z" fill="white" />
      <path d="M12 5L16.5 8.5L12 19V5Z" fill="white" fill-opacity="0.7" />
      <path d="M7.5 8.5H16.5L12 11L7.5 8.5Z" fill="white" fill-opacity="0.9" />
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
const clipId = computed(() => `ton-clip-${uid}`);
</script>
