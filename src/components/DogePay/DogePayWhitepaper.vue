<script setup>
import CustomButton from "@/ui/CustomButton.vue";
</script>

<template>
  <section
    id="whitepaper"
    class="scroll-mt-28 bg-[#020A2B] px-6 py-20 max-md:py-14"
  >
    <div
      class="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border border-white/10 bg-[#0a1440]/50 px-8 py-12 text-center backdrop-blur-sm max-md:px-5"
    >
      <h2 class="title">Whitepaper</h2>
      <p class="mt-4 font-grotesk text-base font-medium md:text-xl">
        Placeholder text.
      </p>
      <a
        href="/DOGEBALLWhitepaper.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-8"
      >
        <CustomButton
          title="Whitepaper"
          white-bg="true"
          class="min-w-[200px]"
        />
      </a>
    </div>
  </section>
</template>
