import express from 'express';
import { claimTokens } from '../services/faucetService.js';

const router = express.Router();

/**
 * POST /api/faucet/claim
 * Claim tokens from the faucet
 * 
 * Body:
 * {
 *   "receiver": "0x...",  // Address to receive tokens
 *   "amount": "1000000000000000000"  // Amount in wei (optional, will use default if not provided)
 * }
 */
router.post('/claim', async (req, res) => {
  try {
    const { receiver, amount } = req.body;

    // Validate receiver address
    if (!receiver) {
      return res.status(400).json({
        error: 'Receiver address is required',
      });
    }

    // Basic address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(receiver)) {
      return res.status(400).json({
        error: 'Invalid receiver address format',
      });
    }

    // Call the faucet service
    const result = await claimTokens(receiver, amount);

    res.json({
      success: true,
      message: 'Tokens claimed successfully',
      transactionHash: result.transactionHash,
      receiver: result.receiver,
      amount: result.amount,
    });
  } catch (error) {
    console.error('Claim error:', error);
    
    // Handle specific error cases
    if (error.message.includes('cooldown')) {
      return res.status(429).json({
        error: 'Cooldown period active. Please wait before claiming again.',
      });
    }
    
    if (error.message.includes('insufficient')) {
      return res.status(503).json({
        error: 'Faucet has insufficient balance. Please try again later.',
      });
    }

    res.status(500).json({
      error: error.message || 'Failed to claim tokens',
    });
  }
});

/**
 * GET /api/faucet/info
 * Get faucet information (amount per claim, cooldown, etc.)
 */
router.get('/info', async (req, res) => {
  try {
    const { getFaucetInfo } = await import('../services/faucetService.js');
    const info = await getFaucetInfo();
    
    res.json({
      success: true,
      ...info,
    });
  } catch (error) {
    console.error('Get info error:', error);
    res.status(500).json({
      error: error.message || 'Failed to get faucet info',
    });
  }
});

/**
 * GET /api/faucet/check/:address
 * Check if an address can claim (cooldown status)
 */
router.get('/check/:address', async (req, res) => {
  try {
    const { address } = req.params;

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res.status(400).json({
        error: 'Invalid address format',
      });
    }

    const { checkClaimStatus } = await import('../services/faucetService.js');
    const status = await checkClaimStatus(address);

    res.json({
      success: true,
      ...status,
    });
  } catch (error) {
    console.error('Check status error:', error);
    res.status(500).json({
      error: error.message || 'Failed to check claim status',
    });
  }
});

export const faucetRouter = router;

