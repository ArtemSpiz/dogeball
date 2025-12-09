<template>
  <div
    class="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium"
    :style="{ backgroundColor: bg, color: textColor }"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  bg: {
    type: String,
    default: "#333",
  },
  textColor: {
    type: String,
    default: "#fff",
  },
});
</script>

