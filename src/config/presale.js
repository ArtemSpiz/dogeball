/**
 * Presale Configuration
 *
 * All presale-related constants and configuration in one place.
 */

// Token prices
export const LAUNCH_PRICE = 0.025;
export const PRESALE_MIN_USD = 10;

// Default values
export const DEFAULT_STAGE_NAME = "Stage 1";
export const DEFAULT_PAYMENT_AMOUNT = "1";
export const DEFAULT_STAKE_AMOUNT = "0";

// Main crypto symbols shown in the grid
export const MAIN_CRYPTO_SYMBOLS = ["ETH", "BNB", "USDT", "BTC", "SOL"];

// Token display names
export const TOKEN_DISPLAY_NAMES = {
  ETH: { ETHEREUM: "Ethereum", BASE: "ETH (Base)", default: "ETH" },
  BNB: { BSC: "BNB (BSC)", default: "BNB" },
  USDT: {
    ETHEREUM: "USDT (ETH)",
    BSC: "USDT (BSC)",
    POLYGON: "USDT (Polygon)",
    TRON: "USDT (Tron)",
    default: "USDT",
  },
  USDC: {
    ETHEREUM: "USDC (ETH)",
    BSC: "USDC (BSC)",
    BASE: "USDC (Base)",
    POLYGON: "USDC (Polygon)",
    default: "USDC",
  },
  BTC: { default: "Bitcoin" },
  SOL: { default: "Solana" },
  LTC: { default: "Litecoin" },
  XRP: { default: "Ripple" },
  DOGE: { default: "Dogecoin" },
  TRX: { default: "Tron" },
  MATIC: { POLYGON: "Polygon", default: "MATIC" },
  AVAX: { default: "Avalanche" },
  CARD: { default: "Credit/Debit Card" },
};

// Staking configuration
export const STAKING_APY = 0.15; // 15% APY
export const MIN_STAKE_AMOUNT = 100;
export const MIN_UNSTAKE_AMOUNT = 100;

// Transaction polling
export const TRANSACTION_POLL_INTERVAL = 5000; // 5 seconds
export const TRANSACTION_POLL_MAX_ATTEMPTS = 60; // 5 minutes total

// UI Configuration
export const TOAST_DURATION = {
  SUCCESS: 4000,
  ERROR: 5000,
  INFO: 3000,
};

// Bonus code from presale launch
export const PRESALE_BONUS_CODE = "DOGEBALL10";
export const PRESALE_BONUS_PERCENT = 10;

/**
 * Get display name for a token
 */
export const getTokenDisplayName = (token) => {
  if (!token?.symbol) return "";
  const symbol = token.symbol.toUpperCase();
  const chain = token.chain?.toUpperCase() || "";

  const config = TOKEN_DISPLAY_NAMES[symbol];
  if (!config) return symbol;

  return config[chain] || config.default || symbol;
};

