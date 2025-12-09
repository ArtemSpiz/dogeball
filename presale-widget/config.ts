// Configuration for PresaleWidget
// This should be set up by the consuming project

import type { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

export let wagmiAdapter: WagmiAdapter | null = null;
export let loadStoredConnection: (() => void) | null = null;

export const setWagmiAdapter = (adapter: WagmiAdapter) => {
  wagmiAdapter = adapter;
};

export const setLoadStoredConnection = (fn: () => void) => {
  loadStoredConnection = fn;
};

