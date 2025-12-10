<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#F0B90B" />
      <!-- BUSD diamond logo -->
      <path d="M12 4L16 8L12 12L8 8L12 4Z" fill="white" />
      <path d="M17 9L21 13L17 17L13 13L17 9Z" fill="white" fill-opacity="0.8" />
      <path d="M7 9L11 13L7 17L3 13L7 9Z" fill="white" fill-opacity="0.8" />
      <path
        d="M12 14L16 18L12 22L8 18L12 14Z"
        fill="white"
        fill-opacity="0.6"
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
const clipId = computed(() => `busd-clip-${uid}`);
</script>

