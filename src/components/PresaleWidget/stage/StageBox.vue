<template>
  <div class="flex flex-col gap-3">
    <!-- Stage Name -->
    <p
      class="text-center text-white font-grotesk text-lg font-semibold leading-none"
    >
      {{ stageName }}
    </p>

    <!-- Current Price Card -->
    <div
      class="flex flex-col items-center self-stretch p-4 gap-2 rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)]"
    >
      <!-- Amount Raised -->
      <template v-if="isLoading">
        <Skeleton class="h-7 w-24" />
      </template>
      <p
        v-else
        class="flex items-baseline justify-center gap-1 text-white"
      >
        <span
          class="text-4xl font-extrabold"
          style="
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          "
        >
          {{ formattedRaised }}
        </span>
        <span
          class="text-white font-grotesk text-xs font-normal leading-none"
        >
          {{ t("presale.stageBox.raised") }}
        </span>
      </p>

      <Countdown
        v-if="stageEndDate"
        :end-date="stageEndDate"
        @on-end="refetchStage"
      />
      <span
        class="text-white font-grotesk text-xs font-normal leading-none my-1"
      >
        {{ t("presale.stageBox.untilPriceRise") }}
      </span>
      <!-- Progress Bar -->
      <ProgressBar :progress="stageFrac * 100" variant="striped" size="md" />
      <!-- Participants -->
      <p
        class="text-white text-center w-full font-grotesk text-md font-normal leading-none flex-1"
      >
        {{ formattedParticipants }} {{ t("presale.stageBox.participants") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { ProgressBar, Skeleton } from "../ui";
import { usePresale } from "@/composables/usePresale";
import { formatDollar, formatNumber, parseNum } from "@/utils/format";
import { DEFAULT_STAGE_NAME } from "@/config/presale";
import Countdown from "../ui/Countdown.vue";
import { refetchStage } from "@/presale-gg/stores/api.store";

const { t } = useI18n();
const presale = usePresale();

const isLoading = computed(() => presale.apiData.stageLoading.value);

const stageName = computed(() => {
  return presale.stage.value?.stage_name || DEFAULT_STAGE_NAME;
});

const stageEndDate = computed(() =>
  presale.stage.value?.stage_end
    ? new Date(presale.stage.value.stage_end)
    : undefined,
);

const minMax = (num, min, max) => {
  if (num < min) return min;
  if (num > max) return max;
  return num;
};

const stageFrac = computed(() => {
  if (presale.presaleEnded.value) return 1;
  const stage = presale.stage.value;
  if (!stage) return 0;
  const tokenProgress = minMax(
    parseNum(stage.cumulative_tokens_sold) /
      parseNum(stage.next_stage_target_tokens),
    0,
    1,
  );
  if (!stage.stage_end) return tokenProgress;
  const stageStartTimestamp = new Date(
    stage.stage_start ?? Date.now(),
  ).getTime();
  const stageEndTimestamp = new Date(stage.stage_end ?? Date.now()).getTime();
  const countdownProgress = minMax(
    (Date.now() - stageStartTimestamp) /
      (stageEndTimestamp - stageStartTimestamp),
    0,
    1,
  );
  return Math.max(countdownProgress, tokenProgress);
});

const progressPercent = computed(() => {
  return Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    (1 - stageFrac.value) * 100,
  );
});

const formattedRaised = computed(() => {
  return formatDollar(
    parseNum(presale.stage.value?.cumulative_usd_raised),
    false,
    0,
    2,
  );
});

const formattedTarget = computed(() => {
  return formatDollar(
    parseNum(presale.stage.value?.next_stage_target_usd),
    false,
    0,
    2,
  );
});

const formattedParticipants = computed(() => {
  return formatNumber(parseNum(presale.apiData.info.value?.holders ?? 0));
});
</script>
