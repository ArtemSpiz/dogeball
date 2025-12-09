<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 px-3 py-1.5 rounded-full',
      'text-center font-grotesk text-sm font-medium leading-5',
      'font-feature-off cursor-pointer transition-all',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      active
        ? 'border-2 border-[#EB4102] bg-[#EB4102]/20 text-white'
        : 'border border-white/30 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white',
      $attrs.class,
    ]"
    :disabled="disabled || loading"
  >
    <Spinner v-if="loading" :size="4" />
    <slot v-else />
  </button>
</template>

<script setup>
import Spinner from "./Spinner.vue";

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
