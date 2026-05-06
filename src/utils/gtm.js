const GTM_WALLET_CONNECT_KEY = "dogeball_gtm_wallet_connect_v2";
const GTM_PURCHASE_KEY = "dogeball_gtm_purchase_v2";

/** @type {Record<number, string>} */
const CHAIN_NETWORK_LABEL = {
  1: "Ethereum",
  56: "BSC",
  137: "Polygon",
  8453: "Base",
};

function ensureDataLayer() {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/**
 * Fires once per browser (localStorage) after first wallet connection.
 * @param {{ wallet_address?: string | null, chainId?: number | null }} [payload]
 */
export function pushWalletConnectOnce(payload = {}) {
  if (typeof localStorage === "undefined") return;
  if (localStorage.getItem(GTM_WALLET_CONNECT_KEY)) return;
  const dl = ensureDataLayer();
  if (!dl) return;
  localStorage.setItem(GTM_WALLET_CONNECT_KEY, "1");
  const eventPayload = { event: "wallet_connect" };
  if (payload.wallet_address) {
    eventPayload.wallet_address = payload.wallet_address;
  }
  const network =
    payload.chainId != null ? CHAIN_NETWORK_LABEL[payload.chainId] : undefined;
  if (network) eventPayload.network = network;
  dl.push(eventPayload);
}

/**
 * @param {{ transactionId: string, valueUsd: number }} args
 */
export function pushPurchaseOnce({ transactionId, valueUsd }) {
  if (!transactionId) return;
  if (typeof localStorage === "undefined") return;
  if (localStorage.getItem(GTM_PURCHASE_KEY)) return;
  const dl = ensureDataLayer();
  if (!dl) return;
  localStorage.setItem(GTM_PURCHASE_KEY, "1");
  dl.push({
    event: "purchase",
    value: Number(valueUsd),
    currency: "USD",
  });
}

/**
 * @param {import("@/api/api.types").API.PurchaseTransactionHistoryItemV2 | null | undefined} trx
 */
export function pushPurchaseFromTransactionOnce(trx) {
  if (!trx || trx.record_type !== "transaction") return;
  const transactionId =
    trx.transaction_hash || (trx.id != null ? String(trx.id) : null);
  if (!transactionId) return;
  const valueUsd = parseFloat(trx.payment_usd_amount);
  if (Number.isNaN(valueUsd)) return;
  pushPurchaseOnce({ transactionId, valueUsd });
}
