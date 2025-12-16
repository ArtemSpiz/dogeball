<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import Star from "@/assets/icons/Star.vue";
import BgSteps from "@/assets/icons/BgSteps.vue";

const { t } = useI18n();

const StepsContent = computed(() => [
  {
    title: t("roadmapSteps.step1"),
  },
  {
    title: t("roadmapSteps.step2"),
  },
  {
    title: t("roadmapSteps.step3"),
  },
]);
</script>

<template>
  <div
    class="flex flex-col gap-8 h-[590px] justify-center items-center px-5 max-md:h-max max-md:py-12 bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/StepsBg.png')]"
  >
    <div
      class="max-w-[710px] text-center text-[32px] max-md:text-xl !leading-[110%] font-medium"
    >
      {{ t("roadmapSteps.mainDescription") }}
    </div>

    <div class="flex flex-col items-end gap-2">
      <div
        class="flex items-center self-stretch gap-2 justify-end max-lg:flex-wrap max-lg:items-center max-md:justify-center"
      >
        <div
          v-for="(step, i) in StepsContent"
          :key="i"
          class="relative p-2 font-medium text-sm flex items-center gap-1 rounded-2xl bg-[rgba(255,255,255,0.06)] backdrop-blur-sm overflow-hidden"
        >
          <div
            class="absolute inset-0 rounded-2xl"
            style="
              background: linear-gradient(
                145deg,
                rgba(255, 255, 255, 0.6) 0%,
                rgba(255, 255, 255, 0.1) 40%,
                rgba(255, 255, 255, 0.6) 100%
              );
              -webkit-mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              padding: 1px;
            "
          ></div>
          <Star />
          {{ step.title }}
        </div>
      </div>

      <div class="absolute max-md:hidden">
        <BgSteps class="w-full pl-5" />
      </div>

      <div
        class="p-6 relative flex flex-col text-center max-w-[800px] items-center gap-2 rounded-2xl max-md:bg-[rgba(255,255,255,0.06)] max-md:backdrop-blur-sm"
      >
        <div
          class="absolute inset-0 md:hidden rounded-2xl"
          style="
            background: linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.6) 0%,
              rgba(255, 255, 255, 0.1) 40%,
              rgba(255, 255, 255, 0.6) 100%
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            padding: 1px;
          "
        ></div>
        <div class="font-medium text-sm">
          {{ t("roadmapSteps.description1") }}
        </div>
        <div class="font-medium text-sm">
          {{ t("roadmapSteps.description2") }}
        </div>
      </div>
    </div>
  </div>
</template>
