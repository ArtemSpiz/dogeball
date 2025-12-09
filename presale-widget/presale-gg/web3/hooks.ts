import { getAccount, watchAccount } from "@wagmi/core";
import { wagmiAdapter } from "../../config";
import { useEffect, useState } from "react";

export type GetAccountReturnType = {
  address: string | undefined;
  addresses: readonly string[] | undefined;
  chainId: number | undefined;
  isConnected: boolean;
};

export const useAccount = (): GetAccountReturnType => {
  const [accountData, setAccountData] = useState<GetAccountReturnType>({
    address: undefined,
    addresses: [],
    chainId: undefined,
    isConnected: false,
  });
  useEffect(() => {
    if (!wagmiAdapter) return;
    const config = wagmiAdapter.wagmiConfig;
    if (config) {
      const accountData = getAccount(config);
      setAccountData({
        address: accountData.address,
        addresses: accountData.addresses,
        chainId: accountData.chainId,
        isConnected: accountData.isConnected,
      });
    }

    let unwatch = watchAccount(config, {
      onChange: (account) => {
        setAccountData(account);
      },
    });

    return () => {
      unwatch();
    };
  }, []);
  return accountData;
};
