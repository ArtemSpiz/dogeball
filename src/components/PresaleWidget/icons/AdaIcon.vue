<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#0033AD" />
      <!-- Cardano logo - simplified starburst pattern -->
      <circle cx="12" cy="12" r="2.5" fill="white" />
      <circle cx="12" cy="6" r="1.2" fill="white" />
      <circle cx="12" cy="18" r="1.2" fill="white" />
      <circle cx="6.8" cy="9" r="1.2" fill="white" />
      <circle cx="17.2" cy="9" r="1.2" fill="white" />
      <circle cx="6.8" cy="15" r="1.2" fill="white" />
      <circle cx="17.2" cy="15" r="1.2" fill="white" />
      <!-- Outer ring dots -->
      <circle cx="9" cy="5.5" r="0.7" fill="white" fill-opacity="0.7" />
      <circle cx="15" cy="5.5" r="0.7" fill="white" fill-opacity="0.7" />
      <circle cx="9" cy="18.5" r="0.7" fill="white" fill-opacity="0.7" />
      <circle cx="15" cy="18.5" r="0.7" fill="white" fill-opacity="0.7" />
      <circle cx="5" cy="12" r="0.7" fill="white" fill-opacity="0.7" />
      <circle cx="19" cy="12" r="0.7" fill="white" fill-opacity="0.7" />
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
const clipId = computed(() => `ada-clip-${uid}`);
</script>
