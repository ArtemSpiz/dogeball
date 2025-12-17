/**
 * Staking Composable
 * Handles token staking and unstaking
 */

import { ref } from "vue";
import * as presaleApi from "@/api/presale";
import { parseNum } from "@/utils/web3";
import { getUserToken } from "@/presale-gg/stores/user.store";

/**
 * Staking composable
 */
export function useStaking() {
  const stakeLoading = ref(false);
  const unstakeLoading = ref(false);

  /**
   * Stake tokens
   */
  const stake = async ({ address, amount, onSuccess }) => {
    const numTokens = parseNum(amount);
    if (numTokens <= 0) {
      throw new Error("Must stake more than 0 tokens");
    }

    stakeLoading.value = true;
    try {
      const token = await getUserToken(address);
      await presaleApi.stakeTokens(address, numTokens.toString(), token.token);
      onSuccess?.();
    } finally {
      stakeLoading.value = false;
    }
  };

  /**
   * Unstake tokens
   */
  const unstake = async ({ address, amount, onSuccess }) => {
    const numTokens = parseNum(amount);
    if (numTokens <= 0) {
      throw new Error("Must unstake more than 0 tokens");
    }

    unstakeLoading.value = true;
    try {
      const token = await getUserToken(address);
      await presaleApi.unstakeTokens(address, numTokens.toString(), token.token);
      onSuccess?.();
    } finally {
      unstakeLoading.value = false;
    }
  };

  return {
    stakeLoading,
    unstakeLoading,
    stake,
    unstake,
  };
}

