import { computed, onUpdated } from "vue";
import { useAccount } from "../useAccount";
import { getConfig } from "@/presale-gg/web3";
import { modalStore } from "@/presale-gg/stores";

export const getWagmiConfig = async () => {
  const config = await getConfig()
  return config.config
}

/**
 * Wallet composable
 */
export function useWallet() {
  const accountData = useAccount();

  const isConnected = computed(() => accountData.isConnected.value);
  const address = computed(() => accountData.address.value);

  /**
   * Disconnect wallet
   */
  const disconnect = async () => {
    return accountData.disconnect();
  };

  const showConnectWalletModal = () => {
    modalStore.showConnectWalletModal()
  }

  return {
    // State
    isConnected,
    address,

    // Actions,
    showConnectWalletModal,
    disconnect,

    // Raw account data
    accountData,
  };
}

