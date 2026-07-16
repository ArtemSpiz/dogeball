<script setup>
import { useI18n } from "vue-i18n";
import PresaleWidget from "@/components/PresaleWidget/PresaleWidget.vue";

const { t } = useI18n();
</script>

<template>
  <div
    class="relative min-h-screen h-auto 2xl:min-h-[1240px] px-5 max-md:min-h-[500px] items-center pt-[120px] max-[400px]:bg-contain max-md:pt-[100px] text-center flex flex-col bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/BgHero.png')] max-[400px]:bg-[url('@/assets/img/Roadmap/BgHeroMob.png')] pb-16 md:pb-24"
  >
    <!-- Title - positioned above widget -->
    <div
      class="title max-w-[700px] max-sm:max-w-[300px] text-[32px] max-sm:text-[22px] z-30 relative shrink-0 mb-6 md:mb-8 pt-8"
    >
      {{ t("roadmap.welcome") }}
    </div>

    <!-- Presale Widget container -->
    <div
      class="relative w-full max-w-[1025px] 2xl:max-w-[1820px] max-[400px]:px-4 max-md:w-screen z-10 mt-4 md:mt-auto mb-4 md:mb-0"
    >
      <div class="presale-widget-override">
        <PresaleWidget />
      </div>
    </div>
  </div>
</template>

<style scoped>
.presale-widget-override :deep(section) {
  background-image: none !important;
  min-height: auto !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.presale-widget-override :deep(section > h2) {
  display: none;
}

/* Ensure widget doesn't overflow on mobile */
@media (max-width: 768px) {
  .presale-widget-override {
    max-height: none;
    overflow: visible;
  }

  .presale-widget-override :deep(section > div) {
    padding-bottom: 0 !important;
  }

  /* Ensure widget content is fully visible */
  .presale-widget-override :deep(div[class*="rounded-3xl"]) {
    overflow: visible !important;
    height: auto !important;
    min-height: auto !important;
  }

  /* Ensure inner content container allows full visibility */
  .presale-widget-override :deep(div[class*="flex flex-col gap-4"]) {
    overflow: visible !important;
    height: auto !important;
    flex: none !important;
  }
}
</style>
