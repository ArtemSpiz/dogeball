import { ethers } from "ethers";
import { CONTRACT_ADDRESS, RPC_URL, PRIVATE_KEY } from "../config/contract.js";
import { FAUCET_ABI } from "../config/abi.js";

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Initialize contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, FAUCET_ABI, wallet);

/**
 * Claim tokens from the faucet
 * @param {string} receiver - Address to receive tokens
 * @param {string} amount - Amount in wei (optional, will use contract's default if not provided)
 * @returns {Promise<Object>} Transaction result
 */
export async function claimTokens(receiver, amount = null) {
  try {
    // If amount is not provided, get the default amount per claim from contract
    let claimAmount = amount;
    if (!claimAmount) {
      claimAmount = await contract.amountPerClaim();
    } else {
      // Convert to BigNumber if it's a string
      claimAmount = ethers.parseEther(amount.toString());
    }

    // Check if receiver can claim (cooldown check)
    const lastClaim = await contract.lastClaim(receiver);
    const cooldownSeconds = await contract.cooldownSeconds();
    const currentTime = Math.floor(Date.now() / 1000);
    const timeSinceLastClaim = currentTime - Number(lastClaim);

    if (timeSinceLastClaim < Number(cooldownSeconds) && Number(lastClaim) > 0) {
      const remainingCooldown = Number(cooldownSeconds) - timeSinceLastClaim;
      throw new Error(
        `Cooldown active. Please wait ${remainingCooldown} seconds before claiming again.`
      );
    }

    // Check contract balance
    const contractBalance = await provider.getBalance(CONTRACT_ADDRESS);
    if (contractBalance < claimAmount) {
      throw new Error("Faucet has insufficient balance");
    }

    // Call the claim function
    const tx = await contract.claim(receiver, claimAmount);

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return {
      transactionHash: receipt.hash,
      receiver: receiver,
      amount: claimAmount.toString(),
      blockNumber: receipt.blockNumber,
    };
  } catch (error) {
    // Re-throw with more context
    if (error.reason) {
      throw new Error(error.reason);
    }
    throw error;
  }
}

/**
 * Get faucet information
 * @returns {Promise<Object>} Faucet info
 */
export async function getFaucetInfo() {
  try {
    const amountPerClaim = await contract.amountPerClaim();
    const cooldownSeconds = await contract.cooldownSeconds();
    const contractBalance = await provider.getBalance(CONTRACT_ADDRESS);
    const owner = await contract.owner();

    return {
      contractAddress: CONTRACT_ADDRESS,
      amountPerClaim: amountPerClaim.toString(),
      amountPerClaimFormatted: ethers.formatEther(amountPerClaim),
      cooldownSeconds: cooldownSeconds.toString(),
      contractBalance: contractBalance.toString(),
      contractBalanceFormatted: ethers.formatEther(contractBalance),
      owner: owner,
    };
  } catch (error) {
    throw new Error(`Failed to get faucet info: ${error.message}`);
  }
}

/**
 * Check claim status for an address
 * @param {string} address - Address to check
 * @returns {Promise<Object>} Claim status
 */
export async function checkClaimStatus(address) {
  try {
    const lastClaim = await contract.lastClaim(address);
    const cooldownSeconds = await contract.cooldownSeconds();
    const amountPerClaim = await contract.amountPerClaim();
    const currentTime = Math.floor(Date.now() / 1000);
    const timeSinceLastClaim = currentTime - Number(lastClaim);
    const canClaim =
      timeSinceLastClaim >= Number(cooldownSeconds) || Number(lastClaim) === 0;
    const remainingCooldown = canClaim
      ? 0
      : Number(cooldownSeconds) - timeSinceLastClaim;

    return {
      address: address,
      canClaim: canClaim,
      lastClaimTimestamp: lastClaim.toString(),
      lastClaimDate:
        Number(lastClaim) > 0
          ? new Date(Number(lastClaim) * 1000).toISOString()
          : null,
      cooldownSeconds: cooldownSeconds.toString(),
      timeSinceLastClaim: timeSinceLastClaim,
      remainingCooldown: remainingCooldown,
      amountPerClaim: amountPerClaim.toString(),
      amountPerClaimFormatted: ethers.formatEther(amountPerClaim),
    };
  } catch (error) {
    throw new Error(`Failed to check claim status: ${error.message}`);
  }
}
