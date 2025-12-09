import React, { useEffect, useState } from "react";
import StageBox from "../components/StageBox";
import TokenSelectGrid from "../components/TokenSelectGrid";
import { api, API } from "../../../presale-gg/api";
import {
  BuyState,
  buyWithCard,
  buyWithCrypto,
  formatDollar,
  formatLargeNumber,
  formatPrecision,
  parseNum,
} from "../../../presale-gg/util";
import {
  refetchUserData,
  refetchUserStakeData,
  showConnectWalletModal,
  useApiState,
  useUserState,
} from "../../../presale-gg/stores";
import TokenAmountInputs from "../components/TokenAmountInputs";
import { Button } from "../../ui/button";
import { useAccount } from "wagmi";
import CodeInputs, {
  BonusCodeInput,
  ReferralCodeInput,
} from "../components/CodeInputs";
import clsx from "clsx";
import UserReferralLink from "../components/UserReferralData";
import Image from "next/image";
import { toast } from "sonner";
import Spinner from "../components/Spinner";
import WalletTransferModal from "../components/WalletTransferModal";
import NowpaymentsModal from "../components/NowPaymentsModal";
import ContactModal from "../components/ContactModal";
import Modal from "../components/Modal";
import { Loadable } from "../components/Loader";
import { useTranslations } from "next-intl";
import { LAUNCH_PRICE } from "../../constants/numbers";

