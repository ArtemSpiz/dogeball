import dotenv from "dotenv";

dotenv.config();

// Contract configuration
export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0x02e4120a072a8a96fFC974783CAFcAc55cE5eF3F";
export const RPC_URL = process.env.RPC_URL || "http://45.76.250.9:10002";
export const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is required");
}
