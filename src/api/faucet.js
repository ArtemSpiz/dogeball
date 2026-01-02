/**
 * Faucet API Module
 * API calls for the faucet functionality
 */

import axios from "axios";

// Faucet API base URL
const BASE_URL = "https://dogeball-faucet.vercel.app";

/**
 * Claim tokens from faucet
 */
export const claimFaucetTokens = async ({ receiver, amount }) => {
  const res = await axios({
    url: "/api/faucet/claim",
    baseURL: BASE_URL,
    method: "POST",
    data: {
      receiver,
      amount,
    },
  });
  return res.data;
};

export default {
  claimFaucetTokens,
};
