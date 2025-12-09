import {
  useApiState,
  userStakeTokens,
  userUnstakeTokens,
  useUserState,
} from "../../../presale-gg/stores";
import {
  formatDollar,
  formatLargeNumber,
  parseNum,
  partialNumRegexp,
} from "../../../presale-gg/util";
import Input from "../components/Input";
import { useState } from "react";
import { Button } from "../../ui/button";
import Spinner from "../components/Spinner";
import { toast } from "sonner";
import { api } from "../../../presale-gg/api";
import { useTranslations } from "next-intl";

const StakeTab = () => {
  const t = useTranslations("widget.stake");
  const userData = useUserState();
  const [tokensStr, setTokensStr] = useState("0");
  const [stakeLoading, setStakeLoading] = useState(false);
  const [unstakeLoading, setUnstakeLoading] = useState(false);

  const stake = async () => {
    if (stakeLoading || unstakeLoading) return;
    if (!tokensStr || tokensStr === "0") return toast.error(t("invalidAmount"));
    setStakeLoading(true);
    try {
      await userStakeTokens(tokensStr);
      toast.success(t("successfullyStaked"));
    } catch (err) {
      toast.error(api.getApiErrorMessage(err, t("errorStaking")));
    }
    setStakeLoading(false);
  };

  const unstake = async () => {
    if (stakeLoading || unstakeLoading) return;
    if (!tokensStr || tokensStr === "0") return toast.error(t("invalidAmount"));
    setUnstakeLoading(true);
    try {
      await userUnstakeTokens(tokensStr);
      toast.success(t("successfullyUnstaked"));
    } catch (err) {
      toast.error(api.getApiErrorMessage(err, t("errorUnstaking")));
    }
    setUnstakeLoading(false);
  };

  const apiData = useApiState();

  return (
    <div className="flex flex-col justify-between gap-4 max-h-[30rem] flex-1 my-auto">
      <div className="flex flex-col gap-2">
        {[
          {
            label: t("ownedTokens"),
            value: `${formatLargeNumber(
              parseNum(userData.user?.total_tokens)
            )} DOGEBALL ($${formatLargeNumber(
              parseNum(userData.user?.total_tokens) *
                parseNum(apiData.stage?.token_price)
            )})`,
          },
          {
            label: t("currentlyStaked"),
            value: `${formatLargeNumber(
              parseNum(userData.userStakeData?.total_staked)
            )} $DOGEBALL`,
          },
          {
            label: t("dailyInterest"),
            value: `${formatLargeNumber(
              parseNum(userData.userStakeData?.daily_interest)
            )} $DOGEBALL`,
          },
          {
            label: t("totalEarnings"),
            value: `${formatLargeNumber(
              parseNum(userData.userStakeData?.total_earnings)
            )} $DOGEBALL ($${formatLargeNumber(
              parseNum(userData.userStakeData?.total_earnings) *
                parseNum(apiData.stage?.token_price)
            )})`,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-[rgba(255,255,255,0.15)] p-2 rounded-md flex flex-col text-center"
          >
            <p className="">{value}</p>
            <p className="text-xs text-[var(--text-secondary)]">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 justify-between leading-[1] text-sm">
          <p>{t("availableToStake")}</p>
          <p>
            {formatLargeNumber(
              parseNum(userData.userStakeData?.total_can_stake)
            )}{" "}
            $DOGEBALL
          </p>
        </div>
        <Input
          placeholder="0"
          value={tokensStr}
          onFocus={(e) => {
            if (e.currentTarget.value === "0") {
              e.currentTarget.value = "";
              setTokensStr("");
            }
          }}
          onBlur={(e) => {
            if (e.currentTarget.value === "") {
              e.currentTarget.value = "0";
              setTokensStr("0");
            }
          }}
          onInput={(e) => {
            let val = e.currentTarget.value;
            if (!partialNumRegexp.test(val)) {
              val = tokensStr;
            }
            e.currentTarget.value = val;
            setTokensStr(val);
          }}
        />
        <div className="flex gap-2 justify-between">
          <button
            className="bg-[#007BF9] text-[#fff] leading-[1] text-xs py-1 px-[0.375rem] rounded-sm flex items-center justify-center"
            onClick={() =>
              setTokensStr(userData.userStakeData?.total_can_stake ?? "0")
            }
          >
            {t("maxStake")} (
            {formatLargeNumber(
              parseNum(userData.userStakeData?.total_can_stake)
            )}
            )
          </button>
          <button
            className="bg-[#007BF9] text-[#fff] leading-[1] text-xs py-1 px-[0.375rem] rounded-sm flex items-center justify-center"
            onClick={() =>
              setTokensStr(userData.userStakeData?.total_staked ?? "0")
            }
          >
            {t("maxUnstake")} (
            {formatLargeNumber(parseNum(userData.userStakeData?.total_staked))})
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={stake} className="flex-1">
          {stakeLoading ? <Spinner size={5} /> : t("stake")}
        </Button>
        <Button onClick={unstake} className="flex-1">
          {unstakeLoading ? <Spinner size={5} /> : t("unstake")}
        </Button>
      </div>
    </div>
  );
};

export default StakeTab;
