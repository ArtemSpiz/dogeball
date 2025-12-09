/**
 * Presale API Module
 * All API calls for the presale functionality
 */

import axios from "axios";

const BASE_URL = "https://api.presale.gg/v1";
const PROJECT = "dball";

/**
 * Base API fetch function
 */
export const apiFetch = async (url, options = {}) => {
  const res = await axios({
    url,
    baseURL: BASE_URL,
    ...options,
  });
  return res;
};

/**
 * Get UTM args from URL
 */
export const getUtmArgs = () => {
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

/**
 * Post leads (email signup)
 */
export const postLeads = async ({ email, name, wallet_address, mobile }) => {
  return apiFetch(`/projects/${PROJECT}/leads`, {
    method: "POST",
    data: { email, name, wallet_address, mobile },
  });
};

/**
 * Get current active stage
 */
export const getActiveStage = () => {
  return apiFetch(`/projects/${PROJECT}/stages/current`);
};

/**
 * Get payment tokens (prices)
 */
export const getPrices = () => {
  return apiFetch(`/projects/${PROJECT}/payment-tokens`);
};

/**
 * Get project info
 */
export const getProjectInfo = () => {
  return apiFetch(`/projects/${PROJECT}/info`);
};

/**
 * Get user by wallet address
 */
export const getUser = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}`);
};

/**
 * Get SIWE message for signing
 */
export const getSiweMessage = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/siwe/message`, {
    method: "POST",
    data: {
      domain: window.location.hostname,
      uri: window.location.href,
    },
  });
};

/**
 * Verify SIWE message signature
 */
export const verifySiweMessage = (address, message, signature) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/siwe/verify`, {
    method: "POST",
    data: { message, signature },
  });
};

/**
 * Create NowPayments transaction
 */
export const createTransaction = ({
  wallet_address,
  payment_token_id,
  usd_amount,
  token_amount,
}) => {
  return apiFetch(
    `/projects/${PROJECT}/wallet/${wallet_address}/transactions/nowpayments`,
    {
      method: "POST",
      data: {
        payment_token_id,
        usd_amount,
        token_amount,
        ...getUtmArgs(),
      },
    }
  );
};

/**
 * Create card transaction (Wert)
 */
export const createCardTransaction = ({ wallet_address, usd_amount }) => {
  return apiFetch(
    `/projects/${PROJECT}/wallet/${wallet_address}/transactions/card`,
    {
      method: "POST",
      data: {
        usd_amount,
        ...getUtmArgs(),
      },
    }
  );
};

/**
 * Create transaction metadata (for wallet transfers)
 */
export const createTransactionMetadata = (address, transactionHash) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/transactions/metadata`, {
    method: "POST",
    data: {
      transaction_hash: transactionHash,
      ...getUtmArgs(),
    },
  });
};

/**
 * Get transaction history v2
 */
export const getTransactionHistoryV2 = (address, page = 0, limit = 12) => {
  return apiFetch(
    `${BASE_URL.replace("/v1", "/v2")}/projects/${PROJECT}/wallets/${address}/transactions`,
    {
      params: { page, limit },
    }
  );
};

/**
 * Get bonus transaction history
 */
export const getBonusTransactionHistory = (address, page = 0, limit = 12) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/bonus-transactions`, {
    params: { page, limit },
  });
};

/**
 * Get leaderboard
 */
export const getLeaderboard = () => {
  return apiFetch(`/projects/${PROJECT}/leaderboard`);
};

/**
 * Get user leaderboard rank
 */
export const getUserLeaderboardRank = (address) => {
  return apiFetch(`/projects/${PROJECT}/leaderboard`, {
    params: { wallet_address: address, show_all_time: true },
  });
};

/**
 * Get stake data
 */
export const getStakeData = () => {
  return apiFetch(`/projects/${PROJECT}/stakes`);
};

/**
 * Get user stake data
 */
export const getUserStakeData = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/stakes`);
};

/**
 * Stake tokens
 */
export const stakeTokens = (address, numTokens, accessToken) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/stakes`, {
    method: "POST",
    data: { tokens: numTokens },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Unstake tokens
 */
export const unstakeTokens = (address, numTokens, accessToken) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/unstake`, {
    method: "POST",
    data: { tokens: numTokens },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Apply bonus code
 */
export const applyBonusCode = (address, code, accessToken) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/bonus-codes/${code}/apply`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Update referral code
 */
export const updateReferralCode = (token, address, referralCode) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}`, {
    method: "PATCH",
    data: { referral_code: referralCode },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Update claim address
 */
export const updateClaimAddress = (walletAddress, newClaimAddress, accessToken) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${walletAddress}/claim-address`, {
    method: "PATCH",
    data: { claim_wallet_address: newClaimAddress },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Get user ranks
 */
export const getUserRanks = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/levels`);
};

/**
 * Level up user
 */
export const levelUpUser = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/levels`, {
    method: "POST",
  });
};

/**
 * Get referral bonuses
 */
export const getReferralBonuses = (walletAddress) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${walletAddress}/referrals/bonuses`);
};

/**
 * Get banners
 */
export const getBanners = () => {
  return apiFetch(`/projects/${PROJECT}/banners`);
};

/**
 * Get banner image source URL
 */
export const getBannerImageSrc = (url) => {
  return `${BASE_URL}${url}`;
};

/**
 * Extract error message from API error
 */
export const getApiErrorMessage = (e, defaultMsg = "Internal server error") => {
  if (e?.response?.data) {
    return getApiErrorMessage(e.response.data, defaultMsg);
  }
  if (typeof e === "object" && e) {
    if ("shortMessage" in e && typeof e.shortMessage === "string") {
      return e.shortMessage;
    }
    if ("message" in e && typeof e.message === "string") {
      const errors = e.message.split(" | ");
      const error = errors[0];
      if (typeof error === "string" && !error.includes("Message: ")) {
        if (error.includes("Details: ")) {
          return error.split("Details: ")[1].split("\n")[0];
        }
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
  }
  return defaultMsg;
};

export default {
  apiFetch,
  getUtmArgs,
  postLeads,
  getActiveStage,
  getPrices,
  getProjectInfo,
  getUser,
  getSiweMessage,
  verifySiweMessage,
  createTransaction,
  createCardTransaction,
  createTransactionMetadata,
  getTransactionHistoryV2,
  getBonusTransactionHistory,
  getLeaderboard,
  getUserLeaderboardRank,
  getStakeData,
  getUserStakeData,
  stakeTokens,
  unstakeTokens,
  applyBonusCode,
  updateReferralCode,
  updateClaimAddress,
  getUserRanks,
  levelUpUser,
  getReferralBonuses,
  getBanners,
  getBannerImageSrc,
  getApiErrorMessage,
};

