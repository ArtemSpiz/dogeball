<script setup>
import stepsBg from "@/assets/img/Dogepay/steps-bg.png";
import stepsPhones from "@/assets/img/Dogepay/steps-phones.png";

const steps = [
  {
    step: "Step 1",
    title: "Select your crypto",
    body: "Choose the cryptocurrency you want to send and check your available balance. All users will have a unique wallet address, with addresses for all major networks (ETH, BTC, SOL, BNB, TRON, BASE, OP, POLYGON, ARBITRUM and LINEA).",
  },
  {
    step: "Step 2",
    title: "Enter amount",
    body: "Input the amount in crypto — the app will automatically convert it to the recipient's currency. You can also choose to send crypto (instead of the recipient receiving FIAT) to the recipient's $DOGEPAY wallet.",
  },
  {
    step: "Step 3",
    title: "Confirm and send",
    body: "Review the bank details and tap Pay to complete the transfer instantly.",
  },
];
</script>

<template>
  <section
    id="steps"
    class="relative scrollbar-hide scroll-mt-28 overflow-hidden py-16 max-md:py-12 md:py-20 lg:py-24"
  >
    <img
      :src="stepsBg"
      alt=""
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
    />

    <div
      class="relative z-[1] mx-auto flex max-w-[1400px] flex-col items-center px-5 md:px-10 lg:px-14"
    >
      <div class="flex max-w-[900px] flex-col items-center gap-4 text-center">
        <h2 class="title px-2 md:px-0">With the <br />$DOGEPAY app</h2>

        <p
          class="font-grotesk text-sm font-medium leading-[130%] text-[#FFEEE1]/95 md:text-base"
        >
          All transactions are completed using the $DOGEPAY app
        </p>
      </div>

      <!-- Phones sit behind cards; large negative margin pulls cards up over ~bottom half of phones -->
      <div class="relative z-[1] mt-8 w-full md:mt-10 lg:mt-12">
        <div
          class="relative z-[1] mx-auto flex w-full max-w-[min(100%,960px)] justify-center"
        >
          <img
            :src="stepsPhones"
            alt=""
            width="900"
            height="600"
            class="relative z-[1] h-auto w-full max-w-[min(100%,820px)] object-contain md:max-w-[min(100%,900px)] lg:max-w-[min(100%,960px)]"
          />
        </div>

        <div
          class="relative z-[2] mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 max-md:-mt-32 max-md:px-0 md:-mt-[clamp(14rem,38vw,23rem)] md:grid-cols-3 md:gap-4 lg:-mt-[clamp(15rem,42vw,24rem)] lg:gap-6 xl:-mt-[clamp(14rem,36vw,24rem)]"
        >
          <article
            v-for="(item, i) in steps"
            :key="i"
            class="relative flex min-h-0 flex-col gap-3 rounded-2xl bg-[rgba(53,19,147,0.52)] px-6 py-6 backdrop-blur-[5px] max-md:px-5 max-md:py-5 md:gap-4 md:px-7 md:py-7"
          >
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
                mask:
                  linear-gradient(#fff 0 0) content-box,
                  linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                padding: 1px;
              "
            ></div>

            <p
              class="relative z-10 font-grotesk text-xs font-medium tracking-wide text-white md:text-sm"
            >
              {{ item.step }}
            </p>
            <h3
              class="relative z-10 font-grotesk text-base font-semibold leading-[120%] text-white md:text-lg md:leading-[118%] lg:text-xl lg:leading-[115%]"
            >
              {{ item.title }}
            </h3>
            <p class="description relative z-10 text-white md:text-sm">
              {{ item.body }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
