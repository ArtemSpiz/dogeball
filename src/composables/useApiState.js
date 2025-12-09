import { ref, reactive } from "vue";

// Mock API state - replace with actual API integration
const stage = ref(null);
const stageLoading = ref(false);
const paymentTokens = ref([]);
const paymentTokensLoading = ref(false);
const presaleEnded = ref(false);
const leaderboard = ref([]);
const info = ref(null);
const infoLoading = ref(false);

export function useApiState() {
  // Initialize with mock data for now
  // TODO: Replace with actual API calls
  if (!stage.value && !stageLoading.value) {
    stageLoading.value = true;
    paymentTokensLoading.value = true;

    // Simulate API loading
    setTimeout(() => {
      stage.value = {
        stage_name: "Stage 1",
        token_price: "0.015",
        cumulative_usd_raised: "50000",
        next_stage_target_usd: "100000",
      };
      paymentTokens.value = [
        // ETH with multiple chains
        { id: 1, symbol: "ETH", chain: "ethereum", price: "3000" },
        { id: 7, symbol: "ETH", chain: "bsc", price: "3000" },
        { id: 8, symbol: "ETH", chain: "polygon", price: "3000" },
        // BNB
        { id: 2, symbol: "BNB", chain: "bsc", price: "600" },
        // USDT with multiple chains
        { id: 3, symbol: "USDT", chain: "ethereum", price: "1" },
        { id: 9, symbol: "USDT", chain: "bsc", price: "1" },
        { id: 10, symbol: "USDT", chain: "polygon", price: "1" },
        { id: 11, symbol: "USDT", chain: "tron", price: "1" },
        // BTC
        { id: 4, symbol: "BTC", chain: "bitcoin", price: "65000" },
        // SOL
        { id: 5, symbol: "SOL", chain: "solana", price: "150" },
        // CARD
        { id: 6, symbol: "CARD", chain: "card", price: "1" },
        // More tokens
        { id: 12, symbol: "LTC", chain: "litecoin", price: "80" },
        { id: 13, symbol: "XRP", chain: "ripple", price: "0.5" },
        { id: 14, symbol: "DOGE", chain: "dogecoin", price: "0.1" },
        { id: 15, symbol: "TRX", chain: "tron", price: "0.08" },
        { id: 16, symbol: "MATIC", chain: "polygon", price: "0.8" },
        { id: 17, symbol: "AVAX", chain: "avalanche", price: "35" },
      ];
      info.value = { holders: 1234 };
      stageLoading.value = false;
      paymentTokensLoading.value = false;
    }, 1000);
  }

  return {
    stage,
    stageLoading,
    paymentTokens,
    paymentTokensLoading,
    presaleEnded,
    leaderboard,
    info,
    infoLoading,
  };
}
