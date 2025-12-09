/**
 * Codes Composable
 * Handles bonus and referral codes
 */

import { ref } from "vue";
import * as presaleApi from "@/api/presale";

/**
 * Codes composable
 */
export function useCodes() {
  const bonusCodeLoading = ref(false);
  const referralCodeLoading = ref(false);

  /**
   * Apply bonus code
   */
  const applyBonusCode = async ({ address, code, getToken }) => {
    bonusCodeLoading.value = true;
    try {
      const token = await getToken(address);
      const res = await presaleApi.applyBonusCode(address, code, token.token);
      return res.data;
    } finally {
      bonusCodeLoading.value = false;
    }
  };

  /**
   * Apply referral code
   */
  const applyReferralCode = async ({ address, code, getToken }) => {
    referralCodeLoading.value = true;
    try {
      const token = await getToken(address);
      await presaleApi.updateReferralCode(token.token, address, code);
    } finally {
      referralCodeLoading.value = false;
    }
  };

  return {
    bonusCodeLoading,
    referralCodeLoading,
    applyBonusCode,
    applyReferralCode,
  };
}

