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
    <div class="flex flex-col items-center gap-9 max-md:gap-7 w-full">
      <div class="flex flex-col items-center gap-8 max-md:gap-6 w-full px-4">
        <div class="title uppercase max-md:whitespace-normal max-md:text-center break-words">
          {{ t("roadmapGame.title") }}
        </div>
        <div
          class="text-2xl max-md:text-base font-medium leading-[90%] max-md:leading-[120%] max-w-[900px] w-full px-2 break-words"
        >
          {{ t("roadmapGame.description") }}
        </div>
      </div>
      <router-link to="/play" class="w-full max-w-[200px] justify-center flex">
        <CustomButton
          :title="t('roadmapGame.play')"
          class="w-full max-w-[200px]"
        />
      </router-link>
    </div>

    <div
      class="rounded-2xl relative max-w-[800px] w-full mx-4 decoration-from-font bg-[rgba(0,0,0,0.36)] font-grotesk p-6 max-md:p-4 text-base max-md:text-sm font-medium leading-[125%] break-words overflow-hidden"
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
