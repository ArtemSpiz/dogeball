<script setup>
import featuresBg from "@/assets/img/Dogepay/features-bg.png";
import featuresMask from "@/assets/img/Dogepay/features-mask.png";
import featuresCard1 from "@/assets/img/Dogepay/features-card-1.png";
import featuresCard2 from "@/assets/img/Dogepay/features-card-2.png";
import featuresCard3 from "@/assets/img/Dogepay/features-card-3.png";

const cards = [
  {
    image: featuresCard1,
    title: "User-friendly interface",
    body: "Send crypto payments straight to bank accounts in over 30 fiat currencies—simply connect your wallet.",
    variant: "orange",
  },
  {
    image: featuresCard2,
    title: "Zero FX fees",
    body: "Cross-border transfers come with a flat fee—paid in $DOGEBALL tokens. What you send is exactly what they receive.",
    variant: "beige",
    tilt: true,
  },
  {
    image: featuresCard3,
    title: "Super fast.",
    body: "Crypto is received instantly, and fiat is sent via local payment networks, ensuring same-day processing.",
    variant: "purple",
  },
];
</script>

<template>
  <section
    id="features"
    class="dogepay-features scroll-mt-28 relative overflow-x-hidden overflow-y-visible px-5 py-24 max-md:py-20 md:px-10 md:py-32 lg:px-14 lg:py-40"
  >
    <img
      :src="featuresBg"
      alt=""
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-top"
    />
    <!-- Bottom mask: covers lower area of bg; sits under content -->
    <img
      :src="featuresMask"
      alt=""
      class="dogepay-features-mask pointer-events-none absolute z-[1] w-full"
    />
    <div
      class="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col items-center"
    >
      <h2 class="title text-center">Features</h2>
      <div
        class="dogepay-features-cards mt-12 flex w-full max-w-[1440px] flex-col items-stretch gap-6 max-md:px-0 md:mt-20 md:flex-row md:items-start md:justify-center md:gap-1 md:px-4 lg:gap-2 lg:px-6"
      >
        <article
          v-for="(card, i) in cards"
          :key="i"
          class="dogepay-features-card relative flex w-full shrink-0 flex-col gap-4 overflow-hidden rounded-2xl p-5 shadow-xl md:w-[clamp(240px,27vw,420px)] md:gap-5 md:rounded-3xl md:p-7 md:shadow-2xl"
          :class="[
            card.variant === 'orange' &&
              'bg-[#E53501] text-white shadow-black/25',
            card.variant === 'beige' &&
              'bg-[#CEC2B1] text-[#0a0a0a] shadow-black/20',
            card.variant === 'purple' &&
              'bg-[#30197A] text-white shadow-black/30',
            i === 0 && 'md:z-[1]',
            i === 1 && 'md:z-[2]',
            i === 2 && 'md:z-[3] md:-translate-y-4 lg:-translate-y-8',
            card.tilt && 'dogepay-features-card--tilt',
          ]"
        >
          <div class="dogepay-features-card__art w-full shrink-0">
            <img
              :src="card.image"
              alt=""
              class="dogepay-features-card__img pointer-events-none block w-full max-w-none object-contain object-left object-top"
            />
          </div>
          <div class="flex flex-col text-left">
            <h3
              class="font-grotesk text-lg font-semibold leading-tight md:text-xl lg:text-2xl"
            >
              {{ card.title }}
            </h3>
            <p
              class="description mt-3 leading-[142%] max-md:text-[13px]"
              :class="
                card.variant === 'beige' ? 'text-[#1a1a1a]/90' : 'text-white/95'
              "
            >
              {{ card.body }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Bottom edge mask: full width, natural height, flush to section bottom */
.dogepay-features-mask {
  bottom: -1px;
  left: 0;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
}

/* Middle card: CCW tilt + shifted down (no scale) */
.dogepay-features-card--tilt {
  transform: rotate(-10deg) translateY(1rem);
}

@media (max-width: 767px) {
  .dogepay-features-card--tilt {
    transform: none;
  }
}

/* Global img rule sets h-full — keep artwork intrinsic height */
.dogepay-features-card__img {
  height: auto !important;
}
</style>
