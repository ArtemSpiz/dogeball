<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#C2A633" />
      <path
        d="M11.5 6H9V18H11.5C15.09 18 18 15.09 18 11.5V12.5C18 8.91 15.09 6 11.5 6Z"
        fill="white"
      />
      <path
        d="M11 8H10V16H11C14.31 16 16 13.76 16 12C16 10.24 14.31 8 11 8Z"
        fill="#C2A633"
      />
      <rect x="7" y="11" width="7" height="2" fill="white" />
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
const clipId = computed(() => `doge-clip-${uid}`);
</script>

