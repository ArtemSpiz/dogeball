<script setup>
import Burger from "@/assets/icons/Burger.vue";
import Cross from "@/assets/icons/Cross.vue";
import Telegram from "@/assets/icons/Telegram.vue";
import X from "@/assets/icons/X.vue";
import Logo from "@/assets/img/Logo.png";
import { ref, watch } from "vue";

import bgHeader from "@/assets/img/bgHeader.png";
import { useRoute, useRouter } from "vue-router";

const LinksHeader = [
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Roadmap",
    link: "#roadmap",
  },
  {
    title: "How to Buy",
    link: "#howToBuy",
  },
  {
    title: "Play $DOGEBALL",
    link: "/play-$DOGEBALL",
  },
  {
    title: "Tokenomics",
    link: "#tokenomics",
  },
  {
    title: "ETH L2",
    link: "/eth-l2",
  },
  {
    title: "FAQs",
    link: "#faq",
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

const router = useRouter();

const scrollToSection = async (hash) => {
  const id = hash.replace("#", "");

  if (route.path !== "/") {
    await router.push({ path: "/", query: { scroll: id } });
    return;
  }

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div
    :class="[
      'absolute max- bg-cover bg-no-repeat bg-bottom w-full pt-6 px-7 flex flex-col z-50 items-center mx-auto max-md:px-[18px] pb-6',
      isOpen ? 'bg-[url(@/assets/img/bgHeader.png)] h-screen ' : '',
    ]"
  >
    <div class="w-full flex justify-between items-center">
      <router-link to="/" class="2xl:h-[70px] items-start h-[60px] w-auto max-xl:h-[40px]">
        <img :src="Logo" class="object-contain" />
      </router-link>
      <div
        class="absolute left-1/2 -translate-x-1/2 bg-[rgba(255,238,225,0.10)] max-xl:gap-3 max-lg:hidden rounded-[20px] flex items-center gap-5 p-3"
      >
        <template v-for="link in LinksHeader">
          <button
            v-if="link.link.startsWith('#')"
            @click="scrollToSection(link.link)"
            class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
          >
            {{ link.title }}
          </button>

          <router-link
            v-else
            :to="link.link"
            class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
          >
            {{ link.title }}
          </router-link>
        </template>
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
        <template v-for="link in LinksHeader">
          <button
            v-if="link.link.startsWith('#')"
            @click="
              scrollToSection(link.link);
              toggleMenu();
            "
            class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
          >
            {{ link.title }}
          </button>

          <router-link
            v-else
            :to="link.link"
            @click="toggleMenu()"
            class="text-[#FFEEE1] cursor-pointer text-sm font-medium"
          >
            {{ link.title }}
          </router-link>
        </template>
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
