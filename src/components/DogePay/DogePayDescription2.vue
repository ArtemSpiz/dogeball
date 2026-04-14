<script setup>
import description2Bg from "@/assets/img/Dogepay/description-2-bg.png";
import description2Mask from "@/assets/img/Dogepay/description-2-mask.png";
import description2Phone from "@/assets/img/Dogepay/description-2-phone.png";
import clockIcon from "@/assets/icons/clock.svg";
import multiChainIcon from "@/assets/icons/multi-chain.svg";
import securityIcon from "@/assets/icons/security.svg";
import settlementIcon from "@/assets/icons/settlement.svg";
import playstoreBadge from "@/assets/icons/playstore.svg";
import appstoreBadge from "@/assets/icons/appstore.svg";

const features = [
  {
    icon: clockIcon,
    title: "Real-time FX rates",
    body: "Live conversion at institutional rates. No hidden spreads — what you see is what lands in the account.",
  },
  {
    icon: multiChainIcon,
    title: "Multi-chain support",
    body: "ETH, BTC, USDC, SOL, MATIC and more — all routing through local payment rails.",
  },
  {
    icon: securityIcon,
    title: "Non-custodial security",
    body: "You hold your keys. $DOGEBALL never touches your funds — conversion happens at the moment of transfer.",
  },
  {
    icon: settlementIcon,
    title: "Instant settlement",
    body: "Transactions confirmed on-chain and settled into recipient's bank account in under 30 seconds.",
  },
];
</script>

<template>
  <section
    id="description-2"
    class="dogepay-description-2 scroll-mt-28 relative overflow-hidden bg-[#0a0618]"
  >
    <img
      :src="description2Bg"
      alt=""
      class="dogepay-description-2__bg pointer-events-none absolute inset-0 z-0"
    />

    <img
      :src="description2Mask"
      alt=""
      class="dogepay-description-2__mask pointer-events-none absolute z-[1] w-full"
    />

    <div
      class="relative z-[2] mx-auto w-full max-w-[1440px] px-5 pt-14 md:px-10 md:pt-20 lg:px-14 lg:pt-24"
    >
      <!-- Full width: title + intro -->
      <header class="max-w-4xl">
        <h2
          class="title !text-2xl !leading-[115%] !text-white md:!text-3xl md:!leading-[112%] lg:!text-[40px] lg:!leading-[110%]"
        >
          <span class="block">Your crypto. Any bank.</span>
          <span class="block">Worldwide.</span>
        </h2>
        <p
          class="mt-5 font-grotesk text-xs font-normal leading-[140%] text-white/85 md:mt-6 md:text-sm lg:max-w-3xl"
        >
          One app to send crypto directly into fiat bank accounts across 160+
          countries — at the speed of blockchain, with the simplicity of a
          payment.
        </p>
      </header>

      <!-- Row: contents (features + stores) | phone (fills column / row, bottom-aligned) -->
      <div
        class="mt-10 grid items-start gap-10 md:mt-12 md:gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.95fr)] lg:items-stretch lg:gap-14 xl:gap-16"
      >
        <div class="flex min-w-0 flex-col">
          <ul class="flex flex-col gap-6 md:gap-7">
            <li
              v-for="(item, index) in features"
              :key="index"
              class="flex gap-4 max-md:gap-3"
            >
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFEEE1] p-2 md:h-12 md:w-12 md:p-2.5"
              >
                <img
                  :src="item.icon"
                  alt=""
                  class="dogepay-description-2__icon-img block object-contain"
                />
              </div>
              <div class="min-w-0">
                <h3
                  class="font-grotesk text-sm font-semibold leading-tight text-white md:text-base"
                >
                  {{ item.title }}
                </h3>
                <p
                  class="description mt-1.5 text-white/90 max-md:leading-[135%]"
                >
                  {{ item.body }}
                </p>
              </div>
            </li>
          </ul>

          <div
            class="mt-10 flex w-max max-w-full flex-col items-stretch gap-2 md:mt-12 md:gap-2.5"
          >
            <div class="flex flex-wrap items-start gap-4 md:gap-8">
              <img
                :src="playstoreBadge"
                alt="Get it on Google Play"
                class="dogepay-description-2__store-badge block h-11 w-auto shrink-0 md:h-12"
              />
              <img
                :src="appstoreBadge"
                alt="Download on the App Store"
                class="dogepay-description-2__store-badge block h-11 w-auto shrink-0 md:h-12"
              />
            </div>
            <p
              class="text-left font-grotesk text-base font-medium tracking-wide md:text-lg"
            >
              Coming Soon
            </p>
          </div>
        </div>

        <div
          class="dogepay-description-2__phone-col relative z-[1] mx-auto flex w-full max-w-[min(100%,520px)] flex-col justify-end lg:mx-0 lg:max-w-none lg:h-full lg:min-h-0 lg:self-stretch"
        >
          <div
            class="dogepay-description-2__glow pointer-events-none absolute bottom-[5%] left-1/2 z-0 h-[min(72vw,420px)] w-[min(92vw,520px)] -translate-x-1/2 translate-y-[10%] rounded-full bg-[#EB4102]/30 blur-[90px] md:h-[440px] md:w-[560px] md:blur-[110px] lg:bottom-0 lg:translate-y-[20%]"
            aria-hidden="true"
          />

          <img
            :src="description2Phone"
            alt="DOGEPAY send to bank account"
            class="dogepay-description-2__phone relative z-[1] drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Show upper portion of gradient artwork */
.dogepay-description-2__bg {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  object-position: top center;
}

/* Bottom edge transition into next section */
.dogepay-description-2__mask {
  bottom: -1px;
  left: 0;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
}

/* main.css img { h-full w-full } — keep icons inside circles */
.dogepay-description-2__icon-img {
  width: 100% !important;
  height: 100% !important;
  max-height: 100%;
  object-fit: contain;
}

.dogepay-description-2__store-badge {
  width: auto !important;
  max-width: none;
  height: 2.75rem !important;
}

@media (min-width: 768px) {
  .dogepay-description-2__store-badge {
    height: 3rem !important;
  }
}

/* main.css img { w-full h-full } — scale to column width or row height (contain), bottom */
.dogepay-description-2__phone {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  max-height: min(78vh, 720px) !important;
  object-fit: contain;
  object-position: bottom center;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  .dogepay-description-2__phone {
    width: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
    margin-left: auto !important;
    margin-right: 0 !important;
  }
}
</style>
