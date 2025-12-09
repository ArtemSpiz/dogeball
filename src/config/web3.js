/**
 * Web3 Configuration
 * Chain IDs, contract addresses, token decimals, and RPC URLs
 */

// Wallet tokens that support direct wallet transfer
export const WALLET_BUY_TOKENS = new Set([
  "ETH-ERC-20",
  "USDT-ERC-20",
  "USDC-ERC-20",
  "BNB-BEP-20",
  "BUSD-BEP-20",
  "USDT-BEP-20",
  "ETH-BASE",
  "USDC-BASE",
  "USDC-BEP-20",
  "SHIB-ERC-20",
  "FLOKI-ERC-20",
  "PEPE-ERC-20",
  "MATIC-POLYGON",
  "USDC-POLYGON",
  "USDT-POLYGON",
]);

// Chain ID mappings
export const CHAIN_IDS = {
  "ERC-20": 1,
  "BEP-20": 56,
  BASE: 8453,
  POLYGON: 137,
  ETHEREUM: 1,
  BSC: 56,
};

// Native currency per chain
export const NATIVE_CURRENCIES = {
  1: "ETH",
  56: "BNB",
  8453: "ETH",
  137: "MATIC",
};

// Contract addresses for tokens
export const CONTRACT_ADDRESSES = {
  1: {
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    SHIB: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    PEPE: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
    FLOKI: "0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E",
  },
  56: {
    BUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    USDT: "0x55d398326f99059ff775485246999027b3197955",
    USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
  },
  8453: {
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  137: {
    USDC: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  },
};

// Decimals per token per chain
export const TOKEN_DECIMALS = {
  1: { USDT: 6, USDC: 6, BUSD: 18, SHIB: 18, PEPE: 18, FLOKI: 18, ETH: 18 },
  56: { USDT: 18, BUSD: 18, USDC: 18, BNB: 18 },
  8453: { USDC: 6, ETH: 18 },
  137: { USDC: 6, USDT: 6, MATIC: 18 },
};

// RPC URLs for each chain
export const RPC_URLS = {
  1: "https://eth.llamarpc.com",
  56: "https://bsc-dataseed1.binance.org/",
  8453: "https://mainnet.base.org/",
  137: "https://polygon-rpc.com",
};

// Buy state types
export const BuyStateType = {
  IDLE: "idle",
  SENDING: "sending",
  CONFIRMING: "confirming",
  FINALIZING: "finalizing",
  FINISHED: "finished",
  ERRORED: "errored",
};

// Transaction polling config
export const TRANSACTION_POLL_INTERVAL = 5000;
export const TRANSACTION_POLL_MAX_ATTEMPTS = 60;

