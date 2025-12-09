/**
 * Web3 Utility Functions
 * Helper functions for blockchain interactions
 */

import {
  CHAIN_IDS,
  NATIVE_CURRENCIES,
  CONTRACT_ADDRESSES,
  TOKEN_DECIMALS,
  WALLET_BUY_TOKENS,
} from "@/config/web3";

/**
 * Parse a value to number
 */
export const parseNum = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseFloat(value) || 0;
  return 0;
};

/**
 * Convert number to BigInt with decimals
 */
export const numToBigInt = (num, decimals) => {
  const multiplier = BigInt(10) ** BigInt(decimals);
  const wholePart = Math.floor(num);
  const fractionalPart = num - wholePart;
  const fractionalBigInt = BigInt(
    Math.floor(fractionalPart * Number(multiplier))
  );
  return BigInt(wholePart) * multiplier + fractionalBigInt;
};

/**
 * Get chain ID from label (e.g., "ERC-20" -> 1)
 */
export const getChainIdFromLabel = (label) => {
  return CHAIN_IDS[label?.toUpperCase()] ?? null;
};

/**
 * Check if currency is native to the chain
 */
export const isCurrencyNative = (symbol, chainId) => {
  return NATIVE_CURRENCIES[chainId] === symbol?.toUpperCase();
};

/**
 * Get contract address for a token on a chain
 */
export const getContractAddress = (chainId, symbol) => {
  return CONTRACT_ADDRESSES[chainId]?.[symbol?.toUpperCase()] ?? null;
};

/**
 * Get decimals for a token on a chain
 */
export const getDecimals = (chainId, symbol) => {
  return TOKEN_DECIMALS[chainId]?.[symbol?.toUpperCase()] ?? 18;
};

/**
 * Check if token supports direct wallet transfer
 */
export const isWalletTransferSupported = (paymentToken) => {
  if (!paymentToken?.symbol || !paymentToken?.chain) return false;
  const key = `${paymentToken.symbol.toUpperCase()}-${paymentToken.chain.toUpperCase()}`;
  return WALLET_BUY_TOKENS.has(key);
};

/**
 * Calculate receive amount based on payment
 */
export const calculateReceiveAmount = (paymentAmount, paymentToken, stagePrice) => {
  if (!paymentToken || !stagePrice) return 0;
  const payNum = parseNum(paymentAmount);
  const tokenPrice = parseNum(paymentToken.price);
  const price = parseNum(stagePrice);
  if (price === 0) return 0;
  return (payNum * tokenPrice) / price;
};

/**
 * Calculate payment amount based on receive
 */
export const calculatePaymentAmount = (receiveAmount, paymentToken, stagePrice) => {
  if (!paymentToken || !stagePrice) return 0;
  const receiveNum = parseNum(receiveAmount);
  const tokenPrice = parseNum(paymentToken.price);
  const price = parseNum(stagePrice);
  if (tokenPrice === 0) return 0;
  return (receiveNum * price) / tokenPrice;
};

/**
 * Shorten address for display
 */
export const shortenAddress = (address, chars = 4) => {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

/**
 * Validate Ethereum address
 */
export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

