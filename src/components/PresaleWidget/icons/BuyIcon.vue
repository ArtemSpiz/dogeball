<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M11.3333 3.33333H6.33334C5.04467 3.33333 4 4.378 4 5.66667C4 6.95533 5.04467 8 6.33333 8H9.66667C10.9553 8 12 9.04467 12 10.3333C12 11.622 10.9553 12.6667 9.66667 12.6667H4M8 2V14"
      :stroke="color"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 16,
  },
  color: {
    type: String,
    default: "currentColor",
  },
});
</script>

