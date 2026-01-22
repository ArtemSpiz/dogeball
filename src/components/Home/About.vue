<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import AboutIcon1 from "@/assets/img/Home/AboutIcon1.png";
import AboutIcon2 from "@/assets/img/Home/AboutIcon2.png";
import AboutIcon3 from "@/assets/img/Home/AboutIcon3.png";
import AboutIcon4 from "@/assets/img/Home/AboutIcon4.png";
import AboutIcon5 from "@/assets/img/Home/AboutIcon5.png";
import CustomButton from "@/ui/CustomButton.vue";
import AboutCardBg1 from "@/assets/img/Home/AboutCardBg1.png";
import AboutCardBg2 from "@/assets/img/Home/AboutCardBg2.png";

const { t } = useI18n();

const AboutCards = computed(() => [
  {
    icon: AboutIcon1,
    title: t("about.card1"),
  },
  {
    icon: AboutIcon2,
    title: t("about.card2"),
  },
  {
    icon: AboutIcon3,
    title: t("about.card3"),
  },
  {
    icon: AboutIcon4,
    title: t("about.card4"),
  },
  {
    icon: AboutIcon5,
    title: t("about.card5"),
  },
]);
</script>

<template>
  <div
    id="about"
    class="flex flex-col gap-9 max-md:gap-8 pt-[80px] max-md:py-12 pb-[120px] justify-center items-center px-[100px] lg:px-11 max-md:px-5 bg-[url('@/assets/img/Home/AboutBg.png')] bg-cover bg-bottom bg-no-repeat"
  >
    <div class="flex flex-col items-center gap-8">
      <div class="title">{{ t("about.title") }}</div>
      <div class="font-grotesk text-base text-center font-medium md:text-xl">
        {{ t("about.secSubtitle") }}
      </div>
      <div class="flex items-center text-center flex-col gap-4">
        <div class="title">
          {{ t("about.subtitle") }}
        </div>
        <div
          class="font-grotesk text-base font-medium md:text-xl max-w-[730px]"
        >
          {{ t("about.description") }}
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-6 gap-4 max-w-[1400px] max-md:gap-2 max-md:grid-cols-2 max-md:grid-rows-3 max-md:w-full"
    >
      <div
        v-for="(card, i) in AboutCards"
        :key="i"
        :class="[
          'px-8 max-md:px-2 py-4 relative max-md:w-full max-md:min-w-0 h-[120px] gap-4 flex flex-col items-center justify-between bg-[rgba(53,19,147,0.52)] rounded-2xl backdrop-blur-[5px]',
          {
            'max-md:order-1': i === 0, // 1
            'max-md:order-2': i === 1, // 2
            'max-md:order-3': i === 3, // 4
            'max-md:order-4': i === 4, // 5
            'max-md:order-5 max-md:col-span-2': i === 2, // Mobile: last card spans full width
            // Desktop grid layout: 3-2 (top row: 3 cards, bottom row: 2 cards centered, same width as top)
            'max-md:col-span-1': i !== 2, // Mobile: all cards except last one span 1 column
            'md:col-span-2': i === 0 || i === 1 || i === 2, // Desktop top row: Cards 1, 2, 3 each span 2 columns
            'md:col-span-2 md:col-start-2': i === 3, // Desktop bottom row: Card 4 spans 2 columns starting at column 2 (centered)
            'md:col-span-2 md:col-start-4': i === 4, // Desktop bottom row: Card 5 spans 2 columns starting at column 4 (centered)
          },
        ]"
      >
        <div
          class="absolute pointer-events-none inset-0 rounded-2xl"
          :class="[i === 1 ? '' : '[1325px]:hidden']"
          style="
            background: linear-gradient(
              180deg,
              #8b94f5 0%,
              rgba(255, 255, 255, 0.1) 90%,
              rgba(255, 255, 255, 0) 100%
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            padding: 1px;
          "
        ></div>

        <div
          v-if="card.bg"
          class="absolute pointer-events-none max-[1325px]:hidden z-0"
          :class="[
            { 'w-[415px]  top-0 right-0': i === 0 },
            { 'w-[427px]  top-0 left-0': i === 2 },
            { 'w-[310px]  top-0 right-0': i === 3 },
            { 'w-[275px]  top-0 left-0': i === 4 },
          ]"
        >
          <img class="object-fill h-[120px]" :src="card.bg" />
        </div>

        <div class="w-6 h-6 p-1 z-10 bg-[#FFEEE1] rounded-full">
          <img :src="card.icon" />
        </div>

        <div
          class="font-grotesk z-10 leading-[110%] text-xs max-md:leading-[125%] md:text-base font-medium text-center max-md:max-w-full"
          :class="[
            { 'md:max-w-[300px]': i !== 3 && i !== 4 && i !== 2 }, // Desktop top row cards keep max-width
            { 'max-md:max-w-[120px] md:max-w-[250px]': i === 3 }, // Mobile & Desktop first bottom card: narrower to allow 2 lines
            { 'max-md:max-w-[150px]': i === 2 }, // Mobile last card: reduced max-width
            { 'md:max-w-full': i === 4 }, // Desktop second bottom card uses full width
          ]"
        >
          {{ card.title }}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3 items-center text-center justify-center">
      <div class="description max-w-[420px] max-md:px-4">
        {{ t("about.testDescription") }}
      </div>
      <router-link
        to="/eth-l2"
        class="w-full max-w-[200px] justify-center flex"
      >
        <CustomButton
          :title="t('about.clickHere')"
          class="w-full max-w-[200px]"
        />
      </router-link>

      <div
        class="font-grotesk text-xs font-medium max-w-[730px] max-md:max-w-[300px] leading-[160%]"
      >
        {{ t("about.partnerships") }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 3 / 1 / 4 / 3;
}
.div4 {
  grid-area: 2 / 1 / 3 / 2;
}
.div5 {
  grid-area: 2 / 2 / 3 / 3;
}
</style>
