<script setup>
const steps = [
  { label: "01", title: "Step 1", body: "Placeholder text." },
  { label: "02", title: "Step 2", body: "Placeholder text." },
  { label: "03", title: "Step 3", body: "Placeholder text." },
  { label: "04", title: "Step 4", body: "Placeholder text." },
];
</script>

<template>
  <section id="steps" class="scroll-mt-28 bg-[#020A2B] px-6 py-20 max-md:py-14">
    <div class="mx-auto max-w-4xl">
      <h2 class="title text-center">Steps</h2>
      <p
        class="mx-auto mt-4 max-w-2xl text-center font-grotesk text-base font-medium md:text-xl"
      >
        Placeholder text.
      </p>
      <ol class="mt-12 flex flex-col gap-6">
        <li
          v-for="(step, i) in steps"
          :key="i"
          class="flex gap-4 rounded-2xl border border-white/10 bg-[#0a1440]/60 p-5 md:gap-6 md:p-6"
        >
          <span
            class="flex h-10 min-w-10 items-center justify-center rounded-full bg-[#EB4102] font-grotesk text-sm font-semibold text-white md:h-12 md:min-w-12 md:text-base"
          >
            {{ step.label }}
          </span>
          <div>
            <h3
              class="font-grotesk text-xs font-medium leading-[110%] text-[#FFEEE1] max-md:leading-[125%] md:text-base"
            >
              {{ step.title }}
            </h3>
            <p class="description mt-2">
              {{ step.body }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
