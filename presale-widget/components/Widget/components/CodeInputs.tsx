import {
  resetUserBonusCode,
  userApplyBonusCode,
  userResetReferralCode,
  userUpdateReferralCode,
  useUserState,
} from "../../../presale-gg/stores";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "sonner";
import { api } from "../../../presale-gg/api";
import { useTranslations } from "next-intl";

export type CodeInputProps = React.HTMLAttributes<HTMLDivElement> & {
  appliedText: string | null;
  onApply: (code: string) => Promise<void>;
  onChange: () => void;
  label: string;
  urlKey: string;
};

let scrolled = false;

const CodeInput: React.FC<CodeInputProps> = ({
  appliedText,
  onApply,
  onChange,
  label,
  urlKey,
  ...others
}) => {
  const t = useTranslations("widget.codes");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [hasDefault, setHasDefault] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef || hasDefault) return;
    const urlValue = new URLSearchParams(window.location.search).get(urlKey);
    if (!urlValue) return;
    setHasDefault(true);
    setCode(urlValue);
    if (scrolled) return;
    scrolled = true;
    setTimeout(() => {
      containerRef.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 500);
  }, [urlKey, containerRef, hasDefault]);

  const apply = async () => {
    if (!code) return toast.error(t("codeInvalid"));
    setLoading(true);
    try {
      await onApply(code);
      toast.success(t("successfullyApplied"));
    } catch (err) {
      toast.error(api.getApiErrorMessage(err, t("errorApplying")));
    }
    setLoading(false);
  };

  return (
    <div
      {...others}
      className={clsx(
        "flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 py-[0.125rem] items-center",
        others.className
      )}
      ref={setContainerRef}
    >
      {appliedText ? (
        <p className="text-[#25a140] flex-1 leading-[1.2]">{appliedText}</p>
      ) : (
        <input
          className="flex-1 !outline-none self-stretch min-w-0 bg-transparent placeholder:text-[var(--text-secondary)] placeholder:opacity-100"
          size={1}
          placeholder={label}
          value={code}
          onInput={(e) => setCode(e.currentTarget.value)}
        />
      )}
      <button
        className={clsx(
          "bg-[#007BF9] text-[#fff] px-2 leading-[1] rounded-md hover:brightness-125 w-[4.375rem] h-8 text-center flex items-center justify-center",
          {
            "animate-pulse": hasDefault,
          }
        )}
        style={{ animationIterationCount: 4 }}
        onClick={() => {
          if (appliedText) onChange?.();
          else apply();
        }}
      >
        {loading ? (
          <Spinner size={4} />
        ) : appliedText ? (
          t("change")
        ) : (
          t("apply")
        )}
      </button>
    </div>
  );
};

export const BonusCodeInput = () => {
  const t = useTranslations("widget.codes");
  const userData = useUserState();

  return (
    <CodeInput
      appliedText={
        userData.appliedBonusCode ? userData.appliedBonusCode.message : null
      }
      label={t("bonusCodePlaceholder")}
      onApply={userApplyBonusCode}
      onChange={resetUserBonusCode}
      urlKey="bonus_code"
    />
  );
};

export const ReferralCodeInput = () => {
  const t = useTranslations("widget.codes");
  const userData = useUserState();

  return (
    <CodeInput
      appliedText={userData.user?.referred_by ? t("appliedReferral") : null}
      label={t("referralCodePlaceholder")}
      onApply={userUpdateReferralCode}
      onChange={userResetReferralCode}
      urlKey="referral_code"
    />
  );
};

const CodeInputs = () => {
  return (
    <>
      <BonusCodeInput />
      <ReferralCodeInput />
    </>
  );
};

export default CodeInputs;
