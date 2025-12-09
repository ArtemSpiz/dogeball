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
        class="text-center text-white font-crisis text-2xl leading-none"
        style="
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        "
      >
        {{ formattedRaised }}
      </p>

      <!-- Labels -->
      <div class="flex items-center justify-between w-full">
        <span class="text-white font-grotesk text-xs font-normal leading-none">
          {{ progressPercent }}% UNTIL PRICE RISE
        </span>
        <span class="text-white font-grotesk text-xs font-normal leading-none">
          of {{ formattedTarget }}
        </span>
      </div>

      <!-- Progress Bar -->
      <ProgressBar :progress="stageFrac * 100" variant="striped" size="md" />

      <!-- Participants -->
      <p
        class="text-white text-center w-full font-grotesk text-xs font-normal leading-none"
      >
        {{ formattedParticipants }} Participants
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ProgressBar, Skeleton } from "../ui";
import { usePresale } from "@/composables/usePresale";
import { formatDollar, formatNumber, parseNum } from "@/utils/format";
import { DEFAULT_STAGE_NAME } from "@/config/presale";

const presale = usePresale();

const isLoading = computed(() => presale.apiData.stageLoading.value);

const stageName = computed(() => {
  return presale.stage.value?.stage_name || DEFAULT_STAGE_NAME;
});

const stageFrac = computed(() => {
  const raised = parseNum(presale.stage.value?.cumulative_usd_raised);
  const target = parseNum(presale.stage.value?.next_stage_target_usd) || 1;
  return Math.min(raised / target, 1);
});

const progressPercent = computed(() => {
  return Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    stageFrac.value * 100
  );
});

const formattedRaised = computed(() => {
  return formatDollar(
    parseNum(presale.stage.value?.cumulative_usd_raised),
    true,
    0,
    0
  );
});

const formattedTarget = computed(() => {
  return formatDollar(
    parseNum(presale.stage.value?.next_stage_target_usd),
    true,
    0,
    0
  );
});

const formattedParticipants = computed(() => {
  return formatNumber(parseNum(presale.apiData.info.value?.holders ?? 0));
});
</script>
