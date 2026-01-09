import { getAccount, watchAccount } from "@wagmi/core";
import { getConfig, configRef } from "./config";
import { useCallback, useEffect, useRef, useState } from "react";
import { onMounted, onUnmounted, ref } from "vue";

/** @type {import("vue").Ref<{address: string | null, addresses: string[], chainId: number | null, isConnected: boolean}>} */
const accountData = ref(null);

/**
 * @typedef {object} GetAccountReturnType
 * @property {`0x${string}` | undefined} address,
 * @property {`0x${string}`[]} addresses,
 * @property {number | undefined} chainId
 * @property {boolean} isConnected
 */
export const useAccount = () => {
  const abortController = new AbortController();

  onMounted(() => {
    const config = configRef.current?.config;
    if (config) {
      accountData.value = getAccount(config);
    }

    let unwatch = undefined;
    const func = async () => {
      const { config } = await getConfig();
      const _unwatch = watchAccount(config, {
        onChange: (account) => {
          accountData.value = account;
        },
      });
      unwatch = _unwatch;
    };
    if (config) func();
    else if (typeof window !== "undefined") {
      document.addEventListener("wagmi-loaded", func, {
        signal: abortController.signal,
      });
    }
    abortController.signal.addEventListener("abort", () => {
      if (unwatch) unwatch();
    });
  });

  onUnmounted(() => abortController.abort());

  return accountData;
};
