<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g :clip-path="`url(#${clipId})`">
      <circle cx="12" cy="12" r="12" fill="#3D7A3D" />
      <!-- Simplified Pepe frog face -->
      <ellipse cx="12" cy="13" rx="7" ry="5" fill="#6DB356" />
      <!-- Eyes -->
      <circle cx="9" cy="11" r="2.5" fill="white" />
      <circle cx="15" cy="11" r="2.5" fill="white" />
      <circle cx="9.5" cy="11" r="1.2" fill="black" />
      <circle cx="15.5" cy="11" r="1.2" fill="black" />
      <!-- Mouth -->
      <path
        d="M8 15Q12 17 16 15"
        stroke="#3D7A3D"
        stroke-width="1"
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
const clipId = computed(() => `pepe-clip-${uid}`);
</script>
