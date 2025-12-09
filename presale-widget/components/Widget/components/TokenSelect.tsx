import { API } from "../../../presale-gg/api";
import { tokenImageMap } from "../../../presale-gg/assets/img/tokens";
import { useClickAway } from "../../../presale-gg/util";
import clsx from "clsx";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import { Loadable } from "./Loader";

export type TokenSelectProps = Omit<
  React.HTMLAttributes<unknown>,
  "onChange" | "value"
> & {
  tokens: API.PaymentToken[];
  value: API.PaymentToken | null;
  onChange: (newVal: API.PaymentToken | null) => void;
  defaultLabel?: string;
  placeholder?: string;
  defaultToken?: API.PaymentToken | null;
  selected: boolean;
};

const TokenSelect: React.FC<TokenSelectProps> = ({
  tokens,
  value,
  onChange,
  defaultLabel,
  placeholder,
  defaultToken,
  selected,
  ...others
}) => {
  const text = useMemo(() => {
    return (
      value?.symbol.toUpperCase() ??
      defaultLabel ??
      defaultToken?.symbol.toUpperCase() ??
      placeholder ??
      "None"
    );
  }, [value, defaultLabel, defaultToken, placeholder]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLElement | null>(null);
  useClickAway(
    buttonRef,
    useCallback(() => setDropdownOpen(false), [])
  );

  const isCard = useMemo(() => {
    return text.toUpperCase() === "CARD";
  }, [text]);

  return (
    <div
      {...others}
      className={clsx("flex flex-col relative", others.className)}
    >
      <button
        ref={setButtonRef}
        className={clsx(
          "h-10 rounded-md px-2 max-sm:px-[0.375rem] flex items-center justify-between transition-colors",
          {
            "bg-[#007BF9] text-[#fff] outline outline-[1.5px] outline-[#007BF9]":
              selected,
            "bg-[rgba(255,255,255,0.15)]": !selected,
          }
        )}
        onClick={() => {
          if (tokens.length === 1) {
            onChange(tokens[0]);
          } else {
            setDropdownOpen((open) => !open);
          }
        }}
      >
        <div
          className={clsx("flex gap-2 max-sm:gap-1 items-center", {
            "mx-auto": isCard,
          })}
        >
          {(value || defaultToken) && !isCard && (
            <Loadable
              component={Image}
              loadVariant="block"
              loadClass="!rounded-full"
              className="w-6 h-6 max-sm:w-5 max-sm:h-5"
              src={
                tokenImageMap[(value ?? defaultToken)!.symbol.toLowerCase()]!
              }
              alt=""
            />
          )}
          {isCard && (
            <div className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="18"
                viewBox="0 0 34 18"
                fill="none"
              >
                <rect width="33.1579" height="18" rx="2.52907" fill="#aaa" />
                <path
                  d="M14.2318 5.36914L12.9877 12.6354H14.9775L16.2226 5.36914H14.2318ZM11.3193 5.37729L9.37045 10.3326L9.16267 9.58442C8.77833 8.68289 7.68722 7.38816 6.40625 6.5722L8.18825 12.6318L10.2937 12.6282L13.4273 5.37576L11.3193 5.37729Z"
                  fill="black"
                />
                <path
                  d="M8.39939 5.89809C8.28373 5.45547 7.94852 5.32355 7.53244 5.30777H4.44746L4.42188 5.45242C6.82261 6.03204 8.41116 7.42865 9.07033 9.10794L8.39939 5.89809ZM20.2475 6.76294C20.7579 6.75163 21.2651 6.84635 21.7368 7.04104L21.9164 7.12508L22.1856 5.55021C21.7915 5.40301 21.1738 5.24512 20.4031 5.24512C18.4368 5.24512 17.0509 6.23069 17.0402 7.64308C17.0274 8.68671 18.0274 9.2694 18.7828 9.61727C19.5581 9.97381 19.8181 10.2005 19.8145 10.5188C19.8084 11.0052 19.1963 11.2283 18.6247 11.2283C17.8278 11.2283 17.4046 11.1188 16.751 10.8478L16.4946 10.7317L16.2147 12.358C16.6804 12.5612 17.5397 12.7359 18.4317 12.7451C20.5233 12.7451 21.8826 11.7713 21.8969 10.2621C21.9056 9.43646 21.3749 8.80641 20.225 8.28943C19.529 7.95225 19.1032 7.72814 19.1073 7.3879C19.1073 7.08586 19.4686 6.76294 20.2475 6.76294ZM27.2921 5.37805H25.7547C25.2772 5.37805 24.922 5.50743 24.7122 5.98111L21.7577 12.6402H23.8473C23.8473 12.6402 24.1882 11.7448 24.2654 11.5487L26.8136 11.5517C26.8729 11.8054 27.0561 12.6402 27.0561 12.6402H28.9021L27.2921 5.37805ZM24.8381 10.0614C25.0019 9.64427 25.6309 8.03069 25.6309 8.03069C25.6201 8.05055 25.7931 7.61048 25.896 7.33697L26.03 7.96345L26.4911 10.0614H24.8381Z"
                  fill="black"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="18"
                viewBox="0 0 35 18"
                fill="none"
              >
                <rect width="34.1053" height="18" rx="2.52907" fill="#aaa" />
                <path
                  d="M13.9757 15.1655C10.6333 15.1655 7.91406 12.5344 7.91406 9.3003C7.91406 6.0662 10.6333 3.43506 13.9757 3.43506C17.3182 3.43506 20.0374 6.0662 20.0374 9.3003C20.0374 12.5344 17.3182 15.1655 13.9757 15.1655Z"
                  fill="#EE2C3C"
                />
                <path
                  d="M21.2569 3.43506C19.2845 3.43506 17.5461 4.36529 16.4392 5.78116H18.8021C19.0869 6.1448 19.3403 6.5319 19.5318 6.9542H15.7105C15.537 7.33053 15.4058 7.7238 15.319 8.12725H19.9235C20.0022 8.50615 20.0447 8.89911 20.0447 9.3003H15.1953C15.1953 9.70147 15.2377 10.0945 15.3178 10.4733H19.9222C19.8355 10.8768 19.7041 11.2701 19.5306 11.6464H15.7093C15.9009 12.0687 16.1542 12.4558 16.4392 12.8194H18.8021C18.4641 13.251 18.0664 13.6355 17.62 13.9619C18.6631 14.7383 19.941 15.1613 21.2569 15.1655C24.5994 15.1655 27.3187 12.5344 27.3187 9.3003C27.3187 6.0662 24.5994 3.43506 21.2569 3.43506Z"
                  fill="#F99D3C"
                />
              </svg>
            </div>
          )}
          <div className="flex flex-col text-start leading-[1]">
            <Loadable component="p" length={3} className="max-sm:text-sm">
              {text}
            </Loadable>
            {((selected && value) ||
              (defaultToken && defaultToken.symbol.toUpperCase() !== "USDT") ||
              tokens.length === 1) &&
              !isCard && (
                <Loadable
                  component="p"
                  className={clsx("text-[0.625rem] max-sm:text-[0.5rem]", {
                    "text-[#ccc]": selected,
                    "text-[var(--text-secondary)]": !selected,
                  })}
                  length={3}
                >
                  {(value ?? defaultToken ?? tokens[0]).chain?.toUpperCase()}
                </Loadable>
              )}
          </div>
        </div>
        {tokens.length > 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={clsx("w-4 h-4 transition-transform", {
              "rotate-180": dropdownOpen,
            })}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>
      <div
        className={clsx(
          "flex flex-col bg-[#4473C5] rounded-md absolute top-[calc(100%+0.125rem)] w-full z-[1] transition-opacity max-h-60 overflow-y-auto min-w-28 max-sm:max-h-52",
          {
            "opacity-0 pointer-events-none": !dropdownOpen,
          }
        )}
      >
        {tokens.map((token) => (
          <button
            key={token.id}
            className="flex items-center gap-2 p-2 hover:bg-[rgba(0,0,0,0.1)] max-sm:gap-[0.375rem] justify-start"
            onClick={() => onChange(token)}
          >
            <Image
              className="w-6 h-6 max-sm:w-5 max-sm:h-5"
              src={tokenImageMap[token.symbol.toLowerCase()]!}
              alt=""
            />
            <div className="flex flex-col text-start leading-[1]">
              <p>{token.symbol.toUpperCase()}</p>
              <p className="text-[0.625rem] text-[var(--text-secondary)]">
                {token.chain.toUpperCase()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TokenSelect;
