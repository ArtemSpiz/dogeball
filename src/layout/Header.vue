<script setup>
import Burger from "@/assets/icons/Burger.vue";
import Cross from "@/assets/icons/Cross.vue";
import Telegram from "@/assets/icons/Telegram.vue";
import X from "@/assets/icons/X.vue";
import Logo from "@/assets/img/Logo.png";
import { ref, watch } from "vue";

import bgHeader from "@/assets/img/bgHeader.png";
import { useRoute } from "vue-router";

const LinksHeader = [
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Roadmap",
    link: "/roadmap",
  },
  {
    title: "How to Buy",
    link: "/",
  },
  {
    title: "Play $DOGEBALL",
    link: "/",
  },
  {
    title: "Tokenomics",
    link: "/",
  },
  {
    title: "ETH L2",
    link: "/",
  },
  {
    title: "FAQs",
    link: "/",
  },
];

const isOpen = ref(false);
const route = useRoute();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false;
  }
);
</script>

<template>
  <div
    :class="[
      'absolute max- bg-cover bg-no-repeat bg-bottom w-full pt-6 px-7 flex flex-col z-50 items-center right-1/2 translate-x-1/2 max-md:px-[18px] pb-6',
      isOpen ? 'bg-[url(@/assets/img/bgHeader.png)] h-screen ' : '',
    ]"
  >
    <div class="w-full flex justify-between items-center">
      <router-link to="/" class="2xl:h-[70px] h-[60px] w-auto max-xl:h-[40px]">
        <img :src="Logo" class="object-contain" />
      </router-link>
      <div
        class="absolute left-1/2 -translate-x-1/2 bg-[rgba(255,238,225,0.10)] max-xl:gap-3 max-lg:hidden rounded-[20px] flex items-center gap-5 p-3"
      >
        <router-link
          v-for="link in LinksHeader"
          :to="link.link"
          class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
        >
          {{ link.title }}
        </router-link>
      </div>

      <div class="flex items-center max-lg:hidden gap-3">
        <a
          class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
          href="https://t.me/dogeballtoken"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Telegram />
        </a>
        <a
          target="_blank"
          href="https://x.com/dogeballtoken"
          rel="noopener noreferrer"
          class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
        >
          <X />
        </a>
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
        <router-link
          v-for="link in LinksHeader"
          :to="link.link"
          да
          class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
        >
          {{ link.title }}
        </router-link>
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
