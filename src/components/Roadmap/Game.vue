<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import CustomButton from "@/ui/CustomButton.vue";

const { t } = useI18n();

const privacyNote = computed(() => {
  const text = t("roadmapGame.privacyNote");
  // Handle both English and Spanish versions
  const willNotPattern = /(WILL NOT|NO SERÁN)/i;
  return text.replace(willNotPattern, '<span class="textUnderline">$&</span>');
});
</script>

<template>
  <div
    class="flex flex-col gap-14 max-md:gap-10 h-[590px] text-center justify-center items-center px-5 max-md:h-max max-md:py-12 bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/GameBg.png')] max-md:bg-[url('@/assets/img/Roadmap/GameBgMob.png')]"
  >
    <div class="flex flex-col items-center gap-9 max-md:gap-7">
      <div class="flex flex-col items-center gap-8 max-md:gap-6">
        <div class="title uppercase whitespace-nowrap">
          {{ t("roadmapGame.title") }}
        </div>
        <div
          class="text-2xl max-md:text-xl font-medium leading-[80%] max-md:leading-[100%] max-w-[900px]"
        >
          {{ t("roadmapGame.description") }}
        </div>
      </div>
      <CustomButton
        :title="t('roadmapGame.comingSoon')"
        class="w-full max-w-[200px]"
      />
    </div>

    <div
      class="rounded-2xl relative max-w-[800px] decoration-from-font bg-[rgba(0,0,0,0.36)] p-6 text-base font-medium leading-[125%]"
    >
      <div
        class="absolute inset-0 rounded-2xl pointer-events-none"
        style="
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.1) 70%,
            rgba(255, 255, 255, 0) 100%
          );

          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
        "
      ></div>

      <span class="z-30" v-html="privacyNote"></span>
    </div>
  </div>
</template>

<style scoped>
.textUnderline {
  text-decoration-line: underline;
  text-underline-position: from-font;
}
</style>
