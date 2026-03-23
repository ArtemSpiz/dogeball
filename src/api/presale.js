/**
 * Presale API Module
 * All API calls for the presale functionality
 */

import axios from "axios";

const BASE_URL = "https://api.presale.gg/v1";
const PROJECT = "dball";

/**
 * Base API fetch function
 * @param {string} url
 * @param {AxiosRequestConfig} [data={}]
 * @returns {Promise<AxiosResponse<unknown>>}
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
 * @typedef {object} UtmArgs
 * @property {string} [referrer]
 * @property {string} [utm_source]
 * @property {string} [utm_medium]
 * @property {string} [utm_campaign]
 * @property {string} [utm_content]
 * @property {string} [utm_term]
 */

/**
 * Get UTM args from URL
 * @returns {UtmArgs}
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
 * Post leads (email signup)*
 * @param {object} args
 * @param {string} args.email
 * @param {string} args.name
 * @param {string} [args.wallet_address]
 * @param {string} [args.mobile]
 * @returns {Promise<AxiosResponse<void>>}
 */
export const postLeads = async ({ email, name, wallet_address, mobile }) => {
  return apiFetch(`/projects/${PROJECT}/leads`, {
    method: "POST",
    data: { email, name, wallet_address, mobile },
  });
};

/**
 * Get current active stage
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.Stage | null>>}
 */
export const getActiveStage = () => {
  return apiFetch(`/projects/${PROJECT}/stages/current`);
};

/**
 * Get payment tokens (prices)
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.PaymentToken[]>>}
 */
export const getPrices = () => {
  return apiFetch(`/projects/${PROJECT}/payment-tokens`);
};

/**
 * Get project info
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.Info>>}
 */
export const getProjectInfo = () => {
  return apiFetch(`/projects/${PROJECT}/info`);
};

/**
 * Get user by wallet address
 * @param {string} address
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.User>>}
 */
export const getUser = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}`);
};

/**
 * Get SIWE message for signing
 * @param {string} address
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.SweResponse>>}
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
 * @typedef {object} SiweReturn
 * @property {import("./api.types.d.ts").API.Token}
 */

/**
 * Verify SIWE message signature
 * @param {string} address
 * @param {string} message
 * @param {string} signature
 * @returns {Promise<AxiosResponse<SiweReturn>>}
 */
export const verifySiweMessage = (address, message, signature) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/siwe/verify`, {
    method: "POST",
    data: { message, signature },
  });
};

/**
 * Create NowPayments transaction
 * @param {object} args
 * @param {string} args.wallet_address
 * @param {number} args.payment_token_id
 * @param {string} args.usd_amount
 * @param {string} args.token_amount
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.Transaction>>}
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
 * @param {object} args
 * @param {string} args.wallet_address
 * @param {number} args.payment_token_id
 * @param {string} args.usd_amount
 * @param {string} args.token_amount
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.Transaction>>}
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
 * @param {string} address
 * @param {string} transactionHash
 * @returns {Promise<AxiosResponse<null>>}
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
 * @param {string} project
 * @param {string} address
 * @param {number} page
 * @param {number} [limit=12]
 * @returns {Promise<AxiosResponse<import("./api.types").API.TransactionHistoryItemV2[]>>}
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
 * Get referral leaderboard (top 30)
 * @param {object} [options]
 * @param {boolean} [options.showAllTime] If true, all-time; if false, monthly; if omitted, API default (monthly)
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.LeaderboardEntry[]>>}
 */
export const getLeaderboard = (options = {}) => {
  const params = {};
  if (options.showAllTime !== undefined) {
    params.show_all_time = options.showAllTime;
  }
  return apiFetch(`/projects/${PROJECT}/leaderboard`, {
    params: Object.keys(params).length ? params : undefined,
  });
};

/**
 * Get a single wallet's referral leaderboard entry
 * @param {string} address
 * @param {object} [options]
 * @param {boolean} [options.showAllTime] Must match {@link getLeaderboard} for the same period
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.LeaderboardEntry | import("./api.types.d.ts").API.LeaderboardEntry[]>>}
 */
export const getUserLeaderboardRank = (address, options = {}) => {
  return apiFetch(`/projects/${PROJECT}/leaderboard`, {
    params: {
      wallet_address: address,
      show_all_time:
        options.showAllTime !== undefined ? options.showAllTime : true,
    },
  });
};

/**
 * Get stake data
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.StakeData>>}
 */
export const getStakeData = () => {
  return apiFetch(`/projects/${PROJECT}/stakes`);
};

/**
 * Get user stake data
 * @param {string} address
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.StakeData>>}
 */
export const getUserStakeData = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/stakes`);
};

/**
 * Stake tokens
 * @param {string} address
 * @param {string} numTokens
 * @param {string} accessToken
 * @returns {Promise<AxiosResponse<void>>}
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
 * @param {string} address
 * @param {string} numTokens
 * @param {string} accessToken
 * @returns {Promise<AxiosResponse<void>>}
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
 * @param {string} address
 * @param {string} code
 * @param {string} accessToken
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.BonusCode>>}
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
 * @param {string} token
 * @param {string} address
 * @param {string} referralCode
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.User>>}
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
 * @param {string} token
 * @param {string} address
 * @param {string} referralCode
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.User>>}
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
 * @param {string} address
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.UserRankData>>}
 */
export const getUserRanks = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/levels`);
};

/**
 * Level up user
 * @param {string} address
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.UserRankData>>}
 */
export const levelUpUser = (address) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${address}/levels`, {
    method: "POST",
  });
};

/**
 * Get referral bonuses
 * @param {string} walletAddress
 * @returns {Promise<AxiosResponse<import("./api.types.d.ts").API.BonusCode>>}
 */
export const getReferralBonuses = (walletAddress) => {
  return apiFetch(`/projects/${PROJECT}/wallet/${walletAddress}/referrals/bonuses`);
};

/**
 * Extract error message from API error
 * @param {unknown} e
 * @param {string} [defaultMsg]
 * @returns {string}
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
  getApiErrorMessage,
};

