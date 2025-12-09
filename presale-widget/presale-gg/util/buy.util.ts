import { toast } from "sonner";

import { parseNum } from "./number.util";
import { API, api } from "../api";
import { $apiState } from "../stores/api.store";
import {
  getAbi,
  getChainIdFromLabel,
  getContractAddress,
  getDecimals,
  isCurrencyNative,
  sendGenericTransaction,
} from "../web3";
import { wagmiAdapter } from "../../config";
import { waitForTransactionReceipt } from "@wagmi/core";

export const walletBuyTokens = new Set([
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

export const waitForNextTransaction = (
  walletAddress: string,
  createdAt: number,
  checkFunc?: (trx: API.PurchaseTransactionHistoryItemV2) => boolean,
  args?: { signal?: AbortSignal }
) => {
  return new Promise<API.PurchaseTransactionHistoryItemV2>(
    (resolve, reject) => {
      const confirm = (transaction: API.PurchaseTransactionHistoryItemV2) => {
        clearInterval(checkInterval);
        resolve(transaction);
      };
      const checkInterval = setInterval(async () => {
        if (args?.signal?.aborted) {
          reject();
          return clearInterval(checkInterval);
        }
        try {
          const res = await api.getTransactionHistoryV2(walletAddress, 0, 10);
          const transaction: API.PurchaseTransactionHistoryItemV2 | undefined =
            res.data.find(
              (
                transaction
              ): transaction is API.PurchaseTransactionHistoryItemV2 =>
                transaction.record_type === "transaction" &&
                (checkFunc === undefined || checkFunc(transaction))
            );
          if (!transaction) return;
          if (new Date(transaction.created_at).getTime() < createdAt) return;
          if (transaction.status === "completed") {
            confirm(transaction);
          }
        } catch (_) {}
      }, 5000);
    }
  );
};

export type TransactionFinishedReturn =
  | { type: "created"; transaction: API.Transaction }
  | { type: "sent" }
  | null;

export type BuyState =
  | { type: "sending" | "finalizing" }
  | { type: "confirming"; transactionHash: string }
  | { type: "finished"; transaction: API.PurchaseTransactionHistoryItemV2 }
  | { type: "errored"; error: unknown };

export const buyWithCrypto = async (args: {
  paymentToken: API.PaymentToken;
  paymentTokenNum: string;
  walletAddress: string;
  onStateChanged?: (state: BuyState) => void;
  usdAmount?: string;
}): Promise<TransactionFinishedReturn> => {
  const apiData = $apiState.get();
  if (apiData.presaleEnded) {
    toast.error("Presale has ended");
    return null;
  }

  const minimum =
    Math.ceil(
      (parseNum(args.paymentToken.nowpayments_minimum) /
        parseNum(args.paymentToken.price)) *
        10 ** 6
    ) /
    10 ** 6;

  const paymentTokenNum = parseNum(args.paymentTokenNum);
  if (paymentTokenNum < minimum) {
    toast.error(
      `Must pay more than ${minimum} ${args.paymentToken.symbol.toUpperCase()}`
    );
    return null;
  }

  if (paymentTokenNum <= 0) {
    toast.error(
      `Must pay more than 0 ${args.paymentToken.symbol.toUpperCase()}`
    );
    return null;
  }

  const walletTransfer = walletBuyTokens.has(
    args.paymentToken.symbol.toUpperCase() +
      "-" +
      args.paymentToken.chain.toUpperCase()
  );
  if (walletTransfer) {
    try {
      args.onStateChanged?.({ type: "sending" });
      if (!wagmiAdapter) throw new Error("wagmiAdapter not configured. Call setWagmiAdapter() from presale-widget/config first.");
      const config = wagmiAdapter.wagmiConfig;

      const chainId = getChainIdFromLabel(args.paymentToken.chain);
      if (!chainId) {
        toast.error(`Invalid chain id for chain ${args.paymentToken.chain}`);
        return null;
      }

      const abi = getAbi(chainId);
      if (!abi) {
        toast.error(`Invalid ABI for chain id ${chainId}`);
        return null;
      }
      const native = isCurrencyNative(args.paymentToken.symbol, chainId);
      const contractAddress = getContractAddress(
        chainId,
        args.paymentToken.symbol
      );
      const decimals = getDecimals(chainId, args.paymentToken.symbol);

      if (!native && !contractAddress) {
        toast.error(
          `Invalid contract address for token ${args.paymentToken.symbol}`
        );
        return null;
      }

      let toAddress = apiData.info
        ?.main_payment_wallet_address as `0x${string}`;

      const createdAt = Date.now();
      toast("Confirm in your wallet");

      const transactionHash = await sendGenericTransaction(config, {
        to: toAddress,
        value: paymentTokenNum,
        abi,
        chainId,
        contractAddress,
        decimals,
        native,
      });
      args.onStateChanged?.({ type: "confirming", transactionHash });
      await waitForTransactionReceipt(config, {
        hash: transactionHash as `0x${string}`,
      });
      api.createTransactionMetadata(args.walletAddress ?? "", transactionHash);
      args.onStateChanged?.({ type: "finalizing" });
      const transaction = await waitForNextTransaction(
        args.walletAddress,
        createdAt
      );
      args.onStateChanged?.({ type: "finished", transaction });
      return {
        type: "sent",
      };
    } catch (err) {
      console.error("ERRORED", err);
      args.onStateChanged?.({ type: "errored", error: err });
      throw err;
    }
  } else {
    try {
      const res = await api.createTransaction({
        payment_token_id: args.paymentToken.id,
        usd_amount: (
          paymentTokenNum * parseNum(args.paymentToken.price)
        ).toString(),
        wallet_address: args.walletAddress,
        token_amount: paymentTokenNum.toString(),
      });
      return {
        type: "created",
        transaction: res.data,
      };
    } catch (err) {
      toast.error(api.getApiErrorMessage(err, "Error creating transaction"));
      throw err;
    }
  }
};

export const buyWithCard = async (args: {
  walletAddress: string;
  usd: number;
  onSuccess?: (
    tokensBought: number | undefined,
    transaction: API.PurchaseTransactionHistoryItemV2 | undefined
  ) => void;
  onClose?: () => void;
  onClosedEarly?: () => void;
  onError?: () => void;
  onStart?: () => void;
  name: string;
}) => {
  try {
    const { default: WertWidget } = await import("@wert-io/widget-initializer");
    const createdAt = Date.now();
    const transactionRes = await api.createCardTransaction({
      usd_amount: args.usd,
      wallet_address: args.walletAddress,
    });

    let isPending = false;
    let successCalled = false;
    let errorCalled = false;
    let cancelledCalled = false;

    const onSuccess = (
      tokensBought?: number,
      transaction?: API.PurchaseTransactionHistoryItemV2
    ) => {
      if (successCalled || errorCalled || cancelledCalled) return;
      successCalled = true;
      args.onSuccess?.(tokensBought, transaction);
    };

    const onError = () => {
      if (successCalled || errorCalled || cancelledCalled) return;
      errorCalled = true;
      args.onError?.();
    };

    let checking = false;
    let checkSignal = new AbortController();
    const check = () => {
      if (checking) return;
      checking = true;
      waitForNextTransaction(args.walletAddress, createdAt, undefined, {
        signal: checkSignal.signal,
      }).then((trx) => {
        if (successCalled) return;
        onSuccess(parseNum(trx.tokens_bought), trx);
        widget.close();
      });
    };

    const widget = new WertWidget({
      click_id: transactionRes.data.clickId,
      partner_id: "01K96Y6N21GCCM1BBKEG40DVW8",
      theme: "dark",
      ...transactionRes.data.signedData,
      extra: {
        item_info: {
          name: args.name,
          author_image_url: `${window.origin}/logo.png`,
          author: "Dogeball",
          image_url: `${window.origin}/logo.png`,
        },
      },
      listeners: {
        "payment-status": (e) => {
          if (e.status === "success") {
            onSuccess();
            widget.close();
            if (!checking) check();
          } else if (["canceled", "failed", "failover"].includes(e.status)) {
            onError?.();
            widget.close();
          } else if (e.status === "pending") {
            isPending = true;
            if (!checking) check();
          }
        },
      },
    });
    widget.open();
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "500";
    overlay.style.backgroundColor = "rgba(0,0,0,0.4)";

    document.body.appendChild(overlay);
    widget.addEventListeners({
      close: () => {
        document.body.removeChild(overlay);
        if (isPending && !successCalled && !errorCalled && !cancelledCalled) {
          args.onClosedEarly?.();
          cancelledCalled = true;
        } else {
          args.onClose?.();
        }
        if (checking) checkSignal.abort();
      },
      loaded: () => args.onStart?.(),
    });
  } catch (err) {
    console.error(err);
    toast.error(api.getApiErrorMessage(err, "Error with transaction"));
    throw err;
  }
};
