const GTM_WALLET_CONNECT_KEY = "dogeball_gtm_wallet_connect_v1";
const GTM_PURCHASE_KEY = "dogeball_gtm_purchase_v1";

function ensureDataLayer() {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/** Fires once per browser (localStorage) after first wallet connection. */
export function pushWalletConnectOnce() {
  if (typeof localStorage === "undefined") return;
  if (localStorage.getItem(GTM_WALLET_CONNECT_KEY)) return;
  const dl = ensureDataLayer();
  if (!dl) return;
  localStorage.setItem(GTM_WALLET_CONNECT_KEY, "1");
  dl.push({ event: "wallet_connect" });
}

/**
 * @param {{ transactionId: string, valueUsd: number }} args
 */
export function pushPurchaseOnce({ transactionId, valueUsd }) {
  if (typeof localStorage === "undefined") return;
  if (localStorage.getItem(GTM_PURCHASE_KEY)) return;
  const dl = ensureDataLayer();
  if (!dl) return;
  localStorage.setItem(GTM_PURCHASE_KEY, "1");
  dl.push({ ecommerce: null });
  dl.push({
    event: "purchase",
    ecommerce: {
      transaction_id: String(transactionId),
      currency: "USD",
      value: Number(valueUsd),
    },
  });
}

/**
 * @param {import("@/api/api.types").API.PurchaseTransactionHistoryItemV2 | null | undefined} trx
 */
export function pushPurchaseFromTransactionOnce(trx) {
  if (!trx || trx.record_type !== "transaction") return;
  const transactionId =
    trx.transaction_hash ||
    (trx.id != null ? String(trx.id) : null);
  if (!transactionId) return;
  const valueUsd = parseFloat(trx.payment_usd_amount);
  if (Number.isNaN(valueUsd)) return;
  pushPurchaseOnce({ transactionId, valueUsd });
}
