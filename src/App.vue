<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script setup>
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
</script>
