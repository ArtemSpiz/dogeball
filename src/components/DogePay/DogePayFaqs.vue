<script setup>
import { useI18n } from "vue-i18n";
import Minus from "@/assets/icons/Minus.vue";
import Plus from "@/assets/icons/Plus.vue";
import { ref } from "vue";
import FAQdog from "@/assets/img/Home/FAQdogMob.png";
import FAQDogs from "@/assets/img/Home/FAQDogs.png";

const { t } = useI18n();

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

const FEES_ANSWER =
  "There are no FX fees for conversion. As the transaction will be completed using our DOGECHAIN, there are near-zero gas fees per transaction which can be paid in $DOGEBALL only.";

/** Order matches two-column layout: left column top-to-bottom, then right column. */
const faqItems = [
  { title: "What is $DOGEPAY?", text: LOREM },
  { title: "How do I get started?", text: LOREM },
  { title: "When do I receive my tokens?", text: LOREM },
  { title: "How do I send money to bank accounts?", text: LOREM },
  {
    title: "Are there any fees for sending money?",
    text: FEES_ANSWER,
  },
  { title: "Is there KYC verification required?", text: LOREM },
  {
    title: "How will this integrate with the $DOGEBALL game and gaming industry?",
    text: LOREM,
  },
];

/** Index of the fees question — shown expanded in the design reference. */
const openIndex = ref(4);

function toggleOpen(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <div
    id="faqs"
    class="scroll-mt-28 flex min-h-[960px] max-2xl:!bg-cover bgFill max-md:min-h-0 max-md:h-auto px-5 flex-col relative py-20 max-md:py-12 max-md:pb-0 gap-12 bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Home/FAQBg.png')] overflow-hidden max-md:bg-[url('@/assets/img/Home/FAQBgMob.png')]"
  >
    <div class="title z-20 uppercase max-w-[700px] text-center mx-auto">
      {{ t("faq.title") }}
    </div>

    <div
      class="w-full max-w-[1600px] max-md:hidden px-5 h-auto absolute bottom-[30px] right-1/2 translate-x-1/2"
    >
      <img :src="FAQDogs" class="object-contain" />
    </div>

    <div
      class="flex z-30 flex-col gap-4 max-w-7xl mx-auto max-md:min-h-0 pb-8 max-md:pb-0"
    >
      <div
        class="grid grid-cols-2 max-md:grid-cols-1 gap-4 items-stretch max-md:max-w-[450px] max-md:mx-auto"
      >
        <div
          v-for="(card, idx) in faqItems"
          :key="idx"
          class="p-8 max-md:p-4 gap-4 w-full max-w-[450px] max-md:max-w-none justify-self-center h-full backdrop-blur-sm relative bg-[rgba(53,19,147,0.52)] rounded-2xl flex flex-col transition-all"
        >
          <div
            class="absolute inset-0 rounded-2xl"
            style="
              background: linear-gradient(
                145deg,
                rgba(255, 255, 255, 0.6) 0%,
                rgba(255, 255, 255, 0.1) 40%,
                rgba(255, 255, 255, 0.6) 100%
              );
              -webkit-mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
              mask-composite: exclude;
              padding: 1px;
            "
          ></div>

          <div
            class="flex gap-4 items-start cursor-pointer z-50"
            @click="toggleOpen(idx)"
          >
            <div
              class="rounded-full h-8 w-8 min-w-[32px] flex items-center bg-[#FFEEE1] justify-center shrink-0"
            >
              <component :is="openIndex === idx ? Minus : Plus" />
            </div>

            <div class="text-xl max-md:text-base my-auto font-bold leading-[110%]">
              {{ card.title }}
            </div>
          </div>

          <Transition name="expand">
            <p
              v-if="openIndex === idx"
              class="text-base max-md:text-sm leading-[120%] font-grotesk font-normal z-50 pl-12 max-md:pl-0 text-white"
            >
              {{ card.text }}
            </p>
          </Transition>
        </div>
      </div>
    </div>
    <div class="h-auto w-full mx-auto max-w-[400px] md:hidden">
      <img :src="FAQdog" class="object-contain" />
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
