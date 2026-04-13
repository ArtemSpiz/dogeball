<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M3.33334 13.3333H12.6667M4.66667 13.3333V10.6667M8 13.3333V7.33333M11.3333 13.3333V9.33333M8 2.66667L9.00068 4.69353C9.09361 4.88181 9.2732 5.01228 9.481 5.04247L11.7172 5.36738L10.0998 6.94394C9.94947 7.09045 9.88089 7.30158 9.91639 7.50854L10.2982 9.73572L8.29754 8.68391C8.11167 8.58619 7.88834 8.58619 7.70246 8.68391L5.70184 9.73572L6.08361 7.50854C6.1191 7.30158 6.05053 7.09045 5.90016 6.94394L4.28284 5.36738L6.51899 5.04247C6.7268 5.01228 6.90638 4.88181 6.99931 4.69353L8 2.66667Z"
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
