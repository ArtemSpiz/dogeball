import { useApiState } from "../../../presale-gg/stores";
import { formatDollar, formatNumber, parseNum } from "../../../presale-gg/util";
import { useMemo } from "react";
import { Loadable } from "./Loader";
import { useTranslations } from "next-intl";

const StageBox = () => {
  const t = useTranslations("widget.stage");
  const apiData = useApiState();
  const stageFrac = useMemo(() => {
    return (
      parseNum(apiData.stage?.cumulative_usd_raised) /
      parseNum(apiData.stage?.next_stage_target_usd ?? 1)
    );
  }, [apiData.stage?.cumulative_usd_raised]);

  return (
    <div className="p-2 bg-[#4473C5] rounded-2xl flex flex-col gap-1 border border-[#007BF9]">
      <Loadable
        component="p"
        className="flex flex-col text-center text-2xl self-center font-bold"
      >
        {formatDollar(parseNum(apiData.stage?.cumulative_usd_raised))}
      </Loadable>
      <div className="flex flex-col">
        <Loadable component="p" className="text-xs">
          {Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
            parseNum(stageFrac * 100)
          )}
          % {t("untilPriceRise")}
        </Loadable>
        <div className="flex bg-[rgba(0,0,0,0.2)] rounded-full h-3">
          <div
            className="h-full bg-[#007BF9] rounded-full"
            style={{ flex: stageFrac }}
          />
        </div>
        <Loadable component="p" className="text-xs text-right self-end">
          {t("of")}{" "}
          {formatDollar(
            parseNum(apiData.stage?.next_stage_target_usd),
            true,
            0,
            0
          )}
        </Loadable>
      </div>
      <Loadable component="p" className="text-center self-center">
        {formatNumber(parseNum(apiData.info?.holders))} {t("participants")}
      </Loadable>
    </div>
  );
};

export default StageBox;
