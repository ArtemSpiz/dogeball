/**
 * Unified Presale Composable
 *
 * Combines all presale-related composables into one convenient hook.
 * This is the main entry point for presale functionality.
 *
 * Usage:
 *   import { usePresale } from '@/composables/usePresale'
 *
 *   const presale = usePresale()
 *
 *   // Connect wallet
 *   await presale.connect()
 *
 *   // Buy tokens
 *   await presale.buyWithCrypto({
 *     paymentToken: selectedToken,
 *     paymentAmount: '100',
 *     onStateChanged: (state) => console.log(state)
 *   })
 *
 *   // Stake tokens
 *   await presale.stake('1000')
 */

import { computed, watch } from "vue";
import { useApiState } from "./useApiState";
import { useUserState } from "./useUserState";
import { useWallet, useAuth, useBuy, useStaking, useCodes } from "./blockchain";
import * as presaleApi from "@/api/presale";
import {
  calculateReceiveAmount as calcReceive,
  calculatePaymentAmount as calcPayment,
  isWalletTransferSupported,
  getChainIdFromLabel,
  isCurrencyNative,
  getContractAddress,
  getDecimals,
} from "@/utils/web3";

// Re-export for convenience
export { setWagmiAdapter, setAppkitModal } from "./blockchain";
export { BuyStateType } from "@/config/web3";

/**
 * Main presale composable
 */
