import EthIcon from "../icons/EthIcon.vue";
import BnbIcon from "../icons/BnbIcon.vue";
import UsdtIcon from "../icons/UsdtIcon.vue";
import BtcIcon from "../icons/BtcIcon.vue";
import SolIcon from "../icons/SolIcon.vue";
import DogeballIcon from "../icons/DogeballIcon.vue";
import XrpIcon from "../icons/XrpIcon.vue";
import DogeIcon from "../icons/DogeIcon.vue";
import TonIcon from "../icons/TonIcon.vue";
import TrxIcon from "../icons/TrxIcon.vue";
import AdaIcon from "../icons/AdaIcon.vue";
import UsdcIcon from "../icons/UsdcIcon.vue";
import PepeIcon from "../icons/PepeIcon.vue";
import ShibIcon from "../icons/ShibIcon.vue";
import BusdIcon from "../icons/BusdIcon.vue";

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
  xrp: XrpIcon,
  doge: DogeIcon,
  ton: TonIcon,
  trx: TrxIcon,
  ada: AdaIcon,
  usdc: UsdcIcon,
  pepe: PepeIcon,
  shib: ShibIcon,
  busd: BusdIcon,
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
  USDC: { ETHEREUM: "USD Coin", BSC: "USD Coin", default: "USDC" },
  PEPE: { default: "Pepe" },
  SHIB: { default: "Shiba Inu" },
  BUSD: { default: "Binance USD" },
  BTC: { default: "Bitcoin" },
  SOL: { default: "Solana" },
  XRP: { default: "Ripple" },
  DOGE: { default: "Dogecoin" },
  TRX: { default: "Tron" },
  TON: { default: "TON Chain" },
  ADA: { default: "Cardano" },
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
