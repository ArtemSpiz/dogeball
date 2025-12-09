<template>
  <div class="w-full">
    <slot v-if="!loading" />
    <div v-else class="flex items-center justify-center p-8">
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import { provide } from "vue";
import Spinner from "./Spinner.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

provide("loading", props.loading);
</script>

