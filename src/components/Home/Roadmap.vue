<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import RoadmapImage1 from "@/assets/img/Home/RoadmapImg1.png";
import RoadmapImage2 from "@/assets/img/Home/RoadmapImg2.png";
import RoadmapImage3 from "@/assets/img/Home/RoadmapImg3.png";
import RoadmapImage4 from "@/assets/img/Home/RoadmapImg4.png";
import bg from "@/assets/img/Home/RoadmapBg.png";

const { t } = useI18n();

const RoadmapCards = computed(() => [
  {
    phase: t("roadmap.phase1"),
    title: t("roadmap.evolution"),
    subtitles: [
      { subtitle: t("roadmap.phase1Sub1") },
      { subtitle: t("roadmap.phase1Sub2") },
      { subtitle: t("roadmap.phase1Sub3") },
      { subtitle: t("roadmap.phase1Sub4") },
    ],
    image: RoadmapImage1,
  },
  {
    phase: t("roadmap.phase2"),
    title: t("roadmap.development"),
    subtitles: [
      { subtitle: t("roadmap.phase2Sub1") },
      { subtitle: t("roadmap.phase2Sub2") },
      { subtitle: t("roadmap.phase2Sub3") },
      { subtitle: t("roadmap.phase2Sub4") },
    ],
    image: RoadmapImage2,
  },
  {
    phase: t("roadmap.phase3"),
    title: t("roadmap.expansion"),
    subtitles: [
      { subtitle: t("roadmap.phase3Sub1") },
      { subtitle: t("roadmap.phase3Sub2") },
      { subtitle: t("roadmap.phase3Sub3") },
      { subtitle: t("roadmap.phase3Sub4") },
    ],
    image: RoadmapImage3,
  },
  {
    phase: t("roadmap.phase4"),
    title: t("roadmap.gameV2Expansion"),
    subtitles: [
      { subtitle: t("roadmap.phase4Sub1") },
      { subtitle: t("roadmap.phase4Sub2") },
      { subtitle: t("roadmap.phase4Sub3") },
      { subtitle: t("roadmap.phase4Sub4") },
    ],
    image: RoadmapImage4,
  },
]);
</script>

<template>
  <div
    id="roadmap"
    class="relative h-[800px] max-xl:!bg-cover bgFill bg-center bg-no-repeat bg-[url('@/assets/img/Home/RoadmapBg.png')] max-xl:h-auto"
  >
    <div
      class="max-w-[2000px] mx-auto justify-start pt-[85px] max-xl:py-[85px] max-md:py-12 flex flex-col items-center gap-8 px-20 max-md:px-5"
    >
      <div class="title uppercase">{{ t("roadmap.title") }}</div>
      <div
        class="flex gap-4 max-md:gap-2 justify-center relative items-start max-xl:grid max-xl:grid-cols-2 max-md:grid-cols-1"
      >
        <div
          v-for="(card, index) in RoadmapCards"
          :key="index"
          :class="[
            'p-8 gap-4 max-md:px-6 max-md:py-4 h-auto max-xl:h-full w-[307px] max-xl:w-auto flex flex-col items-start border border-[#8B94F5] backdrop-blur-[5px] rounded-2xl bg-[rgba(53,19,147,0.52)] max-xl:mt-0',
            { 'mt-24': index === 1 },
            { 'mt-24': index === 2 },
          ]"
        >
          <div class="flex flex-col gap-2">
            <div class="font-medium text-base leading-[125%]">
              {{ card.phase }}
            </div>
            <div class="font-semibold text-xl leading-[110%]">
              {{ card.title }}
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div
              v-for="sub in card.subtitles"
              class="flex items-start self-stretch gap-1"
            >
              <div class="px-1">
                <div class="h-1 mt-[6px] w-1 bg-white rounded-full" />
              </div>
              <div class="text-sm font-medium leading-[120%]">
                {{ sub.subtitle }}
              </div>
            </div>
          </div>

          <div
            :class="[
              'absolute max-xl:hidden',
              {
                'translate-y-[50%] w-[535px] h-[365px] left-[-20px]':
                  index === 0,
              },
              {
                'translate-y-[59%] w-[230px] h-[275px] left-[-25px]':
                  index === 1,
              },
              {
                'translate-y-[55%] w-[360px] h-[290px] left-[-40px]':
                  index === 2,
              },
              {
                'translate-y-[38%] w-[690px] h-[400px] left-[-364px]':
                  index === 3,
              },
            ]"
          >
            <img :src="card.image" class="object-contain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
