<script setup>
import { ref } from "vue";
import Minus from "@/assets/icons/Minus.vue";
import Plus from "@/assets/icons/Plus.vue";

const items = [
  { q: "Placeholder question?", a: "Placeholder text." },
  { q: "Placeholder question?", a: "Placeholder text." },
  { q: "Placeholder question?", a: "Placeholder text." },
  { q: "Placeholder question?", a: "Placeholder text." },
];

const openIndex = ref(null);

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i;
}
</script>

<template>
  <section
    id="faqs"
    class="scroll-mt-28 bg-[#050E35] px-6 py-20 max-md:py-14"
  >
    <div class="mx-auto max-w-3xl">
      <h2 class="title text-center">FAQs</h2>
      <div class="mt-10 flex flex-col gap-3">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="rounded-2xl border border-white/10 bg-[#0a1440]/70 p-5 md:p-6"
        >
          <button
            type="button"
            class="flex w-full cursor-pointer items-start gap-4 text-left"
            @click="toggle(i)"
          >
            <span
              class="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#FFEEE1]"
            >
              <component :is="openIndex === i ? Minus : Plus" />
            </span>
            <span
              class="my-auto font-grotesk text-xl font-bold leading-[110%] max-md:text-base"
            >
              {{ item.q }}
            </span>
          </button>
          <Transition name="dp-faq">
            <p
              v-if="openIndex === i"
              class="description mt-4 pl-12 max-md:pl-0"
            >
              {{ item.a }}
            </p>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dp-faq-enter-active,
.dp-faq-leave-active {
  transition: opacity 0.2s ease, max-height 0.25s ease;
  max-height: 320px;
}
.dp-faq-enter-from,
.dp-faq-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>
