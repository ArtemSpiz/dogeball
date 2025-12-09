import {
  Config,
  getChainId,
  sendTransaction,
  switchChain,
  writeContract,
} from "@wagmi/core";
import { Decimal } from "decimal.js";
import { Abi } from "viem";
import { parseNum } from "../util";

import bep20Abi from "../abi/bep20.json";
import erc20Abi from "../abi/erc20.json";

type SupportedChainId = 1 | 56 | 8453 | 137;

export const rpcMap = {
  1: "https://eth.llamarpc.com",
  56: "https://bsc-dataseed1.binance.org/",
  8453: "https://mainnet.base.org/",
  137: "https://polygon-rpc.com",
};

export const bigIntToNum = (num: bigint, decimals: number): number => {
  return new Decimal(num.toString())
    .div(new Decimal(10).pow(decimals))
    .toNumber();
};

export const bigIntToStr = (num: bigint, decimals: number): string => {
  return new Decimal(num.toString())
    .div(new Decimal(10).pow(decimals).toFixed())
    .toFixed(decimals, Decimal.ROUND_DOWN);
};

export type GetWalletBalanceArgs =
  | { native: true }
  | { native?: false; contractAddress: string; decimals: number };

export const getChainIdFromLabel = (label: string): SupportedChainId | null => {
  return (
    (
      {
        "ERC-20": 1,
        "BEP-20": 56,
        BASE: 8453,
        POLYGON: 137,
      } as Record<string, SupportedChainId>
    )[label.toUpperCase() as "ERC-20"] ?? null
  );
};

export const isCurrencyNative = (symbol: string, chainId: number): boolean => {
  return (
    {
      1: "ETH",
      56: "BNB",
      8453: "ETH",
      137: "MATIC",
    }[chainId] === symbol.toUpperCase()
  );
};

export const getAbi = (chainId: number): Abi => {
  return (
    {
      1: erc20Abi as Abi,
      56: bep20Abi as Abi,
      8453: erc20Abi as Abi,
      137: erc20Abi as Abi,
    }[chainId.toString() as `${SupportedChainId}`] ?? null
  );
};

export const getContractAddress = (
  chainId: SupportedChainId,
  symbol: string
): string | undefined => {
  return (
    (
      {
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
        },
        8453: {
          USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        },
        137: {
          USDC: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
          USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        },
      } as Record<number, Record<string, string>>
    )[chainId]?.[symbol?.toUpperCase()] ?? undefined
  );
};

export const getDecimals = (
  chainId: number,
  symbol: string
): number | undefined => {
  return (
    (
      {
        1: {
          USDT: 6,
          USDC: 6,
          BUSD: 18,
          SHIB: 18,
          PEPE: 18,
          FLOKI: 18,
        },
        56: {
          USDT: 18,
          BUSD: 18,
        },
        8453: {
          USDC: 6,
        },
        137: {
          USDC: 6,
          USDT: 6,
        },
      } as Record<string, Record<string, number>>
    )[chainId]?.[symbol.toUpperCase()] ?? null
  );
};

export const cutoffDecimals = (num: string, decimals: number): string => {
  const index = num.indexOf(".");
  if (index === -1) return num;
  const numDecimals = num.length - 1 - index;
  if (numDecimals <= decimals) return num;
  return num.substring(0, index + decimals);
};

export const numToBigInt = (num: number, decimals: number): bigint => {
  return BigInt(
    new Decimal(num).mul(new Decimal(10).pow(decimals)).floor().toFixed()
  );
};

export type TransactionData = {
  abi?: Abi;
  contractAddress?: string | null;
  decimals?: number | null;
  to: string;
  native: boolean;
  chainId?: number | null;
  value: string | number;
};

export const sendGenericTransaction = async (
  config: Config,
  args: TransactionData
): Promise<string> => {
  if (args.chainId) {
    const currentChainId = getChainId(config);
    if (currentChainId !== args.chainId) {
      await switchChain(config, {
        chainId: args.chainId,
        addEthereumChainParameter: {
          rpcUrls: [rpcMap[args.chainId.toString() as `${SupportedChainId}`]],
        },
      });
      // Wait for a bit after switching to propagate fully
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  if (args.native) {
    return await sendTransaction(config, {
      to: args.to as `0x${string}`,
      chainId: args.chainId ?? 1,
      value: numToBigInt(parseNum(args.value), args.decimals ?? 18),
      data: "0x",
    });
  } else {
    return await writeContract(config, {
      chainId: args.chainId ?? 1,
      abi: args.abi!,
      address: args.contractAddress as `0x${string}`,
      functionName: "transfer",
      args: [args.to, numToBigInt(parseNum(args.value), args.decimals ?? 18)],
    });
  }
};
