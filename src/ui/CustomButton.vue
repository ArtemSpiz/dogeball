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
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>

<template>
  <button
    :disabled="disabled"
    @click="$emit('click')"
    :class="[
      'px-4 py-[10px] items-center flex justify-center rounded-full text-base font-medium font-grotesk transition-all',
      whiteBg ? 'bg-white text-black' : 'bg-[#EB4102] text-white',
      disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:opacity-90 cursor-pointer',
    ]"
  >
    {{ title }}
  </button>
</template>
