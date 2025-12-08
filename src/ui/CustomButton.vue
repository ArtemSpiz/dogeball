<script setup>
defineProps({
  title: {
    type: String,
    default: "Audit",
  },
  whiteBg: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="[
      'px-4 py-[10px] items-center flex justify-center rounded-full text-base font-medium font-grotesk',
      whiteBg ? 'bg-white text-black' : 'bg-[#EB4102] text-white',
    ]"
  >
    {{ title }}
  </button>
</template>
