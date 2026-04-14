<script setup>
import DogePayHero from "@/components/DogePay/DogePayHero.vue";
import DogePayFeatures from "@/components/DogePay/DogePayFeatures.vue";
import DogePayDescription from "@/components/DogePay/DogePayDescription.vue";
import DogePaySteps from "@/components/DogePay/DogePaySteps.vue";
import DogePayFaqs from "@/components/DogePay/DogePayFaqs.vue";
import DogePayWhitepaper from "@/components/DogePay/DogePayWhitepaper.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
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
</script>

<template>
  <main id="dogepay" class="min-h-screen bg-[#020A2B]">
    <DogePayHero />
    <DogePayFeatures />
    <DogePayDescription variant="1" />
    <DogePaySteps />
    <DogePayDescription variant="2" />
    <section
      id="presale"
      class="scroll-mt-28 bg-[#020A2B] px-6 py-16 max-md:py-12"
    >
      <p class="text-center font-grotesk text-base font-medium md:text-xl">
        TODO: presale section
      </p>
    </section>
    <DogePayFaqs />
    <DogePayWhitepaper />
  </main>
</template>
