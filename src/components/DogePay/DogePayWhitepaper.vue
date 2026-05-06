<script setup>
import whitepaperBg from "@/assets/img/Dogepay/whtiepaper-bg.png";
import whitepaperTopMask from "@/assets/img/Dogepay/whitepaper-top-mask.png";
</script>

<template>
  <section
    id="whitepaper"
    class="relative scrollbar-hide scroll-mt-28 overflow-hidden bg-[#120510] md:min-h-[600px] lg:min-h-[720px]"
  >
    <img
      :src="whitepaperBg"
      alt=""
      class="dogepay-whitepaper-bg pointer-events-none absolute inset-0 z-0 select-none object-cover object-bottom"
    />
    <img
      :src="whitepaperTopMask"
      alt=""
      class="pointer-events-none absolute left-0 right-0 top-0 z-[2] w-full max-w-none select-none object-top !h-auto"
    />

    <div
      class="relative z-[3] mx-auto flex min-h-[480px] w-full max-w-[1440px] flex-col justify-center px-5 py-16 md:min-h-[600px] md:px-10 md:py-20 lg:min-h-[720px] lg:px-14 lg:py-24"
    >
      <div
        class="max-w-full text-left md:max-w-[min(100%,560px)] lg:max-w-[min(100%,840px)]"
      >
        <h2
          class="title !text-2xl !leading-[115%] !text-white md:!text-3xl md:!leading-[112%] lg:!text-[40px] lg:!leading-[110%]"
        >
          <span class="block">Explore the technology</span>
          <span class="block">behind DogePay</span>
        </h2>
        <p
          class="whitepaper-lede mt-4 font-grotesk text-base font-medium leading-[132%] text-white md:mt-5 md:text-lg md:leading-[136%] lg:text-xl lg:leading-[140%]"
        >
          Everything you need to know — from infrastructure to tokenomics.
        </p>
        <p
          class="whitepaper-body mt-6 font-grotesk text-xs font-normal leading-[145%] text-white/90 md:mt-7 md:text-sm md:leading-[150%] max-w-full md:max-w-md"
        >
          Dive into the $DOGEBALL Whitepaper to understand how we bridge crypto
          and real-world payments. Learn how our platform enables seamless
          crypto-to-fiat transactions, ensures security, and scales globally for
          everyday use.
        </p>
        <a
          href="/DOGEBALLWhitepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 inline-flex h-9 min-w-[200px] items-center justify-center rounded-full bg-[#EB4102] px-10 font-grotesk text-base font-medium leading-none text-white transition-opacity hover:opacity-90 md:mt-10 md:h-10 md:min-w-[240px] md:px-12 md:text-lg"
        >
          Whitepaper
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dogepay-whitepaper-bg {
  width: 100% !important;
  height: 100% !important;
  max-height: none !important;
}

.whitepaper-lede,
.whitepaper-body {
  text-shadow:
    0 2px 12px rgba(0, 0, 0, 0.75),
    0 1px 4px rgba(0, 0, 0, 0.85);
}
</style>
