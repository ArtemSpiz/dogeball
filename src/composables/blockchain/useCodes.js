/**
 * Codes Composable
 * Handles bonus and referral codes
 */

import { ref } from "vue";
import { userApplyBonusCode, userUpdateReferralCode } from "@/presale-gg/stores/user.store";

/**
 * Codes composable
 */
export function useCodes() {
  const bonusCodeLoading = ref(false);
  const referralCodeLoading = ref(false);

  /**
   * Apply bonus code
   */
  const applyBonusCode = async (code) => {
    bonusCodeLoading.value = true;
    try {
      const res = await userApplyBonusCode(code)
      bonusCodeLoading.value = false;
      return res
    } finally {
      bonusCodeLoading.value = false;
    }
  };

  /**
   * Apply referral code
   */
  const applyReferralCode = async (code) => {
    referralCodeLoading.value = true;
    try {
      await userUpdateReferralCode(code)
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

