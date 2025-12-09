<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M9.33332 12.6667V4.66671C9.33332 3.93033 8.73637 3.33337 7.99999 3.33337H7.33332C6.59694 3.33337 5.99999 3.93033 5.99999 4.66671V12.6667M5.99999 8.66671H3.99999C3.26361 8.66671 2.66666 9.26366 2.66666 10V11.3334C2.66666 12.0698 3.26361 12.6667 3.99999 12.6667H11.3333C12.0697 12.6667 12.6667 12.0698 12.6667 11.3334V8.00004C12.6667 7.26366 12.0697 6.66671 11.3333 6.66671H9.33332"
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

