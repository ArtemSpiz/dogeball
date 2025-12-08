<script setup>
import Burger from "@/assets/icons/Burger.vue";
import Cross from "@/assets/icons/Cross.vue";
import Telegram from "@/assets/icons/Telegram.vue";
import X from "@/assets/icons/X.vue";
import Logo from "@/assets/img/Logo.png";
import { ref } from "vue";

import bgHeader from "@/assets/img/bgHeader.png";

const LinksHeader = [
  {
    title: "About",
  },
  {
    title: "Roadmap",
  },
  {
    title: "How to Buy",
  },
  {
    title: "Play $DOGEBALL",
  },
  {
    title: "Tokenomics",
  },
  {
    title: "ETH L2",
  },
  {
    title: "FAQs",
  },
];

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div
    :class="[
      'absolute bg-cover bg-no-repeat bg-bottom w-full pt-11 px-7 flex flex-col z-50 items-center right-1/2 translate-x-1/2 max-md:px-[18px] pb-6',
      isOpen ? 'bg-[url(@/assets/img/bgHeader.png)] h-screen ' : '',
    ]"
  >
    <div class="w-full flex justify-between items-center">
      <router-link to="/" class="h-[60px] w-auto max-2xl:h-[40px]">
        <img :src="Logo" class="object-contain" />
      </router-link>
      <div
        class="bg-[rgba(255,238,225,0.10)] max-xl:gap-3 max-lg:hidden rounded-[20px] flex items-center gap-5 p-3"
      >
        <div
          v-for="link in LinksHeader"
          class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
        >
          {{ link.title }}
        </div>
      </div>

      <div class="flex items-center max-lg:hidden gap-3">
        <div
          class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
        >
          <Telegram />
        </div>
        <div
          class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
        >
          <X />
        </div>
        <button
          class="py-3 px-4 bg-[#EB4102] rounded-[80px] text-[#FFEEE1] font-grotesk text-sm font-medium"
        >
          Connect Wallet
        </button>
      </div>

      <div class="hidden max-lg:flex" @click="toggleMenu()">
        <component :is="isOpen ? Cross : Burger" />
      </div>
    </div>

    <div v-if="isOpen" class="mt-12 w-full items-center flex flex-col gap-6">
      <div class="flex flex-col items-center gap-6">
        <div
          v-for="link in LinksHeader"
          class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
        >
          {{ link.title }}
        </div>
      </div>
      <div class="flex flex-col w-full items-center gap-4">
        <button
          class="py-3 px-4 max-w-[360px] w-full bg-[#EB4102] rounded-[80px] text-[#FFEEE1] font-grotesk text-sm font-medium"
        >
          Connect Wallet
        </button>

        <div class="flex gap-3 items-center">
          <div
            class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
          >
            <Telegram />
          </div>
          <div
            class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
          >
            <X />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
