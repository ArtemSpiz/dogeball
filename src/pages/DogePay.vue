<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <main
    class="min-h-[60vh] pt-[120px] max-md:pt-[100px] pb-16 px-6 flex flex-col items-center justify-center text-center bg-[#020A2B]"
  >
    <h1
      class="font-grotesk text-[#FFEEE1] text-3xl max-md:text-2xl font-semibold mb-4"
    >
      {{ t("dogepay.title") }}
    </h1>
    <p class="text-[#FFEEE1]/80 max-w-lg text-base leading-relaxed">
      {{ t("dogepay.placeholder") }}
    </p>
  </main>
</template>
