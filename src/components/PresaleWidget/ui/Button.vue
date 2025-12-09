<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 leading-none',
      variantClasses,
      sizeClasses,
      $attrs.class,
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (val) =>
      [
        "default",
        "primary",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ].includes(val),
  },
  size: {
    type: String,
    default: "default",
    validator: (val) => ["default", "sm", "lg", "icon"].includes(val),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = computed(() => {
  const variants = {
    default: "bg-[#007bf9] text-white hover:bg-[#007bf9]/80",
    primary:
      "bg-gradient-to-r from-[#EB4102] to-[#FF6B35] text-white hover:from-[#EB4102]/90 hover:to-[#FF6B35]/90 shadow-lg shadow-[#EB4102]/30",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "bg-black/50 text-white hover:bg-[#007bf9]/80 hover:text-black border border-[#007bf9]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  return variants[props.variant] || variants.default;
});

const sizeClasses = computed(() => {
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return sizes[props.size] || sizes.default;
});
</script>

