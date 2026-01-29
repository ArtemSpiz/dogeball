<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import Burger from "@/assets/icons/Burger.vue";
import Cross from "@/assets/icons/Cross.vue";
import Telegram from "@/assets/icons/Telegram.vue";
import X from "@/assets/icons/X.vue";
import Logo from "@/assets/img/Logo.png";
import { ref, watch, onMounted, onUnmounted } from "vue";
import LanguageSelector from "@/components/LanguageSelector.vue";

import bgHeader from "@/assets/img/bgHeader.png";
import { useRoute, useRouter } from "vue-router";
import { useWallet } from "@/composables";
import { truncateString } from "@/utils/format";

const { t, locale } = useI18n();

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem("locale", lang);
};

const LinksHeader = computed(() => [
  {
    title: t("header.about"),
    link: "#about",
  },
  {
    title: t("header.roadmap"),
    link: "#roadmap",
  },
  {
    title: t("header.howToBuy"),
    link: "#howToBuy",
  },
  {
    title: t("header.playDogeball"),
    link: "/play-$DOGEBALL",
  },
  {
    title: t("header.tokenomics"),
    link: "#tokenomics",
  },
  {
    title: t("header.blog"),
    link: "#blog",
  },
  {
    title: t("header.ethL2"),
    link: "/eth-l2",
  },
  {
    title: t("header.faqs"),
    link: "#faq",
  },
]);

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
const { address, disconnect, showConnectWalletModal, isConnected } =
  useWallet();

const onWalletClick = () => {
  if (address.value) disconnect();
  else showConnectWalletModal();
};
</script>

<template>
  <div
    :class="[
      'fixed bg-cover bg-no-repeat  bg-bottom w-full  px-7 flex flex-col z-50 items-center mx-auto max-md:px-[18px] ',
      isOpen
        ? 'bg-[url(@/assets/img/bgHeader.png)] h-screen pt-0'
        : ' bg-[linear-gradient(180deg,rgba(2,10,43,0.95)_0%,rgba(2,10,43,0.85)_100%)] rounded-full mt-0',
    ]"
  >
    <div class="w-[-webkit-fill-available] flex justify-between items-center">
      <router-link
        to="/"
        class="2xl:h-[70px] max-w-[300px] max-md:max-w-[200px] flex justify-start items-start h-[60px] w-auto max-xl:h-[40px] max-xl:max-w-[200px]"
      >
        <img :src="Logo" class="object-contain" />
      </router-link>
      <div
        class="absolute left-1/2 -translate-x-1/2 bg-[rgba(255,238,225,0.10)] max-xl:gap-3 max-lg:hidden rounded-[20px] flex items-center gap-5 p-3"
      >
        <template v-for="link in LinksHeader" :key="link.link">
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
        <LanguageSelector @change="changeLanguage" />
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
          class="h-[2.75rem] leading-[1.3] px-4 bg-[#EB4102] rounded-[80px] text-[#FFEEE1] font-grotesk text-sm font-medium"
          @click="onWalletClick"
        >
          {{ address ? t('header.disconnectWallet') : t("header.connectWallet") }}
        </button>
      </div>

      <div class="hidden max-lg:flex" @click="toggleMenu()">
        <component :is="isOpen ? Cross : Burger" />
      </div>
    </div>

    <div v-if="isOpen" class="mt-12 w-full items-center flex flex-col gap-6 overflow-y-auto pb-4 max-h-[calc(100vh-9rem)]">
      <div class="flex flex-col items-center gap-6">
        <template v-for="link in LinksHeader" :key="link.link">
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
        <LanguageSelector @change="changeLanguage" />
        <button
          class="py-3 max-md:max-h-[40px] max-md:flex max-md:items-center max-md:justify-center px-4 max-w-[360px] w-full bg-[#EB4102] rounded-[80px] text-[#FFEEE1] font-grotesk text-sm font-medium"
          @click="onWalletClick"
        >
          {{ address ? t('header.disconnectWallet') : t("header.connectWallet") }}
        </button>

        <div class="flex gap-3 items-center">
          <a
            href="https://t.me/dogeballtoken"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
          >
            <Telegram />
          </a>
          <a
            href="https://x.com/dogeballtoken"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[rgba(255,238,225,0.10)] cursor-pointer p-2 rounded-full"
          >
            <X />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
