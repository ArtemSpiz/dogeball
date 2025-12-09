"use client";

import clsx from "clsx";
import BuyTab from "./tabs/BuyTab";
import HistoryTab from "./tabs/HistoryTab";
import StakeTab from "./tabs/StakeTab";

import {
  CircleDollarSign as BuyIcon,
  LockKeyhole as StakeIcon,
  HistoryIcon,
} from "lucide-react";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { Loader } from "./components/Loader";
import { useApiState } from "../../presale-gg/stores";
import { useTranslations } from "next-intl";

const Widget = () => {
  const t = useTranslations("widget.tabs");

  const tabs = [
    {
      label: t("buy"),
      key: "buy",
      icon: BuyIcon,
      component: BuyTab,
      needsConnected: false,
    },
    {
      label: t("stake"),
      key: "stake",
      icon: StakeIcon,
      component: StakeTab,
      needsConnected: true,
    },
    {
      label: t("dashboard"),
      key: "history",
      icon: HistoryIcon,
      component: HistoryTab,
      needsConnected: true,
    },
  ];
  const [selectedTabKey, setSelectedTabKey] = useState("buy");
  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.key === selectedTabKey)!,
    [selectedTabKey]
  );
  const Component = selectedTab.component;

  const [widgetHeight, setWidgetHeight] = useState("auto");
  const [innerRef, setInnerRef] = useState<HTMLElement | null>(null);
  const MIN_HEIGHT = 200;

  useEffect(() => {
    if (!innerRef) return;
    const func = () => {
      const { height } = innerRef.getBoundingClientRect();
      setWidgetHeight(`${Math.max(height, MIN_HEIGHT)}px`);
    };
    const resizeObserver = new ResizeObserver(func);
    resizeObserver.observe(innerRef);
    window.addEventListener("resize", func);
    func();
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", func);
    };
  }, [innerRef]);

  const accountData = useAccount();
  const apiData = useApiState();

  useEffect(() => {
    if (selectedTab.needsConnected && !accountData.isConnected)
      setSelectedTabKey("buy");
  }, [accountData.isConnected, selectedTab]);

  return (
    <Loader loading={apiData.stageLoading || apiData.paymentTokensLoading}>
      <div
        className="flex flex-col w-full max-w-md bg-[#002286] rounded-xl border border-[#fff] text-[#fff] overflow-y-clip font-normal"
        style={
          {
            height: "50.5rem",
            maxHeight: "50.5rem",
            transition: "height 200ms ease-out",
            "--text-secondary": "#aaa",
            "--border": "#fff",
          } as CSSProperties
        }
      >
        <div
          className="flex flex-col gap-3 flex-shrink-0 p-4 max-sm:p-3 justify-between flex-1 h-0"
          ref={setInnerRef}
        >
          <div className="flex gap-2 flex-shrink-0 border border-[#fff] rounded-full p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const disabled = tab.needsConnected && !accountData.isConnected;
              return (
                <button
                  disabled={disabled}
                  title={disabled ? t("connectWallet") : undefined}
                  className={clsx(
                    "flex gap-1 items-center justify-center rounded-full flex-1 hover:bg-[rgba(0,0,0,0.1)] transition-colors font-normal px-2 max-sm:text-sm h-8 max-sm:h-[1.75rem]",
                    {
                      "!bg-[#007BF9] text-[#fff]": selectedTab.key === tab.key,
                      "!bg-[rgba(255,255,255,0.4)] text-[#444] cursor-not-allowed":
                        disabled,
                    }
                  )}
                  key={tab.key}
                  onClick={() => setSelectedTabKey(tab.key)}
                >
                  <Icon className="w-[1.25em] h-[1.25em]" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <Component />
        </div>
      </div>
    </Loader>
  );
};

export default Widget;
