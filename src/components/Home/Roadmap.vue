<script setup>
import RoadmapImage1 from "@/assets/img/Home/RoadmapImg1.png";
import RoadmapImage2 from "@/assets/img/Home/RoadmapImg2.png";
import RoadmapImage3 from "@/assets/img/Home/RoadmapImg3.png";
import RoadmapImage4 from "@/assets/img/Home/RoadmapImg4.png";
import bg from "@/assets/img/Home/RoadmapBg.png";

const RoadmapCards = [
  {
    phase: "Phase 1",
    title: "Evolution",
    subtitles: [
      { subtitle: "The evolution of the DOGE to $DOGEBALL" },
      { subtitle: "$DOGEBALL game-plan created" },
      { subtitle: "Social channels and website developed" },
      { subtitle: "Contract created and audited" },
    ],
    image: RoadmapImage1,
  },
  {
    phase: "Phase 2",
    title: "Development",
    subtitles: [
      { subtitle: "$DOGEBALL game developed" },
      { subtitle: "DOGECHAIN EVM L2 deployed" },
      { subtitle: "Community Expansion" },
      { subtitle: "Presale begins" },
    ],
    image: RoadmapImage2,
  },
  {
    phase: "Phase 3",
    title: "Expansion",
    subtitles: [
      { subtitle: "Global marketing campaign" },
      { subtitle: "Corporate gaming partnerships" },
      { subtitle: "$DOGEBALL listed on global exchanges" },
      { subtitle: "$DOGEBALL becomes viral" },
    ],
    image: RoadmapImage3,
  },
  {
    phase: "Phase 4",
    title: "Game and V2 expansion",
    subtitles: [
      { subtitle: "$DOGEBALL V2 game development" },
      { subtitle: "Continued CEX listings" },
      { subtitle: "L2 Blockchain global release" },
      { subtitle: "Future evolution tokens created" },
    ],
    image: RoadmapImage4,
  },
];
</script>

<template>
  <div
    id="roadmap"
    class="relative h-[800px] max-xl:!bg-cover bgFill bg-center bg-no-repeat bg-[url('@/assets/img/Home/RoadmapBg.png')] max-xl:h-auto"
  >
    <div
      class="max-w-[2000px] mx-auto justify-start pt-[85px] max-xl:py-[85px] max-md:py-12 flex flex-col items-center gap-8 px-20 max-md:px-5"
    >
      <div class="title uppercase">Roadmap</div>
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
