<template>
  <div class="flex flex-col gap-4 w-full min-w-0 max-w-full">
    <!-- Connect Wallet Prompt -->
    <div
      v-if="!presale.isConnected.value"
      class="flex flex-col items-center gap-4 py-8"
    >
      <p class="text-white/70 text-center font-grotesk">
        Connect your wallet to view and manage your staking
      </p>
      <Button @click="presale.connect" variant="primary" class="px-8">
        Connect Wallet
      </Button>
    </div>

    <!-- Staking Content -->
    <template v-else>
      <!-- Stake Info Cards -->
      <div class="flex flex-col gap-2 w-full">
        <InfoCard
          v-for="item in stakeInfo"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          :loading="!presale.userStakeData.value && !presale.user.value"
        />
      </div>

      <!-- Stake Amount Section -->
      <div class="flex flex-col gap-4">
        <!-- Available to Stake -->
        <div class="flex gap-2 justify-between self-stretch">
          <p
            class="text-sm leading-5 m-0 text-white/80 font-grotesk font-medium font-feature-off"
          >
            Available to Stake
          </p>
          <p
            class="text-sm leading-5 m-0 text-white/80 font-grotesk font-medium font-feature-off"
          >
            {{ formatLargeNumber(availableToStake) }} $DOGEBALL
          </p>
        </div>

        <!-- Input Field -->
        <input
          type="text"
          placeholder="0"
          :value="tokensInput.value.value"
          class="flex justify-between items-center self-stretch rounded-2xl bg-white/10 p-4 text-white text-left text-2xl leading-5 outline-none font-grotesk font-medium font-feature-off"
          @focus="tokensInput.handleFocus"
          @blur="tokensInput.handleBlur"
          @input="(e) => tokensInput.handleInput(e)"
        />

        <!-- Quick Action Buttons -->
        <div class="flex gap-2 justify-between">
          <button
            class="bg-[#007BF9] text-white leading-none text-xs py-1.5 px-2.5 rounded-md flex items-center justify-center hover:bg-[#007BF9]/80 transition-colors font-medium"
            @click="setMaxStake"
          >
            Max Stake ({{ formatLargeNumber(availableToStake) }})
          </button>
          <button
            class="bg-[#007BF9] text-white leading-none text-xs py-1.5 px-2.5 rounded-md flex items-center justify-center hover:bg-[#007BF9]/80 transition-colors font-medium"
            @click="setMaxUnstake"
          >
            Max Unstake ({{ formatLargeNumber(currentlyStaked) }})
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <Button
          @click="handleStake"
          :disabled="isLoading || !canStake"
          variant="primary"
          class="flex-1 h-11 rounded-full"
        >
          <Spinner v-if="presale.stakeLoading.value" :size="5" />
          <span v-else>Stake</span>
        </Button>
        <Button
          @click="handleUnstake"
          :disabled="isLoading || !canUnstake"
          variant="outline"
          class="flex-1 h-11 rounded-full border-white bg-white/15 hover:bg-white/25"
        >
          <Spinner v-if="presale.unstakeLoading.value" :size="5" />
          <span v-else>Unstake</span>
        </Button>
      </div>

      <!-- Staking Info -->
      <div
        class="flex items-center justify-center gap-2 text-white/50 text-xs font-grotesk"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Earn {{ STAKING_APY * 100 }}% APY by staking your tokens</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Button, Spinner, InfoCard } from "../ui";
import { usePresale } from "@/composables/usePresale";
import { useToast } from "@/composables/useToast";
import { useNumericInput } from "@/composables/useNumericInput";
import { formatLargeNumber, parseNum } from "@/utils/format";
import {
  STAKING_APY,
  MIN_STAKE_AMOUNT,
  MIN_UNSTAKE_AMOUNT,
} from "@/config/presale";

// Composables
const presale = usePresale();
const toast = useToast();
const tokensInput = useNumericInput({ initialValue: "0" });

// Computed values
const availableToStake = computed(() => {
  return parseNum(presale.userStakeData.value?.total_can_stake ?? 0);
});

const currentlyStaked = computed(() => {
  return parseNum(presale.userStakeData.value?.total_staked ?? 0);
});

const isLoading = computed(() => {
  return presale.stakeLoading.value || presale.unstakeLoading.value;
});

const inputAmount = computed(() => tokensInput.getNumericValue());

const canStake = computed(() => {
  return (
    inputAmount.value >= MIN_STAKE_AMOUNT &&
    inputAmount.value <= availableToStake.value
  );
});

const canUnstake = computed(() => {
  return (
    inputAmount.value >= MIN_UNSTAKE_AMOUNT &&
    inputAmount.value <= currentlyStaked.value
  );
});

const stakeInfo = computed(() => [
  {
    label: "Owned Tokens",
    value: `${formatLargeNumber(
      parseNum(presale.user.value?.total_tokens ?? 0)
    )} $DOGEBALL ($${formatLargeNumber(
      parseNum(presale.user.value?.total_tokens ?? 0) *
        parseNum(presale.stage.value?.token_price ?? 0)
    )})`,
  },
  {
    label: "Currently Staked",
    value: `${formatLargeNumber(currentlyStaked.value)} $DOGEBALL`,
  },
  {
    label: "Daily Interest",
    value: `${formatLargeNumber(
      parseNum(presale.userStakeData.value?.daily_interest ?? 0)
    )} $DOGEBALL`,
  },
  {
    label: "Total Earnings",
    value: `${formatLargeNumber(
      parseNum(presale.userStakeData.value?.total_earnings ?? 0)
    )} $DOGEBALL ($${formatLargeNumber(
      parseNum(presale.userStakeData.value?.total_earnings ?? 0) *
        parseNum(presale.stage.value?.token_price ?? 0)
    )})`,
  },
]);

// Methods
const setMaxStake = () => {
  tokensInput.setValue(availableToStake.value.toString());
};

const setMaxUnstake = () => {
  tokensInput.setValue(currentlyStaked.value.toString());
};

const handleStake = async () => {
  if (isLoading.value || !canStake.value) return;

  const amount = inputAmount.value;

  if (amount < MIN_STAKE_AMOUNT) {
    toast.showError(`Minimum stake amount is ${MIN_STAKE_AMOUNT} tokens`);
    return;
  }

  if (amount > availableToStake.value) {
    toast.showError("Insufficient tokens available to stake");
    return;
  }

  try {
    await presale.stake(amount);
    toast.showSuccess(
      `Successfully staked ${formatLargeNumber(amount)} $DOGEBALL!`
    );
    tokensInput.setValue("0");
  } catch (err) {
    const message = err?.message || "Failed to stake tokens";
    toast.showError(message);
    console.error("Stake error:", err);
  }
};

const handleUnstake = async () => {
  if (isLoading.value || !canUnstake.value) return;

  const amount = inputAmount.value;

  if (amount < MIN_UNSTAKE_AMOUNT) {
    toast.showError(`Minimum unstake amount is ${MIN_UNSTAKE_AMOUNT} tokens`);
    return;
  }

  if (amount > currentlyStaked.value) {
    toast.showError("Cannot unstake more than currently staked");
    return;
  }

  try {
    await presale.unstake(amount);
    toast.showSuccess(
      `Successfully unstaked ${formatLargeNumber(amount)} $DOGEBALL!`
    );
    tokensInput.setValue("0");
  } catch (err) {
    const message = err?.message || "Failed to unstake tokens";
    toast.showError(message);
    console.error("Unstake error:", err);
  }
};
</script>
