import { getAccount, signMessage, watchAccount } from "@wagmi/core";
import { map } from "nanostores";
import { toast } from "sonner";

import { API, api } from "../api";
import { useNanostore } from "../util";
import { wagmiAdapter } from "../../config";

export type UserStoreValue = {
  user: API.User | null;
  userStakeData: API.UserStakeData | null;
  token: API.Token | null;
  leaderboardRank: API.LeaderboardEntry | null;
  appliedBonusCode: API.BonusCode | null;
  rankData: API.UserRankData | null;
  referralBonuses: API.ReferralBonuses | null;
};

export const defaultUserState: UserStoreValue = {
  user: null,
  userStakeData: null,
  token: null,
  leaderboardRank: null,
  appliedBonusCode: null,
  rankData: null,
  referralBonuses: null,
};

export const $userState = map({ ...defaultUserState });
export const useUserState = () => useNanostore($userState, defaultUserState);

const getWagmiAdapter = () => {
  if (!wagmiAdapter) {
    throw new Error("wagmiAdapter not configured. Call setWagmiAdapter() from presale-widget/config first.");
  }
  return wagmiAdapter;
};

export const listenForUserFetching = () => {
  watchAccount(getWagmiAdapter().wagmiConfig, {
    onChange: (account) => {
      const address = account.address;
      if (!address) return $userState.set({ ...defaultUserState });
      api.getUser(address).then((res) => $userState.setKey("user", res.data));
      api
        .getUserStakeData(address)
        .then((res) => $userState.setKey("userStakeData", res.data));
    },
  });
};

export type FetchOptions = {
  noToast?: boolean;
};

export const getUserToken = async (
  options?: FetchOptions
): Promise<API.Token> => {
  const userData = $userState.get();
  if (
    userData.token &&
    new Date(userData.token.expires).getTime() >= Date.now()
  )
    return userData.token;
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const messageRes = await api.getSiweMessage(address);
  const promise = signMessage(getWagmiAdapter().wagmiConfig, {
    message: messageRes.data.message,
  });
  let signedMessage;
  if (options?.noToast) {
    signedMessage = await promise;
  } else {
    signedMessage = await toast
      .promise(promise, {
        loading: "Confirm the message signature in your wallet",
        success: "Successfully signed wallet message",
        error: (err) => api.getApiErrorMessage(err, "Error signing message"),
      })
      .unwrap()
      .catch(() => {
        throw new Error("Error confirming user");
      });
  }
  const validRes = await api.verifySiweMessage(
    address,
    messageRes.data.message,
    signedMessage
  );
  const token = validRes.data.access;
  $userState.setKey("token", token);
  return token;
};

export const refetchUserData = async (): Promise<void> => {
  if (!wagmiAdapter) throw new Error("wagmiAdapter not configured. Call setWagmiAdapter() first.");
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const res = await api.getUser(address);
  $userState.setKey("user", res.data);
};

export const refetchUserStakeData = async (): Promise<void> => {
  if (!wagmiAdapter) throw new Error("wagmiAdapter not configured. Call setWagmiAdapter() first.");
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const res = await api.getUserStakeData(address);
  $userState.setKey("userStakeData", res.data);
};

export const userStakeTokens = async (
  tokens: string | number,
  options?: FetchOptions
) => {
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const token = await getUserToken(options);
  await api.stakeTokens(address, tokens.toString(), token.token);
  await refetchUserStakeData();
};

export const userUnstakeTokens = async (
  tokens: string | number,
  options?: FetchOptions
): Promise<void> => {
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const token = await getUserToken(options);
  await api.unstakeTokens(address, tokens.toString(), token.token);
  await refetchUserStakeData();
};

export const userUpdateReferralCode = async (
  newCode: string,
  options?: FetchOptions
): Promise<void> => {
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const token = await getUserToken(options);
  await api.updateReferralCode(token.token, address, newCode);
  const res = await api.getUser(address);
  $userState.setKey("user", res.data);
};

export const userResetReferralCode = async (): Promise<void> => {
  const oldUser = $userState.get().user;
  if (!oldUser) return;
  $userState.setKey("user", {
    ...oldUser,
    referred_by: null,
  });
};

export const userUpdateClaimAddress = async (
  newClaimAddress: string,
  options?: FetchOptions
): Promise<void> => {
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const token = await getUserToken(options);
  await api.updateClaimAddress(address, newClaimAddress, token.token);
  const oldUser = $userState.get().user;
  if (!oldUser) return;
  $userState.setKey("user", {
    ...oldUser,
    claim_wallet_address: newClaimAddress,
  });
};

export const userApplyBonusCode = async (
  code: string,
  options?: FetchOptions
): Promise<void> => {
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) throw new Error("Please connect your wallet");
  const token = await getUserToken(options);
  const res = await api.applyBonusCode(address, code, token.token);
  $userState.setKey("appliedBonusCode", res.data);
};

export const userLevelUp = async () => {
  const { address, isConnected } = getAccount(getWagmiAdapter().wagmiConfig);
  if (!address || !isConnected) return;
  const res = await api.levelUpUser(address);
  $userState.setKey("rankData", res.data);
};

export const resetUserBonusCode = () => {
  return $userState.setKey("appliedBonusCode", null);
};
