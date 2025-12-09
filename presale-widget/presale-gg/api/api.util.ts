import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { API } from "./api.types";

const baseUrl = "https://api.presale.gg/v1";
const project = "dball";

export const apiFetch = async <T>(
  url: string,
  data: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
  const res = await axios({
    url,
    baseURL: baseUrl,
    ...data,
  });
  return res;
};

export const postLeads = async (args: {
  email: string;
  name?: string;
  wallet_address?: string;
  mobile?: string;
}) => {
  return apiFetch<void>(`/projects/${project}/leads`, {
    method: "POST",
    data: args,
  });
};

export const getActiveStage = () => {
  return apiFetch<API.Stage | null>(`/projects/${project}/stages/current`);
};

export const getPrices = () => {
  return apiFetch<API.PaymentToken[]>(`/projects/${project}/payment-tokens`);
};

export const getUser = (address: string) => {
  return apiFetch<API.User>(`/projects/${project}/wallet/${address}`);
};

export const getProjectInfo = () => {
  return apiFetch<API.Info>(`/projects/${project}/info`);
};

export const getSiweMessage = (address: string) => {
  return apiFetch<API.SweResponse>(
    `/projects/${project}/wallet/${address}/siwe/message`,
    {
      method: "POST",
      data: {
        domain: window.location.hostname,
        uri: window.location.href,
      },
    }
  );
};

export const verifySiweMessage = (
  address: string,
  message: string,
  signature: string
) => {
  return apiFetch<{ access: API.Token }>(
    `/projects/${project}/wallet/${address}/siwe/verify`,
    {
      method: "POST",
      data: {
        message,
        signature,
      },
    }
  );
};

