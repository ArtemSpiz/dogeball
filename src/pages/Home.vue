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
import Blog from "@/components/Home/Blog.vue";
// import EmailInput from "@/components/Home/EmailInput.vue";
import CustomButton from "@/ui/CustomButton.vue";
import { useI18n } from "vue-i18n";

import { onMounted } from "vue";
import { useRoute } from "vue-router";
// import WalletTransferModal from "@/components/PresaleWidget/modals/WalletTransferModal.vue";

const { t } = useI18n();

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
  <!-- <EmailInput /> -->
  <PresaleWidget />
  <div class="flex gap-4 items-center justify-center pb-8 md:hidden">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="/DOGEBALLCoinsultAudit.pdf"
    >
      <CustomButton
        :title="t('hero.audit')"
        class="py-[18px] !text-[22px] !w-[160px] h-[50px]"
    /></a>

    <a target="_blank" rel="noopener noreferrer" href="/DOGEBALLWhitepaper.pdf">
      <CustomButton
        :title="t('hero.whitepaper')"
        white-bg="true"
        class="py-[18px] !text-[22px] !w-[160px] h-[50px]"
    /></a>
  </div>
  <Featured />
  <ScrollLogos />
  <About />
  <HowToBuy />
  <Roadmap />
  <Tokenomics />
  <Blog />
  <FAQ />
</template>
