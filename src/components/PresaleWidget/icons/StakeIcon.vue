<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8.00001 9.00004V11M5.33334 6.00004V4.00004C5.33334 2.52728 6.52725 1.33337 8.00001 1.33337C9.47277 1.33337 10.6667 2.52728 10.6667 4.00004V6.00004M4.66668 14H11.3333C12.0697 14 12.6667 13.4031 12.6667 12.6667V7.33337C12.6667 6.59699 12.0697 6.00004 11.3333 6.00004H4.66668C3.9303 6.00004 3.33334 6.59699 3.33334 7.33337V12.6667C3.33334 13.4031 3.9303 14 4.66668 14Z"
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