export type UtmArgs = {
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export const getUtmArgs = (): UtmArgs => {
  const url = new URL(window.location.href);
  return {
    referrer: document.referrer || undefined,
    utm_source: url.searchParams.get("utm_source") ?? undefined,
    utm_medium: url.searchParams.get("utm_medium") ?? undefined,
    utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
    utm_content: url.searchParams.get("utm_content") ?? undefined,
    utm_term: url.searchParams.get("utm_term") ?? undefined,
  };
};

export const createTransaction = (args: {
  wallet_address: string;
  payment_token_id: number;
  usd_amount: string;
  token_amount: string;
}) => {
  return apiFetch<API.Transaction>(
    `/projects/${project}/wallet/${args.wallet_address}/transactions/nowpayments`,
    {
      method: "POST",
      data: {
        payment_token_id: args.payment_token_id,
        usd_amount: args.usd_amount,
        token_amount: args.token_amount,
        ...getUtmArgs(),
      },
    }
  );
};

export const createCardTransaction = (args: {
  wallet_address: string;
  usd_amount: number;
}) => {
  return apiFetch<API.CardTransaction>(
    `/projects/${project}/wallet/${args.wallet_address}/transactions/card`,
    {
      method: "POST",
      data: {
        usd_amount: args.usd_amount,
        ...getUtmArgs(),
      },
    }
  );
};

export const getBonusTransactionHistory = (
  address: string,
  page: number,
  limit = 12
) => {
  return apiFetch<API.BonusTransactionHistoryItem[]>(
    `/projects/${project}/wallet/${address}/bonus-transactions`,
    {
      params: {
        page,
        limit,
      },
    }
  );
};

export const createTransactionMetadata = (
  address: string,
  transactionHash: string
) => {
  return apiFetch<null>(
    `/projects/${project}/wallet/${address}/transactions/metadata`,
    {
      method: "POST",
      data: {
        transaction_hash: transactionHash,
        ...getUtmArgs(),
      },
    }
  );
};

export const getLeaderboard = () => {
  return apiFetch<API.LeaderboardEntry[]>(`/projects/${project}/leaderboard`);
};

export const getUserLeaderboardRank = (address: string) => {
  return apiFetch<API.LeaderboardEntry>(`/projects/${project}/leaderboard`, {
    params: { wallet_address: address, show_all_time: true },
  });
};

export const updateReferralCode = (
  token: string,
  address: string,
  referralCode: string
) => {
  return apiFetch<API.User>(`/projects/${project}/wallet/${address}`, {
    method: "PATCH",
    data: { referral_code: referralCode },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStakeData = () => {
  return apiFetch<API.StakeData>(`/projects/${project}/stakes`);
};

export const getUserStakeData = (address: string) => {
  return apiFetch<API.UserStakeData>(
    `/projects/${project}/wallet/${address}/stakes`
  );
};

export const stakeTokens = (
  address: string,
  numTokens: string,
  accessToken: string
) => {
  return apiFetch<void>(`/projects/${project}/wallet/${address}/stakes`, {
    method: "POST",
    data: { tokens: numTokens },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const unstakeTokens = (
  address: string,
  numTokens: string,
  accessToken: string
) => {
  return apiFetch<void>(`/projects/${project}/wallet/${address}/unstake`, {
    method: "POST",
    data: { tokens: numTokens },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const applyBonusCode = (
  address: string,
  code: string,
  accessToken: string
) => {
  return apiFetch<API.BonusCode>(
    `/projects/${project}/wallet/${address}/bonus-codes/${code}/apply`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getUserRanks = (address: string) => {
  return apiFetch<API.UserRankData>(
    `/projects/${project}/wallet/${address}/levels`
  );
};

export const levelUpUser = (address: string) => {
  return apiFetch<API.UserRankData>(
    `/projects/${project}/wallet/${address}/levels`,
    {
      method: "POST",
    }
  );
};

export const getReferralBonuses = (walletAddress: string) => {
  return apiFetch<API.ReferralBonuses>(
    `/projects/${project}/wallet/${walletAddress}/referrals/bonuses`
  );
};

export const getBanners = () => {
  return apiFetch<API.Banner[]>(`/projects/${project}/banners`);
};

export const getBannerImageSrc = (url: string) => {
  return `${baseUrl}${url}`;
};

export const updateClaimAddress = (
  walletAddress: string,
  newClaimAddress: string,
  accessToken: string
) => {
  return apiFetch<void>(
    `/projects/${project}/wallet/${walletAddress}/claim-address`,
    {
      method: "PATCH",
      data: { claim_wallet_address: newClaimAddress },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getTransactionHistoryV2 = (
  address: string,
  page: number,
  limit = 12
) => {
  return apiFetch<API.TransactionHistoryItemV2[]>(
    `${baseUrl.replace(
      "/v1",
      "/v2"
    )}/projects/${project}/wallets/${address}/transactions`,
    {
      params: {
        page,
        limit,
      },
    }
  );
};

export const getApiErrorMessage = (e: unknown, defaultMsg?: string): string => {
  if (e instanceof AxiosError)
    return getApiErrorMessage(e.response?.data, defaultMsg);
  if (
    typeof e === "object" &&
    e &&
    "shortMessage" in e &&
    typeof e.shortMessage === "string"
  ) {
    return e.shortMessage;
  }
  if (
    typeof e === "object" &&
    e &&
    "message" in e &&
    typeof e.message === "string"
  ) {
    const errors = e.message.split(" | ");
    const error = errors[0];
    if (typeof error === "string" && !error.includes("Message: ")) {
      if (error.includes("Details: "))
        return error.split("Details: ")[1].split("\n")[0];
      return error;
    }
    const msg = error.split("Message: ")[1] ?? defaultMsg;
    let path = (error.split("Path: ")[1] ?? "").split(" ~ ")[0];
    path = path.split("body.")[1] ?? path;
    path = path
      .split("_")
      .map((str) => (str ? str[0].toUpperCase() + str.slice(1) : ""))
      .join(" ");

    if (path) return `${path} - ${msg}`;
    return msg ?? defaultMsg;
  }
  return defaultMsg ?? "Internal server error";
};