export function usePresale() {
  // Sub-composables
  const apiData = useApiState();
  const userData = useUserState();
  const wallet = useWallet();
  const auth = useAuth();
  const buy = useBuy();
  const staking = useStaking();
  const codes = useCodes();

  // Computed values
  const isConnected = computed(() => wallet.isConnected.value);
  const address = computed(() => wallet.address.value);
  const presaleEnded = computed(() => apiData.presaleEnded.value);
  const stage = computed(() => apiData.stage.value);
  const paymentTokens = computed(() => apiData.paymentTokens.value);
  const user = computed(() => userData.user.value);
  const userStakeData = computed(() => userData.userStakeData.value);

  // --------------------------------------------------------------------------
  // PRICE CALCULATIONS
  // --------------------------------------------------------------------------

  const calculateReceiveAmount = (paymentAmount, paymentToken) => {
    return calcReceive(paymentAmount, paymentToken, stage.value?.token_price);
  };

  const calculatePaymentAmount = (receiveAmount, paymentToken) => {
    return calcPayment(receiveAmount, paymentToken, stage.value?.token_price);
  };

  // --------------------------------------------------------------------------
  // BUYING
  // --------------------------------------------------------------------------

  const buyWithCrypto = async ({
    paymentToken,
    paymentAmount,
    onStateChanged,
  }) => {
    if (presaleEnded.value) {
      throw new Error("Presale has ended");
    }

    const result = await buy.buyWithCrypto({
      paymentToken,
      paymentAmount,
      walletAddress: address.value,
      paymentWalletAddress: apiData.info.value?.main_payment_wallet_address,
      onStateChanged,
    });

    // Refetch user data after purchase
    await refetchUserData();

    return result;
  };

  const buyWithCard = async (options) => {
    return buy.buyWithCard({
      ...options,
      walletAddress: address.value,
    });
  };

  // --------------------------------------------------------------------------
  // STAKING
  // --------------------------------------------------------------------------

  const stake = async (amount) => {
    if (!isConnected.value) {
      throw new Error("Please connect your wallet");
    }

    await staking.stake({
      address: address.value,
      amount,
      getToken: () => auth.getUserToken(address.value),
      onSuccess: refetchUserStakeData,
    });
  };

  const unstake = async (amount) => {
    if (!isConnected.value) {
      throw new Error("Please connect your wallet");
    }

    await staking.unstake({
      address: address.value,
      amount,
      getToken: () => auth.getUserToken(address.value),
      onSuccess: refetchUserStakeData,
    });
  };

  // --------------------------------------------------------------------------
  // CODES
  // --------------------------------------------------------------------------

  const applyBonusCode = async (code) => {
    if (!isConnected.value) {
      throw new Error("Please connect your wallet");
    }

    const result = await codes.applyBonusCode({
      address: address.value,
      code,
      getToken: () => auth.getUserToken(address.value),
    });

    userData.appliedBonusCode.value = result;
    return result;
  };

  const resetBonusCode = () => {
    userData.appliedBonusCode.value = null;
  };

  const applyReferralCode = async (code) => {
    if (!isConnected.value) {
      throw new Error("Please connect your wallet");
    }

    await codes.applyReferralCode({
      address: address.value,
      code,
      getToken: () => auth.getUserToken(address.value),
    });

    await refetchUserData();
  };

  // --------------------------------------------------------------------------
  // USER DATA
  // --------------------------------------------------------------------------

  const refetchUserData = async () => {
    if (!address.value) return;
    try {
      const res = await presaleApi.getUser(address.value);
      userData.user.value = res.data;
    } catch (e) {
      console.warn("Failed to fetch user data:", e);
    }
  };

  const refetchUserStakeData = async () => {
    if (!address.value) return;
    try {
      const res = await presaleApi.getUserStakeData(address.value);
      userData.userStakeData.value = res.data;
    } catch (e) {
      console.warn("Failed to fetch stake data:", e);
    }
  };

  const updateClaimAddress = async (newClaimAddress) => {
    if (!isConnected.value) {
      throw new Error("Please connect your wallet");
    }

    const token = await auth.getUserToken(address.value);
    await presaleApi.updateClaimAddress(
      address.value,
      newClaimAddress,
      token.token
    );

    if (userData.user.value) {
      userData.user.value = {
        ...userData.user.value,
        claim_wallet_address: newClaimAddress,
      };
    }
  };

  // --------------------------------------------------------------------------
  // TRANSACTION HISTORY
  // --------------------------------------------------------------------------

  const getTransactionHistory = async (page = 0, limit = 12) => {
    if (!address.value) return [];
    try {
      const res = await presaleApi.getTransactionHistoryV2(
        address.value,
        page,
        limit
      );
      return res.data;
    } catch (e) {
      console.warn("Failed to fetch transaction history:", e);
      return [];
    }
  };

  const getBonusTransactionHistory = async (page = 0, limit = 12) => {
    if (!address.value) return [];
    try {
      const res = await presaleApi.getBonusTransactionHistory(
        address.value,
        page,
        limit
      );
      return res.data;
    } catch (e) {
      console.warn("Failed to fetch bonus history:", e);
      return [];
    }
  };

  // --------------------------------------------------------------------------
  // LIFECYCLE
  // --------------------------------------------------------------------------

  // Watch for address changes
  watch(address, async (newAddress, oldAddress) => {
    if (newAddress && newAddress !== oldAddress) {
      auth.clearToken();
      await Promise.all([refetchUserData(), refetchUserStakeData()]);
    }
  });

  // --------------------------------------------------------------------------
  // RETURN
  // --------------------------------------------------------------------------

  return {
    // State from sub-composables
    buyState: buy.buyState,
    stakeLoading: staking.stakeLoading,
    unstakeLoading: staking.unstakeLoading,
    bonusCodeLoading: codes.bonusCodeLoading,
    referralCodeLoading: codes.referralCodeLoading,

    // Computed
    isConnected,
    address,
    presaleEnded,
    stage,
    paymentTokens,
    user,
    userStakeData,

    // Raw composable data
    apiData,
    userData,
    accountData: wallet.accountData,

    // Connection (from useWallet)
    connect: wallet.connect,
    disconnect: wallet.disconnect,

    // Buying
    buyWithCrypto,
    buyWithCard,
    calculateReceiveAmount,
    calculatePaymentAmount,
    isWalletTransferSupported,

    // Staking
    stake,
    unstake,

    // Codes
    applyBonusCode,
    resetBonusCode,
    applyReferralCode,

    // User Data
    refetchUserData,
    refetchUserStakeData,
    updateClaimAddress,

    // Transaction History
    getTransactionHistory,
    getBonusTransactionHistory,

    // Chain utilities (from utils/web3)
    getChainIdFromLabel,
    isCurrencyNative,
    getContractAddress,
    getDecimals,

    // API (for direct access)
    api: presaleApi,
  };
}
