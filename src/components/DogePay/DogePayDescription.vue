<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator: (v) => v === "1" || v === "2",
  },
});

const sectionId = computed(() =>
  props.variant === "1" ? "description-1" : "description-2",
);
const bgClass = computed(() =>
  props.variant === "1" ? "bg-[#020A2B]" : "bg-[#061032]",
);
</script>

<template>
  <section
    :id="sectionId"
    class="scroll-mt-28 px-6 py-16 max-md:py-12"
    :class="bgClass"
  >
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="title">Description</h2>
      <p
        class="mt-6 font-grotesk text-base font-medium md:text-xl max-md:px-1"
      >
        Placeholder text.
      </p>
    </div>
  </section>
</template>
