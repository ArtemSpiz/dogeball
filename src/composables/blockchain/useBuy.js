/**
 * Buy Composable
 * Handles token purchases (crypto + card)
 */

import { ref } from "vue";
import { getWagmiConfig } from "./useWallet";
import * as presaleApi from "@/api/presale";
import {
  BuyStateType,
  RPC_URLS,
  TRANSACTION_POLL_INTERVAL,
  TRANSACTION_POLL_MAX_ATTEMPTS,
} from "@/config/web3";
import {
  parseNum,
  numToBigInt,
  getChainIdFromLabel,
  isCurrencyNative,
  getContractAddress,
  getDecimals,
  isWalletTransferSupported,
} from "@/utils/web3";
import erc20Abi from "@/abi/erc20.json";

/**
 * Buy composable
 */
export function useBuy() {
  const buyState = ref({ type: BuyStateType.IDLE });

  /**
   * Reset buy state
   */
  const resetBuyState = () => {
    buyState.value = { type: BuyStateType.IDLE };
  };

  /**
   * Wait for transaction to be processed by backend
   */
  const waitForNextTransaction = async (walletAddress, createdAt) => {
    return new Promise((resolve) => {
      let attempts = 0;
      const checkInterval = setInterval(async () => {
        attempts++;
        if (attempts > TRANSACTION_POLL_MAX_ATTEMPTS) {
          clearInterval(checkInterval);
          resolve(null);
          return;
        }

        try {
          const res = await presaleApi.getTransactionHistoryV2(
            walletAddress,
            0,
            10
          );
          const transaction = res.data?.find(
            (t) =>
              t.record_type === "transaction" &&
              new Date(t.created_at).getTime() >= createdAt &&
              t.status === "completed"
          );
          if (transaction) {
            clearInterval(checkInterval);
            resolve(transaction);
          }
        } catch (e) {
          // Continue polling
        }
      }, TRANSACTION_POLL_INTERVAL);
    });
  };

  /**
   * Buy with cryptocurrency
   */
  const buyWithCrypto = async ({
    paymentToken,
    paymentAmount,
    walletAddress,
    paymentWalletAddress,
    onStateChanged,
  }) => {
    const payNum = parseNum(paymentAmount);
    if (payNum <= 0) {
      throw new Error(
        `Must pay more than 0 ${paymentToken.symbol.toUpperCase()}`
      );
    }

    // Check minimum
    const minimum = paymentToken.nowpayments_minimum
      ? parseNum(paymentToken.nowpayments_minimum) /
        parseNum(paymentToken.price)
      : 0;
    if (payNum < minimum) {
      throw new Error(
        `Must pay at least ${minimum} ${paymentToken.symbol.toUpperCase()}`
      );
    }

    const updateState = (state) => {
      buyState.value = state;
      onStateChanged?.(state);
    };

    // Check if wallet transfer is supported
    if (isWalletTransferSupported(paymentToken)) {
      return buyWithWalletTransfer({
        paymentToken,
        paymentAmount: payNum,
        walletAddress,
        paymentWalletAddress,
        updateState,
      });
    } else {
      return buyWithNowPayments({
        paymentToken,
        paymentAmount: payNum,
        walletAddress,
        updateState,
      });
    }
  };

  /**
   * Buy with direct wallet transfer
   */
  const buyWithWalletTransfer = async ({
    paymentToken,
    paymentAmount,
    walletAddress,
    paymentWalletAddress,
    updateState,
  }) => {
    try {
      updateState({ type: BuyStateType.SENDING });

      const config = getWagmiConfig();
      const chainId = getChainIdFromLabel(paymentToken.chain);

      if (!chainId) {
        throw new Error(`Invalid chain for ${paymentToken.chain}`);
      }

      const native = isCurrencyNative(paymentToken.symbol, chainId);
      const contractAddress = getContractAddress(chainId, paymentToken.symbol);
      const decimals = getDecimals(chainId, paymentToken.symbol);

      if (!native && !contractAddress) {
        throw new Error(`Invalid contract address for ${paymentToken.symbol}`);
      }

      if (!paymentWalletAddress) {
        throw new Error("Payment wallet address not configured");
      }

      // Import wagmi functions dynamically
      const {
        sendTransaction,
        writeContract,
        switchChain,
        getChainId,
        waitForTransactionReceipt,
      } = await import("@wagmi/core");

      // Switch chain if needed
      const currentChainId = getChainId(config);
      if (currentChainId !== chainId) {
        await switchChain(config, {
          chainId,
          addEthereumChainParameter: {
            rpcUrls: [RPC_URLS[chainId]],
          },
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const createdAt = Date.now();
      let transactionHash;

      if (native) {
        transactionHash = await sendTransaction(config, {
          to: paymentWalletAddress,
          chainId,
          value: numToBigInt(paymentAmount, decimals),
          data: "0x",
        });
      } else {
        transactionHash = await writeContract(config, {
          chainId,
          abi: erc20Abi,
          address: contractAddress,
          functionName: "transfer",
          args: [paymentWalletAddress, numToBigInt(paymentAmount, decimals)],
        });
      }

      updateState({ type: BuyStateType.CONFIRMING, transactionHash });

      await waitForTransactionReceipt(config, { hash: transactionHash });

      updateState({ type: BuyStateType.FINALIZING });

      // Notify backend
      try {
        await presaleApi.createTransactionMetadata(walletAddress, transactionHash);
      } catch (e) {
        console.warn("Failed to create transaction metadata:", e);
      }

      // Poll for completion
      const transaction = await waitForNextTransaction(walletAddress, createdAt);

      updateState({
        type: BuyStateType.FINISHED,
        transaction,
        transactionHash,
      });

      return { type: "sent", transactionHash, transaction };
    } catch (err) {
      updateState({ type: BuyStateType.ERRORED, error: err });
      throw err;
    }
  };

  /**
   * Buy with NowPayments
   */
  const buyWithNowPayments = async ({
    paymentToken,
    paymentAmount,
    walletAddress,
    updateState,
  }) => {
    try {
      updateState({ type: BuyStateType.SENDING });

      if (!walletAddress) {
        throw new Error("Please connect your wallet");
      }

      const res = await presaleApi.createTransaction({
        payment_token_id: paymentToken.id,
        usd_amount: (paymentAmount * parseNum(paymentToken.price)).toString(),
        wallet_address: walletAddress,
        token_amount: paymentAmount.toString(),
      });

      updateState({ type: BuyStateType.FINISHED, transaction: res.data });

      return { type: "created", transaction: res.data };
    } catch (err) {
      updateState({ type: BuyStateType.ERRORED, error: err });
      throw err;
    }
  };

  /**
   * Buy with card (Wert widget)
   */
  const buyWithCard = async ({
    walletAddress,
    usdAmount,
    onSuccess,
    onError,
    onClose,
    onStart,
    onClosedEarly,
  }) => {
    if (!walletAddress) {
      throw new Error("Please connect your wallet");
    }

    try {
      const { default: WertWidget } = await import("@wert-io/widget-initializer");
      const createdAt = Date.now();

      const transactionRes = await presaleApi.createCardTransaction({
        wallet_address: walletAddress,
        usd_amount: usdAmount,
      });

      let isPending = false;
      let successCalled = false;
      let errorCalled = false;
      let cancelledCalled = false;

      const handleSuccess = (tokensBought, transaction) => {
        if (successCalled || errorCalled || cancelledCalled) return;
        successCalled = true;
        onSuccess?.(tokensBought, transaction);
      };

      const handleError = () => {
        if (successCalled || errorCalled || cancelledCalled) return;
        errorCalled = true;
        onError?.();
      };

      let checking = false;
      let checkSignal = { aborted: false };

      const check = () => {
        if (checking) return;
        checking = true;
        waitForNextTransaction(walletAddress, createdAt).then((trx) => {
          if (successCalled || checkSignal.aborted) return;
          handleSuccess(parseNum(trx?.tokens_bought), trx);
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
            name: "DOGEBALL Tokens",
            author_image_url: `${window.origin}/logo.png`,
            author: "Dogeball",
            image_url: `${window.origin}/logo.png`,
          },
        },
        listeners: {
          "payment-status": (e) => {
            if (e.status === "success") {
              handleSuccess();
              widget.close();
              if (!checking) check();
            } else if (["canceled", "failed", "failover"].includes(e.status)) {
              handleError();
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
      overlay.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;z-index:500;background:rgba(0,0,0,0.4)";
      document.body.appendChild(overlay);

      widget.addEventListeners({
        close: () => {
          document.body.removeChild(overlay);
          if (isPending && !successCalled && !errorCalled && !cancelledCalled) {
            onClosedEarly?.();
            cancelledCalled = true;
          } else {
            onClose?.();
          }
          if (checking) checkSignal.aborted = true;
        },
        loaded: () => onStart?.(),
      });
    } catch (err) {
      console.error(err);
      onError?.();
      throw err;
    }
  };

  return {
    buyState,
    resetBuyState,
    buyWithCrypto,
    buyWithCard,
    waitForNextTransaction,
  };
}

