<script setup>
import presaleBg from "@/assets/img/Dogepay/presale-bg.png";
import presaleTopMask from "@/assets/img/Dogepay/presale-top-mask.png";
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    id="presale"
    class="relative flex min-h-[520px] scroll-mt-28 items-stretch overflow-hidden bg-[#020A2B] scrollbar-hide md:min-h-[600px] lg:min-h-[680px]"
  >
    <img
      :src="presaleBg"
      alt=""
      class="dogepay-presale-bg pointer-events-none absolute inset-0 z-0 select-none object-cover object-bottom"
    />
    <img
      :src="presaleTopMask"
      alt=""
      class="pointer-events-none absolute left-0 right-0 top-0 z-[2] w-full max-w-none select-none object-top !h-auto"
    />
    <div
      class="relative z-[3] mx-auto flex w-full max-w-[900px] flex-1 flex-col items-center justify-center px-5 pb-28 pt-6 text-center md:px-10 md:pb-32 md:pt-10 lg:px-14 lg:pb-48 lg:pt-8"
    >
      <h2 class="title">
        <span class="block">Get in early.</span>
        <span class="block">Before everyone else.</span>
      </h2>
      <p
        class="presale-subtitle mt-5 max-w-[640px] font-grotesk text-xs font-normal leading-[132%] text-white md:mt-6 md:text-sm md:leading-[140%]"
      >
        DOGEPAY is building the future of crypto payments — and early adopters
        get the biggest advantage.
      </p>
      <RouterLink
        :to="{ path: '/', hash: '#presale' }"
        class="mt-10 inline-flex h-9 min-w-[240px] items-center justify-center rounded-full bg-[#EB4102] px-12 font-grotesk text-base font-medium leading-none text-white transition-opacity hover:opacity-90 md:mt-12 md:h-10 md:min-w-[300px] md:px-14 md:text-lg"
      >
        Join Presale
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* main.css sets img { width/height 100% } — keep cave art bottom-anchored */
.dogepay-presale-bg {
  width: 100% !important;
  height: 100% !important;
  max-height: none !important;
}

.presale-subtitle {
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.85),
    0 1px 3px rgba(0, 0, 0, 0.9);
}
</style>
