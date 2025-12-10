<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#EF0027" />
      <path d="M6 7L18.5 7L15.5 18L6 7Z" fill="white" />
      <path d="M6 7L11 12.5L15.5 18L6 7Z" fill="white" fill-opacity="0.7" />
      <path d="M6 7L18.5 7L11 12.5L6 7Z" fill="white" fill-opacity="0.85" />
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
const clipId = computed(() => `trx-clip-${uid}`);
</script>
