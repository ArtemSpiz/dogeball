<template>
  <section
    id="claim"
    class="w-full py-[100px] max-md:py-12 max-2xl:!bg-cover bgFill flex flex-col items-center md:justify-center gap-4 relative bg-center bg-no-repeat md:min-h-screen"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <!-- The How to Buy and FAQ links still scroll to #presale; land them on the claim -->
    <span id="presale" class="absolute top-0" aria-hidden="true"></span>

    <!-- Background overlay for better widget visibility -->
    <div class="absolute inset-0 bg-black/20 -z-10"></div>

    <h2
      class="title !text-xl lg:!text-4xl max-w-[650px] max-md:max-w-[300px] text-center"
    >
      {{ t("claim.sectionTitle") }}
    </h2>
    <div
      class="relative z-10 flex flex-col items-center w-full max-w-[519px] lg:max-w-[570px] p-2.5"
    >
      <ClaimCard class="max-w-[487px] lg:max-w-[538px] w-full" />
    </div>

    <!-- Toast notifications -->
    <Toast />
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import ClaimCard from "./ClaimCard.vue";
import { Toast } from "../PresaleWidget/ui";
import bgImage from "@/assets/img/bg-presale.png";

const { t } = useI18n();
</script>
