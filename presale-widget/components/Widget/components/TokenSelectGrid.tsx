import { API } from "../../../presale-gg/api";
import TokenSelect from "./TokenSelect";
import React, { useEffect, useMemo, useState } from "react";
import { useApiState } from "../../../presale-gg/stores";
import { groupTokens } from "../../../presale-gg/util";
import clsx from "clsx";
import Image from "next/image";

export type TokenSelectGridProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  value: API.PaymentToken | null;
  onChange: (newVal: API.PaymentToken | null) => void;
};

const TokenSelectGrid: React.FC<TokenSelectGridProps> = ({
  value,
  onChange,
  ...others
}) => {
  const apiData = useApiState();
  const groupedTokens = useMemo(
    () => groupTokens(apiData.paymentTokens ?? []),
    [apiData.paymentTokens]
  );
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  useEffect(() => {
    if (!value) return;
    if (groupedTokens[selectedGroupIndex].currencies.includes(value)) return;
    const groupIndex = groupedTokens.findIndex((group) =>
      group.currencies.includes(value)
    );
    if (groupIndex === -1) return;
    setSelectedGroupIndex(groupIndex);
  }, [value, groupedTokens, selectedGroupIndex]);

  return (
    <div {...others} className={clsx("flex flex-col gap-2", others.className)}>
      <div className="grid grid-cols-3 gap-2">
        {groupedTokens.map((list, i) => {
          const selected =
            list.currencies.find((token) => token.id === value?.id) !==
              undefined && i === selectedGroupIndex;

          return (
            <TokenSelect
              key={i}
              value={selected ? value : null}
              onChange={(token) => {
                onChange(token);
                setSelectedGroupIndex(i);
              }}
              defaultLabel={list.defaultLabel}
              placeholder={list.placeholder}
              tokens={list.currencies}
              defaultToken={list.defaultToken}
              selected={selected}
              style={i === 0 ? { gridColumn: "1 / -1" } : {}}
            />
          );
        })}
      </div>
      <div className="flex gap-1 items-center justify-center text-sm">
        <Image
          src="/images/coin-logos.webp"
          width="515"
          height="77"
          alt="ADA, LTC, TRX, TON, XRP, USDC"
          className="h-5 w-auto"
        />
        <span>+ Other Cryptos</span>
      </div>
    </div>
  );
};

export default TokenSelectGrid;
