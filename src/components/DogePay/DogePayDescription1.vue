<script setup>
import description1Bg from "@/assets/img/Dogepay/description-1-bg.png";
import description1Mask from "@/assets/img/Dogepay/description-1-mask.png";
import globeIcon from "@/assets/icons/globe.svg";
import shoppingCartIcon from "@/assets/icons/shopping-cart.svg";
import bankIcon from "@/assets/icons/bank.svg";

const cards = [
  {
    icon: globeIcon,
    title: "Send crypto anywhere",
    body: "Move funds across borders instantly with no intermediaries, no delays, and full transparency on every transaction.",
  },
  {
    icon: shoppingCartIcon,
    title: "Pay for goods and services",
    body: "Use your crypto in real life — pay merchants seamlessly with a smooth, familiar checkout experience.",
  },
  {
    icon: bankIcon,
    title: "Deliver real money to bank accounts",
    body: "Convert crypto into fiat and send it directly to bank accounts worldwide — fast, secure, and hassle-free.",
  },
];
</script>

<template>
  <section
    id="description-1"
    class="dogepay-description-1 scroll-mt-28 relative overflow-x-hidden overflow-y-visible bg-[#0B0B1E]"
  >
    <img
      :src="description1Bg"
      alt=""
      class="dogepay-description-1__bg pointer-events-none absolute inset-0 z-0"
    />

    <img
      :src="description1Mask"
      alt=""
      class="dogepay-description-1__mask pointer-events-none absolute z-[1] w-full"
    />

    <div
      class="relative z-[2] mx-auto w-full max-w-[1440px] px-5 pt-16 pb-6 md:px-10 md:pt-32 md:pb-14 lg:px-14 lg:pt-40 lg:pb-20"
    >
      <div
        class="grid items-start gap-12 md:grid-cols-[1.12fr_0.88fr] md:gap-10 lg:gap-14 xl:gap-16"
      >
        <div class="flex flex-col">
          <h2
            class="title px-0 !text-2xl !leading-[115%] md:!text-3xl md:!leading-[112%] lg:!text-[40px] lg:!leading-[110%]"
          >
            Crypto that actually works as money
          </h2>
          <p
            class="mt-5 max-w-xl font-grotesk text-xs font-normal leading-[130%] text-white/95 md:mt-6 md:text-sm"
          >
            Most crypto stays locked as an investment. DOGEPAY unlocks real
            utility. All in one seamless experience.
          </p>
        </div>

        <div class="flex flex-col md:pt-2">
          <p
            class="font-grotesk text-lg font-semibold text-white md:text-xl lg:text-2xl"
          >
            With DOGEPAY, you can:
          </p>
          <ul class="mt-6 flex flex-col gap-4 md:mt-8 md:gap-4">
            <li
              v-for="(card, index) in cards"
              :key="index"
              class="relative flex min-w-0 flex-col items-start gap-4 rounded-2xl bg-[rgba(53,19,147,0.14)] px-8 py-4 backdrop-blur-[5px] max-md:px-4"
            >
              <!-- Same gradient border treatment as Home About cards -->
              <div
                class="pointer-events-none absolute inset-0 rounded-2xl"
                style="
                  background: linear-gradient(
                    180deg,
                    #8b94f5 0%,
                    rgba(255, 255, 255, 0.1) 90%,
                    rgba(255, 255, 255, 0) 100%
                  );
                  -webkit-mask:
                    linear-gradient(#fff 0 0) content-box,
                    linear-gradient(#fff 0 0);
                  -webkit-mask-composite: xor;
                  mask:
                    linear-gradient(#fff 0 0) content-box,
                    linear-gradient(#fff 0 0);
                  mask-composite: exclude;
                  padding: 1px;
                "
              />

              <div
                class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFEEE1] p-1.5"
              >
                <img
                  :src="card.icon"
                  alt=""
                  class="dogepay-description-1__icon-img block object-contain"
                />
              </div>

              <h3
                class="relative z-10 font-grotesk text-sm font-medium leading-[110%] text-white max-md:leading-[125%] md:text-lg md:leading-snug"
              >
                {{ card.title }}
              </h3>
              <p
                class="description relative z-10 text-white/95 max-md:leading-[125%]"
              >
                {{ card.body }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Full-section bg: show upper portion of the artwork (gym scene) */
.dogepay-description-1__bg {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  object-position: top center;
}

/* Bottom strip: covers lower edge of section over the bg */
.dogepay-description-1__mask {
  bottom: -1px;
  left: 0;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
}

/* main.css img { h-full w-full } — keep icons inside About-style circle */
.dogepay-description-1__icon-img {
  width: 100% !important;
  height: 100% !important;
  max-height: 100%;
  object-fit: contain;
}
</style>
