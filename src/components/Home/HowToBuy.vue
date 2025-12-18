<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import HowToBuyDog from "@/assets/img/Home/HowToBuyDog.png";
import HowToBuyCoin from "@/assets/img/Home/HowToBuyCoin.png";
import HowToBuyMoney from "@/assets/img/Home/HowToBuyMoney.png";

const { t } = useI18n();

const HEADER_HEIGHT = 40;

const scrollToPresale = () => {
  const el = document.getElementById("presale");
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

const getTextWithLink = (key) => {
  // vue-i18n treats `{link}` as an interpolation placeholder and will render it as an empty
  // string if no value is provided. We provide a sentinel token and replace it with HTML.
  const LINK_TOKEN = "__PRESALE_LINK__";
  const text = t(key, { link: LINK_TOKEN });
  const clickHereText = t("common.clickHere") || "Click Here";
  // Note: v-html does not compile Vue directives like @click, so we use a data attribute
  // and delegate the click in `handleHtmlClick`.
  const linkHtml = `<a href="#presale" data-scroll="presale" class="underline text-inherit cursor-pointer hover:opacity-90">${clickHereText}</a>`;
  return text.replace(LINK_TOKEN, linkHtml);
};

const HowBuyCards = computed(() => [
  {
    type: "orange",
    underTitle: t("howToBuy.step1"),
    title: t("howToBuy.connectWallet"),
    text: getTextWithLink("howToBuy.connectWalletDesc"),
  },
  {
    type: "white",
    underTitle: t("howToBuy.step2"),
    title: t("howToBuy.selectToken"),
    text: t("howToBuy.selectTokenDesc"),
  },
  {
    type: "purple",
    underTitle: t("howToBuy.step3"),
    title: t("howToBuy.buyToken"),
    text: t("howToBuy.buyTokenDesc"),
  },
  {
    type: "white",
    underTitle: t("howToBuy.step4"),
    title: t("howToBuy.claimToken"),
    text: t("howToBuy.claimTokenDesc"),
  },
  {
    type: "orange",
    underTitle: t("howToBuy.earnRewards"),
    title: t("howToBuy.staking"),
    text: t("howToBuy.stakingDesc"),
  },
]);

function handleHtmlClick(e) {
  const target = e.target.closest("[data-scroll]");
  if (!target) return;

  e.preventDefault();

  const id = target.getAttribute("data-scroll");
  if (id === "presale") {
    scrollToPresale();
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <div
    id="howToBuy"
    class="bg-[center_bottom] max-xl:!bg-cover bgFill bg-cover bg-no-repeat bg-[url('@/assets/img/Home/HowToBuyBg.png')] max-lg:bg-[url('@/assets/img/Home/HowToBuyBgMob.png')]"
  >
    <div
      class="flex max-w-[2000px] mx-auto relative overflow-hidden gap-14 max-md:gap-8 max-xl:flex-col max-lg:h-[900px] max-md:h-[750px] py-[150px] max-md:py-12"
    >
      <div
        class="title min-w-[340px] pl-20 max-lg:px-20 max-md:px-5 max-md:mx-auto max-md:text-center max-md:min-w-0 max-md:max-w-[165px]"
      >
        {{ t("howToBuy.title") }}
      </div>

      <div
        class="grid grid-cols-[repeat(3,1fr)] pr-20 max-xl:px-20 grid-rows-[repeat(2,1fr)] gap-6 max-lg:hidden"
      >
        <div
          v-for="(card, i) in HowBuyCards"
          :key="i"
          class="p-6 flex rounded-2xl flex-col gap-4 backdrop-blur-sm relative"
          :class="[
            { 'bg-[#E53501] text-white': card.type === 'orange' },
            { 'bg-[#CEC2B1] text-[#020323]': card.type === 'white' },
            { 'bg-[#30197A] text-white': card.type === 'purple' },

            i === 0 && 'row-start-1 col-start-1',
            i === 1 && 'row-start-1 col-start-2',
            i === 2 && 'row-start-1 col-start-3 row-span-2',
            i === 3 && 'row-start-2 col-start-1',
            i === 4 && 'row-start-2 col-start-2',
          ]"
        >
          <div class="flex flex-col gap-2">
            <div class="text-base font-medium leading-[125%]">
              {{ card.underTitle }}
            </div>
            <div class="text-2xl font-medium leading-[110%]">
              {{ card.title }}
            </div>
          </div>

          <p
            v-html="card.text"
            @click="handleHtmlClick"
            class="description"
          ></p>

          <div
            v-if="card.type === 'purple'"
            class="absolute left-0 bottom-0 w-[250px] h-auto"
          >
            <img :src="HowToBuyCoin" class="object-contain" />
          </div>
        </div>
      </div>

      <div
        class="max-lg:flex hidden gap-6 max-md:gap-2 px-20 scrollbar-hide overflow-x-auto snap-x snap-mandatory max-md:px-5 pb-3"
      >
        <div
          v-for="(card, i) in HowBuyCards"
          :key="'mob_' + i"
          class="min-w-[50%] max-w-[80%] max-md:min-w-[350px] snap-center p-6 flex rounded-2xl flex-col gap-4 backdrop-blur-sm relative"
          :class="[
            { 'bg-[#E53501] text-white': card.type === 'orange' },
            { 'bg-[#CEC2B1] text-[#020323]': card.type === 'white' },
            { 'bg-[#30197A] text-white ': card.type === 'purple' },
          ]"
        >
          <div class="flex flex-col gap-2">
            <div class="text-base font-medium leading-[125%]">
              {{ card.underTitle }}
            </div>
            <div class="text-2xl font-medium leading-[110%]">
              {{ card.title }}
            </div>
          </div>

          <p
            v-html="card.text"
            @click="handleHtmlClick"
            class="description !font-medium"
          ></p>

          <div
            v-if="card.type === 'purple'"
            class="absolute left-0 bottom-0 w-[250px] max-lg:hidden h-auto"
          >
            <img :src="HowToBuyCoin" class="object-contain" />
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-20 left-0 2xl:w-[320px] w-[400px] max-md:w-[350px] h-auto max-xl:static max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:bottom-2 max-md:bottom-[-90px]"
      >
        <img :src="HowToBuyDog" class="object-contain" />
      </div>

      <div
        class="absolute bottom-0 lg:hidden right-1/2 translate-x-1/2 w-full h-auto"
      >
        <img :src="HowToBuyMoney" class="object-contain" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
