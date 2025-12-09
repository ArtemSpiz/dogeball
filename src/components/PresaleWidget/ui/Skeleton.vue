<template>
  <div
    :class="[
      'animate-pulse bg-white/10 rounded',
      sizeClasses,
      variantClasses,
      $attrs.class,
    ]"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (v) => ["default", "text", "circular", "rectangular"].includes(v),
  },
  width: {
    type: String,
    default: null,
  },
  height: {
    type: String,
    default: null,
  },
});

const sizeClasses = computed(() => {
  if (props.width || props.height) return "";

  const variants = {
    default: "h-4 w-full",
    text: "h-4 w-3/4",
    circular: "h-10 w-10 rounded-full",
    rectangular: "h-20 w-full",
  };
  return variants[props.variant] || variants.default;
});

const variantClasses = computed(() => {
  if (props.variant === "circular") return "rounded-full";
  return "";
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-pulse {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
</style>

