<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div
    class="relative bg-cover px-5 h-screen items-center bg-[center_bottom] pt-[140px] max-md:pt-[120px] text-center min-h-[500px] bg-no-repeat bg-[url('@/assets/img/About/HeroBg.png')] flex flex-col gap-4 max-sm:bg-[url('@/assets/img/About/HeroBgMob.png')]"
  >
    <div class="title max-w-[700px] max-md:max-w-[300px]">
      {{ t("ethL2.heroTitle") }}
    </div>
    <div class="text-base leading-[120%]">
      {{ t("ethL2.heroSubtitle") }}
    </div>
  </div>
</template>
