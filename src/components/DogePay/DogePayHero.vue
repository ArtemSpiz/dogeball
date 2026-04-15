<script setup>
import CustomButton from "@/ui/CustomButton.vue";
import heroBg from "@/assets/img/Dogepay/hero-bg.png";
import heroBall from "@/assets/img/Dogepay/hero-ball.png";
import heroHand from "@/assets/img/Dogepay/hero-hand.png";
import heroMask from "@/assets/img/Dogepay/hero-mask.png";

const scrollToPresale = () => {
  const el = document.getElementById("presale");
  if (!el) return;
  const HEADER = 100;
  const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER;
  window.scrollTo({ top: y, behavior: "smooth" });
};
</script>

<template>
  <section
    id="hero"
    class="relative scroll-mt-28 overflow-hidden scrollbar-hide md:flex md:h-screen md:min-h-screen md:flex-col md:min-h-0"
  >
    <!-- Background: no overlays — show asset as exported -->
    <img
      :src="heroBg"
      alt=""
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-top"
    />

    <!-- Ball: decorative; position/size per breakpoint in scoped CSS -->
    <img
      :src="heroBall"
      alt=""
      class="dogepay-hero-ball pointer-events-none absolute z-[1] h-auto max-w-none object-contain"
    />

    <!--
      Flex: col (mobile) / row (md+) — copy then hand. No section pt: padding-top lives on copy only so
      the hand column can stretch from the top of the hero (avoids empty band beside the illustration).
      z-index: hand < mask < copy.
    -->
    <div
      class="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-stretch px-5 lg:min-h-0 lg:h-full lg:flex-row lg:items-stretch lg:px-14"
    >
      <div
        class="relative z-[10] w-full max-w-md shrink-0 self-start pt-[92px] lg:mx-0 lg:w-auto lg:self-start lg:pt-[128px] lg:text-left lg:max-w-[840px] lg:pt-[140px]"
      >
        <div class="mt-3 md:mt-12 lg:mt-14">
          <div class="title text-left">
            <span class="block">PAY WITH CRYPTO.</span>
            <span class="block">RECEIVE IN FIAT.</span>
            <span class="block">INSTANTLY.</span>
          </div>
          <p
            class="subtitle-text mx-auto mt-4 max-w-[470px] text-left font-grotesk text-base font-normal leading-[120%] max-md:mt-3 max-md:text-sm md:mx-0 md:mt-6"
          >
            DOGEPAY is the next-gen payment layer that connects crypto with
            real-world money — fast, simple, and borderless.
          </p>
          <p
            class="mt-4 text-left font-grotesk text-base font-medium max-md:mt-3 max-md:text-sm md:text-xl"
          >
            Welcome to the PayFi revolution!
          </p>
          <div class="mt-8 flex justify-center md:justify-start">
            <CustomButton
              title="Join Presale"
              class="w-full md:w-auto min-w-[300px] px-8 py-[8px] !text-[16px]"
              @click="scrollToPresale"
            />
          </div>
        </div>
      </div>

      <!-- Hand: in-flow on mobile; right column md+ — below mask (z-[5]) -->
      <div
        class="dogepay-hero-hand-cell relative z-[2] w-full min-w-0 max-w-full max-md:max-w-none max-md:shrink-0 md:flex-1 md:self-stretch"
      >
        <img
          :src="heroHand"
          alt=""
          class="dogepay-hero-hand pointer-events-none block max-w-full"
        />
      </div>
    </div>

    <!-- Foliage mask: above ball + hand (pointer-events-none so CTAs stay clickable) -->
    <img
      :src="heroMask"
      alt=""
      class="dogepay-hero-mask pointer-events-none absolute z-[5] w-full"
    />
  </section>
</template>

<style scoped>
/* Ball — mobile: visible, inset from left; tablet: smaller + further left; desktop: larger + further left */
.dogepay-hero-ball {
  display: block !important;
  height: auto !important;
  max-height: none !important;
}

@media (max-width: 767px) {
  .dogepay-hero-ball {
    left: 1% !important;
    right: auto !important;
    bottom: 12%;
    transform: none !important;
    width: clamp(84px, 21vw, 118px) !important;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .dogepay-hero-ball {
    bottom: 12%;
    left: 50%;
    transform: translateX(calc(-50% - 148px)) !important;
    width: clamp(100px, 13vw, 164px) !important;
  }
}

@media (min-width: 1024px) {
  .dogepay-hero-ball {
    bottom: 7%;
    left: 50%;
    transform: translateX(calc(-50% - 168px)) !important;
    width: clamp(108px, 16vw, 176px) !important;
  }
}

.dogepay-hero-mask {
  position: absolute;
  inset: 0 0 -1px 0;
  z-index: 5;
  min-height: calc(100% + 1px) !important;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
  object-fit: cover !important;
  object-position: bottom center !important;
}

/*
  Hand cell + image:
  — mobile: width 100%, natural height, stacked under copy
  — tablet (md–lg): width 100%, column flex aligns image to bottom
  — desktop (lg+): image never exceeds cell — max 100% × 100%, contain, centered
*/
.dogepay-hero-hand-cell {
  display: flex;
  width: 100%;
  min-height: 0;
}

/* Mobile — width 100%, stack under copy */
@media (max-width: 767px) {
  .dogepay-hero-hand-cell {
    align-items: stretch;
    justify-content: flex-start;
  }

  .dogepay-hero-hand {
    width: 100% !important;
    height: auto !important;
    max-height: none !important;
    max-width: 100% !important;
    object-fit: contain !important;
    object-position: bottom center !important;
  }
}

/* Tablet — width 100%, anchored to bottom of column */
@media (min-width: 768px) and (max-width: 1023px) {
  .dogepay-hero-hand-cell {
    min-height: min(52vh, 420px);
    align-items: flex-end;
    justify-content: center;
  }

  .dogepay-hero-hand {
    width: 100% !important;
    height: auto !important;
    max-height: min(52vh, 420px) !important;
    max-width: 100% !important;
    object-fit: contain !important;
    object-position: bottom center !important;
  }
}

/* Desktop — keep bitmap inside the cell (no “taller than 100%” crop bleed); letterbox if aspect differs */
@media (min-width: 1024px) {
  .dogepay-hero-hand-cell {
    position: relative;
    align-self: stretch;
    min-height: 0;
    flex: 1 1 0%;
    overflow: hidden;
    margin-right: -112px;
    width: calc(100% + 112px);
    max-width: none;
  }

  .dogepay-hero-hand {
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    right: auto !important;
    bottom: auto !important;
    width: auto !important;
    height: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
    transform: translate(-50%, -50%) !important;
    object-fit: contain !important;
    object-position: center center !important;
  }
}

.subtitle-text {
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.8),
    0 1px 3px rgba(0, 0, 0, 0.9);
}

@media (max-width: 768px) {
  .subtitle-text {
    text-shadow:
      0 2px 20px rgba(0, 0, 0, 1),
      0 1px 8px rgba(0, 0, 0, 1),
      0 0 4px rgba(0, 0, 0, 1),
      0 4px 16px rgba(0, 0, 0, 0.9);
  }
}
</style>
