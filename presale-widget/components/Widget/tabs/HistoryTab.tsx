import TransactionHistoryList from "../components/TransactionHistoryList";
import UserReferralData from "../components/UserReferralData";
import { useTranslations } from "next-intl";

const HistoryTab = () => {
  const t = useTranslations("widget.history");
  return (
    <>
      <UserReferralData />
      <div
        className="bg-[rgba(255,255,255,0.15)] p-2 rounded-md flex flex-col gap-2 flex-1 h-0"
        style={{ colorScheme: "dark" }}
      >
        <p className="font-bold text-lg leading-[1.2]">
          {t("yourTransactions")}
        </p>
        <TransactionHistoryList />
      </div>
    </>
  );
};

export default HistoryTab;
