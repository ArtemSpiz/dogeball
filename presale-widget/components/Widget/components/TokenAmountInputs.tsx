import { Input } from "../../../ui/input";
import { API } from "../../../presale-gg/api";
import { tokenImageMap } from "../../../presale-gg/assets/img/tokens";
import { useApiState } from "../../../presale-gg/stores";
import { formatPrecision, parseNum, partialNumRegexp } from "../../../presale-gg/util";
import Image from "next/image";
import React, { useContext } from "react";
import { Loadable, LoaderContext } from "./Loader";
import { useTranslations } from "next-intl";

export type TokenAmountInputsProps = {
  selectedToken: API.PaymentToken | null;
  paymentAmountStr: string;
  onPaymentAmountChange: (newVal: string) => void;
  receiveAmountStr: string;
  onReceiveAmountStr: (newVal: string) => void;
};

const TokenAmountInputs: React.FC<TokenAmountInputsProps> = ({
  selectedToken,
  paymentAmountStr,
  receiveAmountStr,
  onPaymentAmountChange,
  onReceiveAmountStr,
}) => {
  const t = useTranslations("widget.inputs");
  const apiData = useApiState();
  const loading = useContext(LoaderContext);

  return (
    <>
      <div className="flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 pt-1 pb-[0.125rem]">
        <div className="flex flex-col flex-1">
          <p className="text-xs text-[var(--text-secondary)] leading-[1] max-sm:text-[0.625rem]">
            {t("youPay")}{" "}
            {selectedToken?.symbol.toUpperCase() === "CARD"
              ? "USD"
              : selectedToken?.symbol.toUpperCase()}
          </p>
          <input
            size={1}
            className="flex-1 outline-none bg-transparent"
            placeholder="0"
            value={paymentAmountStr}
            onFocus={(e) => {
              if (e.currentTarget.value === "0") {
                e.currentTarget.value = "";
                onPaymentAmountChange("");
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.value === "") {
                e.currentTarget.value = "0";
                onPaymentAmountChange("0");
              }
            }}
            onInput={(e) => {
              let val = e.currentTarget.value;
              if (!partialNumRegexp.test(val)) {
                val = paymentAmountStr;
              }
              e.currentTarget.value = val;
              onPaymentAmountChange(val);
              const num = parseNum(val);
              const receiveNum =
                (num * parseNum(selectedToken?.price)) /
                parseNum(apiData.stage?.token_price ?? 1);
              onReceiveAmountStr(formatPrecision(receiveNum, 0, 5));
            }}
          />
        </div>
        <div className="flex items-center gap-2 py-1 pl-2 pr-4 self-center -mt-[0.125rem] rounded-full border border-[#fff] w-[7.75rem]">
          {(tokenImageMap[selectedToken?.symbol.toLowerCase() ?? ""] ||
            loading) && (
            <Loadable
              component={Image}
              loadVariant="block"
              loadClass="!rounded-full"
              src={tokenImageMap[selectedToken?.symbol.toLowerCase() ?? ""]!}
              alt=""
              className="w-6 h-6"
            />
          )}
          <div className="flex flex-col justify-center leading-[1.2] font-normal">
            <Loadable component="p" length={3} className="text-[0.875rem]">
              {selectedToken?.symbol.toUpperCase() === "CARD"
                ? "USD"
                : selectedToken?.symbol.toUpperCase()}
            </Loadable>
            <Loadable
              component="p"
              length={3}
              className="text-[0.5rem] text-[var(--text-secondary)]"
            >
              {selectedToken?.symbol.toUpperCase() === "CARD"
                ? t("card")
                : selectedToken?.chain.toUpperCase()}
            </Loadable>
          </div>
        </div>
      </div>
      <div className="flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 pt-1 pb-[0.125rem]">
        <div className="flex flex-col flex-1">
          <p className="text-xs text-[var(--text-secondary)] leading-[1] max-sm:text-[0.625rem]">
            {t("youReceive")}
          </p>
          <input
            size={1}
            className="flex-1 outline-none bg-[transparent]"
            placeholder="0"
            value={receiveAmountStr}
            onFocus={(e) => {
              if (e.currentTarget.value === "0") {
                e.currentTarget.value = "";
                onReceiveAmountStr("");
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.value === "") {
                e.currentTarget.value = "0";
                onReceiveAmountStr("0");
              }
            }}
            onInput={(e) => {
              let val = e.currentTarget.value;
              if (!partialNumRegexp.test(val)) {
                val = receiveAmountStr;
              }
              e.currentTarget.value = val;
              onReceiveAmountStr(val);
              const num = parseNum(val);
              const paymentNum =
                (num * parseNum(apiData.stage?.token_price)) /
                parseNum(selectedToken?.price ?? 1);
              onPaymentAmountChange(formatPrecision(paymentNum, 0, 2));
            }}
          />
        </div>
        <div className="flex items-center gap-2 py-1 pl-2 pr-4 self-center -mt-[0.125rem]  rounded-full border border-[#DBDEE5] w-[7.75rem]">
          {tokenImageMap[selectedToken?.symbol.toLowerCase() ?? ""] && (
            <Image
              src="/logo.png"
              width={954}
              height={954}
              alt=""
              className="w-6 h-6"
            />
          )}
          <div className="flex flex-col justify-center font-normal">
            <p className="text-[0.75rem] leading-[1]">$DOGEBALL</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenAmountInputs;
