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
    class="relative h-screen min-h-screen scroll-mt-28 overflow-hidden"
  >
    <!-- Background: no overlays — show asset as exported -->
    <img
      :src="heroBg"
      alt=""
      class="absolute inset-0 z-0 h-full w-full object-cover object-top"
    />

    <!-- Ball: full-bleed layer so % center = viewport center (fixes ~1440px vs max-w-[1440px] mismatch) -->
    <img
      :src="heroBall"
      alt=""
      class="dogepay-hero-ball pointer-events-none absolute z-[1] h-auto max-w-none object-contain"
    />

    <!-- Hand: constrained column; ball is NOT inside this wrapper -->
    <div
      class="pointer-events-none absolute inset-0 z-[2] mx-auto flex max-h-none min-h-0 w-full max-w-[1440px] justify-end px-5 md:px-10 lg:px-14"
    >
      <div
        class="relative ml-auto h-full min-h-full w-full max-w-[min(100%,800px)] shrink-0"
      >
        <img
          :src="heroHand"
          alt=""
          class="dogepay-hero-hand pointer-events-none absolute bottom-0 z-[2] object-contain object-bottom"
        />
      </div>
    </div>

    <!-- Foliage mask: bottom-aligned; -1px bottom kills subpixel gap; object-bottom keeps art flush -->
    <img
      :src="heroMask"
      alt=""
      class="dogepay-hero-mask pointer-events-none absolute z-[3] w-full"
    />

    <!-- Copy: padded down from the header so it isn’t hugging the top -->
    <div
      class="relative z-[4] mx-auto grid h-full min-h-full max-w-[1440px] items-start gap-8 px-5 pb-12 pt-[128px] max-md:pt-[108px] md:grid-cols-[1fr_1.05fr] md:gap-6 md:px-10 md:pb-12 md:pt-[158px] lg:pt-[172px] lg:px-14"
    >
      <div
        class="mx-auto w-full max-w-xl self-start text-center md:mt-4 md:mx-0 md:text-left lg:max-w-[840px]"
      >
        <div
          class="title px-1 md:px-0 !text-3xl !leading-[115%] md:!text-4xl md:!leading-[112%] lg:!text-[46px] lg:!leading-[110%]"
        >
          <span class="block">PAY WITH CRYPTO.</span>
          <span class="block">RECEIVE IN FIAT.</span>
          <span class="block">INSTANTLY.</span>
        </div>
        <p
          class="subtitle-text mx-auto mt-4 max-w-[470px] font-grotesk text-base font-normal leading-[120%] max-md:mt-3 max-md:text-sm md:mx-0 md:mt-6"
        >
          DOGEPAY is the next-gen payment layer that connects crypto with
          real-world money — fast, simple, and borderless.
        </p>
        <p
          class="mx-auto mt-4 font-grotesk text-base font-medium max-md:mt-3 max-md:text-sm md:mx-0 md:text-xl"
        >
          Welcome to the PayFi revolution!
        </p>
        <div class="mt-8 flex justify-center md:justify-start">
          <CustomButton
            title="Join Presale"
            class="min-w-[300px] px-8 py-[8px] !text-[16px]"
            @click="scrollToPresale"
          />
        </div>
      </div>

      <!-- Spacer so grid matches illustration column on desktop -->
      <div
        class="hidden min-h-[min(52vh,420px)] md:block md:min-h-[420px]"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<style scoped>
/* Ball: hidden on small screens; from tablet — center shifted further left */
.dogepay-hero-ball {
  display: none !important;
}

@media (min-width: 768px) {
  .dogepay-hero-ball {
    display: block !important;
    bottom: 6%;
    left: 50%;
    transform: translateX(calc(-50% - 100px));
    width: clamp(108px, 16vw, 176px) !important;
    height: auto !important;
    max-height: none !important;
  }
}

@media (min-width: 1024px) {
  .dogepay-hero-ball {
    bottom: 7%;
  }
}

/* Bottom foliage mask: extend 1px past hero bottom to remove hairline gap */
.dogepay-hero-mask {
  position: absolute;
  inset: 0 0 -1px 0;
  z-index: 3;
  min-height: calc(100% + 1px) !important;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
  object-fit: cover !important;
  object-position: bottom center !important;
}

/*
  Global main.css sets img { width: 100%; height: 100%; } — override explicitly.
  Mobile: full width. Tablet+: fill column height (width follows aspect ratio).
*/
.dogepay-hero-hand {
  display: block !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-width: none !important;
  height: auto !important;
  max-height: none !important;
}

@media (min-width: 768px) {
  .dogepay-hero-hand {
    left: auto !important;
    width: auto !important;
    max-width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
  }
}

/*
  Pull past the inner column so the hand lines up with the viewport edge.
  Outer row uses px-5 / md:px-10 / lg:px-14 — negative right must exceed that inset.
*/
@media (min-width: 768px) and (max-width: 1023px) {
  .dogepay-hero-hand {
    right: -96px !important;
  }
}

@media (min-width: 1024px) {
  .dogepay-hero-hand {
    right: -112px !important;
  }
}

/* Match Home hero subtitle readability on photo backgrounds */
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
