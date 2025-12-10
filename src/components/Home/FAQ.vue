<script setup>
import Minus from "@/assets/icons/Minus.vue";
import Plus from "@/assets/icons/Plus.vue";
import { ref } from "vue";
import FAQdog from "@/assets/img/Home/FAQdogMob.png";

const FAQcards = [
  {
    title: "What is $DOGEBALL?",
    text: `Staking $DOGEBALL involves locking your tokens in a secure smart contract for a set period (during presale only) to earn additional $DOGEBALL tokens at no extra cost. Staking rewards will be released following the 7-day minimum vesting period. Refer to the 'STAKING' section in 'HOW TO BUY ABOVE'. <span class="underline">Click Here</span>`,
  },
  {
    title: "What is $DOGEBALL staking?",
    text: `Staking $DOGEBALL involves locking your tokens in a secure smart contract for a set period (during presale only) to earn additional $DOGEBALL tokens at no extra cost. Staking rewards will be released following the 7-day minimum vesting period. Refer to the 'STAKING' section in 'HOW TO BUY ABOVE'. <span class="underline">Click Here</span>`,
  },
  {
    title: "How do I buy $DOGEBALL?",
    text: `Staking $DOGEBALL involves locking your tokens in a secure smart contract for a set period (during presale only) to earn additional $DOGEBALL tokens at no extra cost. Staking rewards will be released following the 7-day minimum vesting period. Refer to the 'STAKING' section in 'HOW TO BUY ABOVE'. <span class="underline">Click Here</span>`,
  },
  {
    title: "Where are my $DOGEBALL tokens?",
    text: `Staking $DOGEBALL involves locking your tokens in a secure smart contract for a set period (during presale only) to earn additional $DOGEBALL tokens at no extra cost. Staking rewards will be released following the 7-day minimum vesting period. Refer to the 'STAKING' section in 'HOW TO BUY ABOVE'. <span class="underline">Click Here</span>`,
  },
  {
    title: "When do I receive my tokens?",
    text: `Staking $DOGEBALL involves locking your tokens in a secure smart contract for a set period (during presale only) to earn additional $DOGEBALL tokens at no extra cost. Staking rewards will be released following the 7-day minimum vesting period. Refer to the 'STAKING' section in 'HOW TO BUY ABOVE'. <span class="underline">Click Here</span>`,
  },
  {
    title: "Is $DOGEBALL token safe to buy?",
    text: `Staking $DOGEBALL involves locking your tokens in a secure smart contract for a set period (during presale only) to earn additional $DOGEBALL tokens at no extra cost. Staking rewards will be released following the 7-day minimum vesting period. Refer to the 'STAKING' section in 'HOW TO BUY ABOVE'. <span class="underline">Click Here</span>`,
  },
  {
    title: "How do I generate a referral code and use bonus codes?",
    text: `Staking $DOGEBALL involves locking your tokens in a secure smart contract for a set period (during presale only) to earn additional $DOGEBALL tokens at no extra cost. Staking rewards will be released following the 7-day minimum vesting period. Refer to the 'STAKING' section in 'HOW TO BUY ABOVE'. <span class="underline">Click Here</span>`,
  },
];

const openIndex = ref(null);

function toggleOpen(index) {
  openIndex.value = openIndex.value === index ? null : index;
}

const isMobile = window.innerWidth < 768;
</script>

<template>
  <div
    class="flex px-5 h-[950px] max-lg:h-[900px] max-md:h-max flex-col relative py-20 max-md:py-12 max-md:pb-0 gap-12 bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Home/FAQBg.png')] overflow-hidden max-md:bg-[url('@/assets/img/Home/FAQBgMob.png')]"
  >
    <div class="title max-w-[800px] text-center mx-auto">
      Frequently Asked Questions
    </div>

    <div class="flex flex-col gap-4 max-w-7xl mx-auto px-4 max-md:h-[640px] ">
      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4 ">
        <div class="flex flex-col gap-4">
          <div
            v-for="(card, i) in isMobile
              ? FAQcards
              : FAQcards.filter((_, idx) => idx % 2 === 0)"
            :key="i * 2"
            class="p-8 max-md:p-4 gap-4 w-full max-w-[500px] cursor-pointer backdrop-blur-sm relative bg-[rgba(53,19,147,0.52)] rounded-2xl flex flex-col transition-all"
            @click="toggleOpen(i * 2)"
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
                mask-composite: exclude;
                padding: 1px;
              "
            ></div>

            <div class="flex gap-4 items-start">
              <div
                class="rounded-full h-8 w-8 min-w-[32px] flex items-center bg-[#FFEEE1] justify-center"
              >
                <component :is="openIndex === i * 2 ? Minus : Plus" />
              </div>

              <div class="text-xl my-auto font-medium leading-[110%]">
                {{ card.title }}
              </div>
            </div>

            <Transition name="expand">
              <p
                v-if="openIndex === i * 2"
                v-html="card.text"
                class="text-base leading-[120%] pl-12 max-md:pl-0"
              />
            </Transition>
          </div>
        </div>

        <div class="flex flex-col gap-4 max-md:hidden">
          <div
            v-for="(card, i) in FAQcards.filter((_, idx) => idx % 2 === 1)"
            :key="i * 2 + 1"
            class="p-8 gap-4 w-full max-w-[500px] cursor-pointer backdrop-blur-sm relative bg-[rgba(53,19,147,0.52)] rounded-2xl flex flex-col transition-all"
            @click="toggleOpen(i * 2 + 1)"
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
                mask-composite: exclude;
                padding: 1px;
              "
            ></div>

            <div class="flex gap-4 items-start">
              <div
                class="rounded-full h-8 w-8 min-w-[32px] flex items-center bg-[#FFEEE1] justify-center"
              >
                <component :is="openIndex === i * 2 + 1 ? Minus : Plus" />
              </div>

              <div class="text-xl my-auto font-medium leading-[110%]">
                {{ card.title }}
              </div>
            </div>

            <Transition name="expand">
              <p
                v-if="openIndex === i * 2 + 1"
                v-html="card.text"
                class="text-base leading-[120%] pl-12"
              />
            </Transition>
          </div>
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
