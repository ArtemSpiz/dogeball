/**
 * Wallet Connection Composable
 * Handles wallet connection via wagmi/appkit
 */

import { computed } from "vue";
import { useAccount } from "../useAccount";

// Global adapter references
let wagmiAdapter = null;
let appkitModal = null;

/**
 * Set the wagmi adapter for blockchain interactions
 * Should be called once at app initialization
 */
export const setWagmiAdapter = (adapter) => {
  wagmiAdapter = adapter;
};

/**
 * Set the AppKit modal for wallet connection
 * Should be called once at app initialization
 */
export const setAppkitModal = (modal) => {
  appkitModal = modal;
};

/**
 * Get wagmi config, throws if not set
 */
export const getWagmiConfig = () => {
  if (!wagmiAdapter) {
    throw new Error(
      "wagmiAdapter not configured. Call setWagmiAdapter(adapter) first."
    );
  }
  return wagmiAdapter.wagmiConfig;
};

/**
 * Check if wagmi is configured
 */
export const isWagmiConfigured = () => {
  return wagmiAdapter !== null;
};

/**
 * Wallet composable
 */
export function useWallet() {
  const accountData = useAccount();

  const isConnected = computed(() => accountData.isConnected.value);
  const address = computed(() => accountData.address.value);

  /**
   * Connect wallet using AppKit modal
   */
  const connect = async () => {
    if (appkitModal) {
      await appkitModal.open();
    } else {
      return accountData.connect();
    }
  };

  /**
   * Disconnect wallet
   */
  const disconnect = async () => {
    if (appkitModal) {
      await appkitModal.disconnect();
    }
    return accountData.disconnect();
  };

  /**
   * Open account modal (for connected wallet)
   */
  const openAccountModal = async () => {
    if (appkitModal && isConnected.value) {
      await appkitModal.open({ view: "Account" });
    }
  };

  return {
    // State
    isConnected,
    address,

    // Actions
    connect,
    disconnect,
    openAccountModal,

    // Raw account data
    accountData,
  };
}

