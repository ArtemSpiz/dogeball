import EthIcon from "@/components/PresaleWidget/icons/EthIcon.vue";
import BnbIcon from "@/components/PresaleWidget/icons/BnbIcon.vue";
import UsdtIcon from "@/components/PresaleWidget/icons/UsdtIcon.vue";
import BtcIcon from "@/components/PresaleWidget/icons/BtcIcon.vue";
import SolIcon from "@/components/PresaleWidget/icons/SolIcon.vue";
import DogeballIcon from "@/components/PresaleWidget/icons/DogeballIcon.vue";

/**
 * Token icon mapping
 */
export const TOKEN_ICONS = {
  eth: EthIcon,
  bnb: BnbIcon,
  usdt: UsdtIcon,
  btc: BtcIcon,
  sol: SolIcon,
  dogeball: DogeballIcon,
};

/**
 * Get the icon component for a token
 * @param {Object} token - Token object with symbol property
 * @returns {Component|null} - Icon component or null
 */
export const getTokenIcon = (token) => {
  if (!token?.symbol) return null;
  return TOKEN_ICONS[token.symbol.toLowerCase()] || null;
};

/**
 * Token display names mapping
 */
export const TOKEN_NAMES = {
  ETH: { ETHEREUM: "Ethereum", default: "ETH" },
  BNB: { BSC: "Binance Smart Chain", default: "BNB" },
  USDT: {
    ETHEREUM: "Tether (ETH)",
    BSC: "Tether (BSC)",
    POLYGON: "Tether (Polygon)",
    TRON: "Tether (Tron)",
    default: "USDT",
  },
  BTC: { default: "Bitcoin" },
  SOL: { default: "Solana" },
  LTC: { default: "Litecoin" },
  XRP: { default: "Ripple" },
  DOGE: { default: "Dogecoin" },
  TRX: { default: "Tron" },
  MATIC: { default: "Polygon" },
  AVAX: { default: "Avalanche" },
  CARD: { default: "Card" },
};

/**
 * Get display name for a token
 * @param {Object} token - Token object with symbol and chain properties
 * @returns {string} - Display name
 */
export const getTokenDisplayName = (token) => {
  if (!token?.symbol) return "";
  const symbol = token.symbol.toUpperCase();
  const chain = token.chain?.toUpperCase() || "";

  const tokenConfig = TOKEN_NAMES[symbol];
  if (!tokenConfig) return symbol;

  return tokenConfig[chain] || tokenConfig.default || symbol;
};
