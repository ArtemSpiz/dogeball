import type { PublicClient } from "viem";

import coinbaseImg from "../assets/img/coinbase.svg";
import metamaskImg from "../assets/img/metamask.svg";
import phantomWalletImg from "../assets/img/phantom.svg";
import walletConnectImg from "../assets/img/wallet-connect.svg";
import { getIsMobile } from "../util";
import { loadStoredConnection } from "../../config";

export type SupportConnection =
  | "metamask"
  | "walletconnect"
  | "coinbase"
  | "phantom-wallet";
export type SupportedChainId = 1 | 56 | 8453 | 137;
export type Connection = {
  label: string;
  key: SupportConnection;
  icon: any;
  connectorIndex: number;
  hide?: () => boolean;
  onClick?: () => void;
};

let configPromise: Promise<typeof import("./connections")> | undefined =
  undefined;

export const configRef: {
  current: typeof import("./connections") | undefined;
} = { current: undefined };

export const getConfig = async (): Promise<typeof import("./connections")> => {
  if (configRef.current) return configRef.current;
  if (!configPromise) configPromise = import("./connections");
  const res = await configPromise;
  configRef.current = res;
  document.dispatchEvent(new Event("wagmi-loaded"));
  getPublicClient(1);
  return res;
};

let publicClientPromise: Promise<typeof import("./public-client")> | undefined =
  undefined;

export const getPublicClientRef: {
  current: ((chainId: SupportedChainId) => PublicClient) | undefined;
} = {
  current: undefined,
};

/** @returns {Promise<import("viem").PublicClient>} */
export const getPublicClient = async (chainId: SupportedChainId) => {
  if (getPublicClientRef.current) {
    return (await getPublicClientRef.current)(chainId);
  }
  if (!publicClientPromise) publicClientPromise = import("./public-client");
  const res = await publicClientPromise;
  getPublicClientRef.current = res.getPublicClient;
  return res.getPublicClient(chainId);
};

export const connections: Connection[] = [
  {
    label: "Metamask",
    key: "metamask",
    icon: metamaskImg,
    connectorIndex: 0,
    hide: () => {
      const eth = (window as any).ethereum;
      return !eth || !eth.isMetaMask;
    },
  },
  {
    label: "Wallet Connect",
    key: "walletconnect",
    icon: walletConnectImg,
    connectorIndex: 4,
  },
  {
    label: "Coinbase",
    key: "coinbase",
    icon: coinbaseImg,
    connectorIndex: 1,
  },
  {
    label: "Phantom Wallet",
    key: "phantom-wallet",
    icon: phantomWalletImg,
    connectorIndex: 2,
    hide: () =>
      typeof window === "undefined" ||
      (!("phantom" in window) && !getIsMobile()),
    onClick:
      typeof window !== "undefined" && !("phantom" in window)
        ? () => {
            const url = new URL(window.location.href);
            let newUrl = `${url.origin}${url.pathname}`;
            newUrl += "?" + url.searchParams.toString();
            if (url.search) newUrl += "&";
            newUrl += `connect_wallet=${encodeURIComponent("phantom-wallet")}`;
            window.open(
              `https://phantom.app/ul/browse/${encodeURIComponent(
                newUrl
              )}?ref=${encodeURIComponent(window.location.href)}`,
              "_blank"
            );
          }
        : undefined,
  },
];

if (
  typeof localStorage !== "undefined" &&
  localStorage.getItem("connect-wallet-id-v2") &&
  loadStoredConnection
) {
  loadStoredConnection();
}
