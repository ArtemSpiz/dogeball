<script setup>
import Hero from "@/components/Home/Hero.vue";
import Featured from "@/components/Home/Featured.vue";
import ScrollLogos from "@/components/Home/ScrollLogos.vue";
import About from "@/components/Home/About.vue";
import PresaleWidget from "@/components/PresaleWidget/PresaleWidget.vue";
import Roadmap from "@/components/Home/Roadmap.vue";
import HowToBuy from "@/components/Home/HowToBuy.vue";
import FAQ from "@/components/Home/FAQ.vue";
import Tokenomics from "@/components/Home/Tokenomics.vue";
import EmailInput from "@/components/Home/EmailInput.vue";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  const section = route.query.scroll;
  if (section) {
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
  <Hero />
  <EmailInput />
  <PresaleWidget />
  <Featured />
  <ScrollLogos />
  <About />
  <Roadmap />
  <HowToBuy />
  <Tokenomics />
  <FAQ />
</template>