const BuyTab = () => {
  const t = useTranslations("widget.buy");
  const [selectedToken, setSelectedToken] = useState<API.PaymentToken | null>(
    null
  );
  const [paymentAmountStr, setPaymentAmountStr] = useState("1");
  const [receiveAmountStr, setReceiveAmountStr] = useState("0");

  const apiData = useApiState();

  useEffect(() => {
    if (!apiData.paymentTokens?.length) return;
    setSelectedToken(
      apiData.paymentTokens.find(
        (token) => token.symbol.toUpperCase() === "ETH"
      ) ?? apiData.paymentTokens[0]
    );
  }, [apiData.paymentTokens]);

  useEffect(() => {
    if (!selectedToken) return;
    const receiveNum =
      (parseNum(paymentAmountStr) * parseNum(selectedToken.price)) /
      parseNum(apiData.stage?.token_price ?? 1);
    setReceiveAmountStr(formatPrecision(receiveNum, 0, 2));
  }, [selectedToken, apiData.stage?.token_price]);

  const accountData = useAccount();

  const [visibleOption, setVisibleOption] = useState<
    "bonus" | "referral" | "referral-link" | null
  >(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("referral_code")) setVisibleOption("referral");
    if (params.has("bonus_code")) setVisibleOption("bonus");
  }, []);

  const [transactionLoading, setTransactionLoading] = useState(false);
  const [createdTransaction, setCreatedTransaction] =
    useState<API.Transaction | null>(null);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  const [buyState, setBuyState] = useState<BuyState["type"] | null>(null);
  const [boughtTransaction, setBoughtTransaction] =
    useState<API.PurchaseTransactionHistoryItemV2 | null>(null);
  const [boughtTransactionHash, setBoughtTransactionHash] = useState<
    string | null
  >(null);
  const [boughtPaymentToken, setBoughtPaymentToken] =
    useState<API.PaymentToken | null>(null);
  const [boughtPaymentAmountStr, setBoughtPaymentAmountStr] = useState<
    string | null
  >(null);
  const [boughtModalOpen, setBoughtModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [transactionErrorMessage, setTransactionErrorMessage] = useState<
    string | null
  >(null);

  const buy = async () => {
    const account = accountData.address;
    if (apiData.presaleEnded) return toast.error(t("presaleEnded"));
    if (!account) return toast.error(t("youMustConnect"));
    if (transactionLoading) return;
    if (!selectedToken) return;
    setTransactionLoading(true);
    try {
      if (selectedToken.symbol.toLowerCase() === "card") {
        await buyCard();
      } else {
        setBuyState(null);
        setBoughtModalOpen(true);
        setBoughtTransaction(null);
        setBoughtTransactionHash(null);
        setBoughtPaymentToken(selectedToken);
        setBoughtPaymentAmountStr(paymentAmountStr);
        setTransactionLoading(true);
        const res = await buyWithCrypto({
          paymentToken: selectedToken,
          paymentTokenNum: paymentAmountStr,
          walletAddress: account,
          onStateChanged: (state) => {
            setBuyState(state.type);
            if (state.type === "confirming") {
              setBoughtTransactionHash(state.transactionHash);
            } else if (state.type === "finished") {
              setBoughtTransaction(state.transaction);
              refetchUserData();
              refetchUserStakeData();
            } else if (state.type === "errored") {
              setTransactionErrorMessage(
                api.getApiErrorMessage(state.error, "Error sending transaction")
              );
            }
            if (state.type !== "sending") {
              setTransactionLoading(false);
            }
          },
        });
        if (!res) return setTransactionLoading(false);
        if (res.type === "created") {
          setCreatedTransaction(res.transaction);
          setTimeout(() => {
            setTransactionModalOpen(true);
          }, 50);
          setTransactionLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      setTransactionLoading(false);
    }
  };

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [erroredModalOpen, setErroredModalOpen] = useState(false);
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [successBoughtModalOpen, setSuccessBoughtModalOpen] = useState(false);

  const buyCard = async () => {
    try {
      const account = accountData.address;
      if (!account) return toast.error(t("youMustConnect"));
      const usdAmount = parseNum(paymentAmountStr);
      await buyWithCard({
        name: `${formatLargeNumber(parseNum(receiveAmountStr))} $DOGEBALL`,
        usd: usdAmount,
        walletAddress: account,
        onClosedEarly: () => {
          setPendingModalOpen(true);
        },
        onError: () => setErroredModalOpen(true),
        onSuccess: (tokens) => {
          if (tokens !== undefined) {
            setSuccessBoughtModalOpen(true);
          } else {
            setSuccessModalOpen(true);
          }
          refetchUserData();
          refetchUserStakeData();
        },
      });
    } catch (err) {}
    setTransactionLoading(false);
  };

  const userData = useUserState();

  return (
    <>
      <Loadable
        component="p"
        className="text-lg text-center self-center font-bold"
        length={6}
      >
        {apiData.presaleEnded ? t("presaleEnded") : apiData.stage?.stage_name}
      </Loadable>
      {!apiData.presaleEnded && (
        <>
          <StageBox />
          <Loadable
            component="p"
            className="text-center text-sm leading-[1] self-center"
            length={12}
          >
            1 $DOGEBALL ={" "}
            {formatDollar(parseNum(apiData.stage?.token_price), true, 0, 6)}
          </Loadable>
        </>
      )}
      {userData.user && (
        <div className="flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md">
          {[
            {
              label: t("yourTokens"),
              value: `${formatLargeNumber(
                parseNum(userData.user.total_tokens)
              )}`,
            },
            {
              label: t("valueUsd"),
              value: `$${formatLargeNumber(
                parseNum(userData.user.total_tokens) * LAUNCH_PRICE
              )}`,
            },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="w-[1px] h-8 my-auto bg-[rgba(255,255,255,0.1)]" />
              )}
              <div
                className={clsx(
                  "flex flex-1 flex-col gap-[0.125rem] text-center leading-[1] p-[0.375rem]"
                )}
              >
                <p>{item.value}</p>
                <Loadable
                  component="p"
                  className="text-xs text-[var(--text-secondary)]"
                >
                  {item.label}
                </Loadable>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
      <TokenSelectGrid value={selectedToken} onChange={setSelectedToken} />
      <TokenAmountInputs
        paymentAmountStr={paymentAmountStr}
        receiveAmountStr={receiveAmountStr}
        onPaymentAmountChange={setPaymentAmountStr}
        onReceiveAmountStr={setReceiveAmountStr}
        selectedToken={selectedToken}
      />
      <Button
        onClick={() => {
          if (!accountData.isConnected) {
            showConnectWalletModal();
          } else {
            buy();
          }
        }}
      >
        {apiData.presaleEnded ? (
          t("presaleEnded")
        ) : transactionLoading ? (
          <Spinner size={5} />
        ) : accountData.isConnected ? (
          t("buyDogeball")
        ) : (
          t("connectWallet")
        )}
      </Button>
      <div className="p-2 border border-[rgba(255,255,255,0.3)] leading-[1.2] text-sm rounded-md text-center">
        {t("bonusOffer")}{" "}
        <span className="font-bold text-[#007BF9]">DOGEBALL10</span>{" "}
        {t("toGetMore")}
      </div>
      <div className="flex justify-center items-center gap-2">
        {(
          [
            { label: t("bonusCode"), value: "bonus" },
            { label: t("referralCode"), value: "referral" },
          ] as const
        ).map((item) => (
          <button
            key={item.value}
            onClick={() =>
              setVisibleOption((option) =>
                option === item.value ? null : item.value
              )
            }
            className={clsx(
              "text-xs py-[0.125rem] px-2 rounded-full cursor-pointer transition-colors",
              {
                "bg-[#007BF9]": visibleOption === item.value,
                "bg-[rgba(255,255,255,0.15)]": visibleOption !== item.value,
              }
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {visibleOption === "bonus" && <BonusCodeInput />}
      {visibleOption === "referral" && <ReferralCodeInput />}

      <a
        href="https://presale.gg"
        target="_blank"
        className="flex items-center text-center justify-center gap-1 text-xs hover:underline"
      >
        {t("poweredBy")}{" "}
        <Image
          src="/presale-gg-logo.svg"
          alt="presale.gg"
          width="109"
          height="109"
          className="h-4 w-auto"
        />
        Presale.gg
      </a>

      {createdTransaction && (
        <NowpaymentsModal
          open={transactionModalOpen}
          onClose={() => {
            setTransactionModalOpen(false);
            setContactModalOpen(true);
          }}
          transaction={createdTransaction}
        />
      )}
      {boughtPaymentAmountStr !== null &&
        boughtPaymentToken !== null &&
        buyState !== null && (
          <WalletTransferModal
            open={boughtModalOpen}
            onClose={() => {
              setBoughtModalOpen(false);
              setContactModalOpen(true);
            }}
            payCurrency={boughtPaymentToken}
            payAmount={boughtPaymentAmountStr}
            state={buyState}
            transactionHash={boughtTransactionHash}
            transaction={boughtTransaction}
            transactionError={transactionErrorMessage}
          />
        )}
      <ContactModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
      <Modal
        title={t("transactionSuccessful")}
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          setContactModalOpen(true);
        }}
      >
        <p>{t("transactionSuccessfulDesc")}</p>
      </Modal>
      <Modal
        title={t("transactionSuccessful")}
        open={successBoughtModalOpen}
        onClose={() => {
          setSuccessBoughtModalOpen(false);
          setContactModalOpen(true);
        }}
      >
        <p>
          {t("transactionSuccessfulDesc")} {t("youBought")}{" "}
          {boughtTransaction?.tokens_bought ?? "Unknown"} DOGEBALL.
        </p>
      </Modal>
      <Modal
        title={t("transactionErrored")}
        open={erroredModalOpen}
        onClose={() => setErroredModalOpen(false)}
      >
        <p>{t("transactionErroredDesc")}</p>
      </Modal>
      <Modal
        title={t("transactionPending")}
        open={pendingModalOpen}
        onClose={() => {
          setPendingModalOpen(false);
          setContactModalOpen(true);
        }}
      >
        <p>{t("transactionPendingDesc")}</p>
      </Modal>
    </>
  );
};

export default BuyTab;
