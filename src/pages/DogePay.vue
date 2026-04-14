<script setup>
import DogePayHero from "@/components/DogePay/DogePayHero.vue";
import DogePayFeatures from "@/components/DogePay/DogePayFeatures.vue";
import DogePayDescription1 from "@/components/DogePay/DogePayDescription1.vue";
import DogePayDescription2 from "@/components/DogePay/DogePayDescription2.vue";
import DogePaySteps from "@/components/DogePay/DogePaySteps.vue";
import DogePayPresale from "@/components/DogePay/DogePayPresale.vue";
import DogePayFaqs from "@/components/DogePay/DogePayFaqs.vue";
import DogePayWhitepaper from "@/components/DogePay/DogePayWhitepaper.vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const SCROLLBAR_HIDE = "scrollbar-hide";

function hidePageScrollbars() {
  document.documentElement.classList.add(SCROLLBAR_HIDE);
  document.body.classList.add(SCROLLBAR_HIDE);
}

function showPageScrollbars() {
  document.documentElement.classList.remove(SCROLLBAR_HIDE);
  document.body.classList.remove(SCROLLBAR_HIDE);
}

onMounted(() => {
  hidePageScrollbars();
  const section = route.query.scroll;
  if (section && typeof section === "string") {
    const el = document.getElementById(section);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }
});

onBeforeUnmount(() => {
  showPageScrollbars();
});
</script>

<template>
  <main
    id="dogepay"
    class="min-h-screen overflow-x-hidden overscroll-x-none bg-[#020A2B]"
  >
    <DogePayHero />
    <DogePayFeatures />
    <DogePayDescription1 />
    <DogePaySteps />
    <DogePayDescription2 />
    <DogePayPresale />
    <DogePayFaqs />
    <DogePayWhitepaper />
  </main>
</template>
