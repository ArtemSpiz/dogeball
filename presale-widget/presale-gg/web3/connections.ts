import { coinbaseWallet, metaMask } from "@wagmi/connectors";
import { injected } from "@wagmi/core";

const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!WALLET_CONNECT_PROJECT_ID) {
  throw new Error("Project ID is not defined");
}

export const metaMaskConnector = metaMask();

export const coinbaseConnector = coinbaseWallet({
  appName: "Dogeball",
  appLogoUrl: `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/logo.png`,
});

export const phantomConnector = injected({
  target: "phantom",
  shimDisconnect: true,
});

export const connectors = [
  metaMaskConnector,
  coinbaseConnector,
  phantomConnector,
];
