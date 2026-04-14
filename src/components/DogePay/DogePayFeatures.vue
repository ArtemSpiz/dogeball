<script setup>
const cards = [
  { title: "Feature 1", body: "Placeholder text." },
  { title: "Feature 2", body: "Placeholder text." },
  { title: "Feature 3", body: "Placeholder text." },
];
</script>

<template>
  <section
    id="features"
    class="scroll-mt-28 bg-[#050E35] px-6 py-20 max-md:py-14"
  >
    <div class="mx-auto max-w-5xl">
      <h2 class="title text-center">Features</h2>
      <p
        class="mx-auto mt-4 max-w-2xl text-center font-grotesk text-base font-medium md:text-xl"
      >
        Placeholder text.
      </p>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="rounded-2xl border border-white/10 bg-[#0a1440]/80 p-6 backdrop-blur-sm"
        >
          <h3
            class="text-center font-grotesk text-xs font-medium leading-[110%] text-[#FFEEE1] max-md:leading-[125%] md:text-base"
          >
            {{ card.title }}
          </h3>
          <p class="description mt-3 text-center">
            {{ card.body }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
