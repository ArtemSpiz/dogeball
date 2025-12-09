/**
 * Authentication Composable
 * Handles SIWE (Sign-In with Ethereum) authentication
 */

import { ref } from "vue";
import { getWagmiConfig } from "./useWallet";
import * as presaleApi from "@/api/presale";

// Cached user token
const userToken = ref(null);

/**
 * Authentication composable
 */
export function useAuth() {
  /**
   * Get user authentication token via SIWE
   * Caches the token and reuses if not expired
   */
  const getUserToken = async (address) => {
    // Check if we have a valid cached token
    if (
      userToken.value &&
      new Date(userToken.value.expires).getTime() >= Date.now()
    ) {
      return userToken.value;
    }

    if (!address) {
      throw new Error("Please connect your wallet");
    }

    const config = getWagmiConfig();
    const { signMessage } = await import("@wagmi/core");

    // Get SIWE message from API
    const messageRes = await presaleApi.getSiweMessage(address);

    // Sign the message
    const signedMessage = await signMessage(config, {
      message: messageRes.data.message,
    });

    // Verify the signature
    const validRes = await presaleApi.verifySiweMessage(
      address,
      messageRes.data.message,
      signedMessage
    );

    userToken.value = validRes.data.access;
    return userToken.value;
  };

  /**
   * Clear cached token (call on wallet disconnect)
   */
  const clearToken = () => {
    userToken.value = null;
  };

  /**
   * Check if user has valid token
   */
  const hasValidToken = () => {
    return (
      userToken.value &&
      new Date(userToken.value.expires).getTime() >= Date.now()
    );
  };

  return {
    userToken,
    getUserToken,
    clearToken,
    hasValidToken,
  };
}

