<template>
  <div
    class="flex items-center gap-2 self-stretch rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)] p-3 transition-colors hover:bg-[rgba(8,12,35,0.6)]"
  >
    <div class="flex flex-col gap-0.5 flex-1 min-w-0">
      <p
        class="text-left text-sm leading-5 m-0 text-white/80 font-grotesk font-medium font-feature-off"
      >
        {{ label }}
      </p>
      <template v-if="loading">
        <Skeleton class="h-5 w-3/4" />
      </template>
      <p
        v-else
        class="text-left text-base leading-5 m-0 text-white font-grotesk font-medium font-feature-off line-clamp-1"
      >
        <slot>{{ value }}</slot>
      </p>
    </div>
    <slot name="action" />
  </div>
</template>

<script setup>
import Skeleton from "./Skeleton.vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
