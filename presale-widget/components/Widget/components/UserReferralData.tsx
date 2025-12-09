import { useUserState } from "../../../presale-gg/stores";
import { copyText } from "../../../presale-gg/util";
import { useTranslations } from "next-intl";

const UserReferralData = () => {
  const t = useTranslations("widget.referral");
  const userData = useUserState();
  const referralLink = `${window.origin}${
    window.location.pathname
  }?referral_code=${userData.user?.referral_code ?? ""}`;

  return (
    <>
      {[
        { label: t("yourReferralLink"), value: referralLink },
        {
          label: t("yourReferralCode"),
          value: userData.user?.referral_code ?? "",
        },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 pt-1 pb-[0.125rem]"
        >
          <div className="flex flex-col flex-1">
            <p className="text-xs text-[var(--text-secondary)] leading-[1]">
              {label}
            </p>
            <input
              size={1}
              className="flex-1 outline-none bg-[transparent]"
              placeholder="0"
              value={value}
              readOnly
            />
          </div>
          <button
            className={
              "bg-[#007BF9] text-[#fff] text-xs px-2 leading-[1] rounded-md hover:brightness-125 w-[3.75rem] h-8 text-center flex items-center justify-center self-center -mt-[0.125rem]"
            }
            onClick={() => copyText(value)}
          >
            {t("copy")}
          </button>
        </div>
      ))}
    </>
  );
};

export default UserReferralData;
