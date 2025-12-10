<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#23292F" />
      <path
        d="M17.5 6H15.9L12.85 9.05C12.38 9.52 11.62 9.52 11.15 9.05L8.1 6H6.5L10.55 10.05C11.35 10.85 12.65 10.85 13.45 10.05L17.5 6Z"
        fill="white"
      />
      <path
        d="M6.5 18H8.1L11.15 14.95C11.62 14.48 12.38 14.48 12.85 14.95L15.9 18H17.5L13.45 13.95C12.65 13.15 11.35 13.15 10.55 13.95L6.5 18Z"
        fill="white"
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
const clipId = computed(() => `xrp-clip-${uid}`);
</script>

