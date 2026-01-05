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
import { useWallet, useBuy, useCodes } from "./blockchain";
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
import { refetchUserData, refetchUserStakeData, resetUserBonusCode } from "@/presale-gg/stores/user.store";
import { useStaking } from "./blockchain/useStaking";

// Re-export for convenience
export { BuyStateType } from "@/config/web3";

/**
 * Main presale composable
 */
export function usePresale() {
  // Sub-composables
  const apiData = useApiState();
  const userData = useUserState();
  const wallet = useWallet();
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

    const result = await codes.applyBonusCode(code);
    return result;
  };

  const resetBonusCode = () => {
    resetUserBonusCode()
  };

  const applyReferralCode = async (code) => {
    if (!isConnected.value) {
      throw new Error("Please connect your wallet");
    }

    await codes.applyReferralCode(code);

    await refetchUserData();
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
  // RETURN
  // --------------------------------------------------------------------------

  return {
    // State from sub-composables
    buyState: buy.buyState,
    currentPurchase: buy.currentPurchase,
    buyLoading: buy.buyLoading,
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
    showConnectWalletModal: wallet.showConnectWalletModal,
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
