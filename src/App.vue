<template>
  <Header v-if="!shouldHideHeader" />
  <router-view />
  <Footer v-if="!shouldHideHeader" />
  <LaunchOfferModal />
  <ConnectWalletModal />
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
import ConnectWalletModal from "./components/PresaleWidget/modals/ConnectWalletModal.vue";
import LaunchOfferModal from "./components/LaunchOfferModal.vue";

const route = useRoute();
const isGamePage = computed(() => route.name === "Game");
const isMobileLandscape = ref(false);

const checkMobileLandscape = () => {
  if (typeof window === "undefined") return;
  
  const isMobile = window.innerWidth <= 768;
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  
  isMobileLandscape.value = isMobile && isLandscape;
};

const shouldHideHeader = computed(() => {
  return isGamePage.value && isMobileLandscape.value;
});

onMounted(() => {
  checkMobileLandscape();
  window.addEventListener("resize", checkMobileLandscape);
  window.addEventListener("orientationchange", checkMobileLandscape);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobileLandscape);
  window.removeEventListener("orientationchange", checkMobileLandscape);
});
</script>
