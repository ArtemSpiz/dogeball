/**
 * Faucet API Module
 * API calls for the faucet functionality
 */

import axios from "axios";

// Get server URL from environment variable or use default
const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

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
