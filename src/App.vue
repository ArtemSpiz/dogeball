<template>
  <Header />
  <router-view />
  <Footer />
  <ConnectWalletModal />
</template>

<script setup>
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
import ConnectWalletModal from "./components/PresaleWidget/modals/ConnectWalletModal.vue";
</script>
