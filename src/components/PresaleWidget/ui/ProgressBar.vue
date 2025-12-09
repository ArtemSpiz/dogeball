<template>
  <div
    class="w-full relative overflow-hidden rounded-full border border-white/30 bg-white/10"
    :class="sizeClasses"
  >
    <div
      class="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
      :class="variantClasses"
      :style="{ width: `${clampedProgress}%` }"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
    default: "md",
    validator: (val) => ["sm", "md", "lg"].includes(val),
  },
  variant: {
    type: String,
    default: "striped",
    validator: (val) => ["solid", "striped", "gradient"].includes(val),
  },
});

const clampedProgress = computed(() => {
  return Math.min(100, Math.max(0, props.progress));
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };
  return sizes[props.size];
});

const variantClasses = computed(() => {
  const variants = {
    solid: "bg-[#EB4102]",
    striped: "bg-striped-progress",
    gradient: "bg-gradient-to-r from-[#EB4102] to-[#FF6B35]",
  };
  return variants[props.variant];
});
</script>

<style scoped>
.bg-striped-progress {
  background: repeating-linear-gradient(
    to right,
    #eb4102 0px,
    #eb4102 2px,
    #fff 2px,
    #fff 4px
  );
}
</style>

