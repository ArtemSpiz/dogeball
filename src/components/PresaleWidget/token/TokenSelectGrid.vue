<template>
  <div class="flex flex-col gap-3">
    <!-- Card Payment Button (Full Width) -->
    <TokenSelect
      v-if="cardToken"
      :value="cardToken.id === value?.id ? value : null"
      :tokens="[cardToken]"
      :default-label="cardToken.symbol"
      :default-token="cardToken"
      :selected="cardToken.id === value?.id"
      class="w-full"
      @update:value="handleTokenChange"
    />

    <!-- Crypto Grid -->
    <div class="grid grid-cols-3 gap-2">
      <TokenSelect
        v-for="tokenGroup in mainCryptoGroups"
        :key="tokenGroup.symbol"
        :value="tokenGroup.tokens.find((t) => t.id === value?.id) || null"
        :tokens="tokenGroup.tokens"
        :default-label="tokenGroup.symbol"
        :default-token="tokenGroup.defaultToken"
        :selected="tokenGroup.tokens.some((t) => t.id === value?.id)"
        @update:value="handleTokenChange"
      />
      <!-- More Button -->
      <TokenSelect
        v-if="moreTokens.length > 0"
        :value="moreTokens.find((t) => t.id === value?.id) || null"
        :tokens="moreTokens"
        :default-label="'More'"
        :placeholder="'More'"
        :selected="moreTokens.some((t) => t.id === value?.id)"
        @update:value="handleTokenChange"
      />
    </div>

    <!-- Other Cryptos Section -->
    <div class="flex flex-col items-center gap-2">
      <div class="flex items-center justify-center gap-2">
        <img
          :src="coinLogosImage"
          alt="Other Cryptos"
          class="h-8 w-auto max-w-[160px] object-contain"
        />
        <span
          class="text-white font-grotesk text-lg font-medium leading-5 font-feature-off"
        >
          + Other Cryptos
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TokenSelect from "./TokenSelect.vue";
import { useApiState } from "@/composables/useApiState";
import coinLogosImage from "@/assets/img/logos/coin-logos.webp";

const props = defineProps({
  value: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:value"]);

const apiData = useApiState();

// ERC-20 tokens (shown under ETH button)
const ETH_CHAIN_SYMBOLS = ["ETH", "USDT", "USDC", "PEPE", "SHIB"];
// BEP-20 tokens (shown under BNB button)
const BNB_CHAIN_SYMBOLS = ["BNB", "BUSD", "USDT", "USDC"];
// Standalone token buttons (shown as separate buttons, grouped by symbol)
const STANDALONE_SYMBOLS = ["USDT", "SOL", "BTC"];
// Standalone coins shown in "More" dropdown
const MORE_SYMBOLS = ["XRP", "DOGE", "TON", "TRX", "ADA"];

// Helper to check if chain is Ethereum/ERC-20
const isEthChain = (chain) => {
  const c = (chain || "").toUpperCase();
  return c.includes("ERC") || c.includes("ETH") || c === "ETHEREUM";
};

// Helper to check if chain is BSC/BEP-20
const isBnbChain = (chain) => {
  const c = (chain || "").toUpperCase();
  return c.includes("BEP") || c.includes("BSC");
};

const cardToken = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.find((t) => t.symbol.toUpperCase() === "CARD");
});

// ETH chain tokens (ERC-20)
const ethChainTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  const filtered = tokens.filter(
    (t) =>
      ETH_CHAIN_SYMBOLS.includes(t.symbol.toUpperCase()) && isEthChain(t.chain)
  );
  // Sort by the defined order
  return filtered.sort((a, b) => {
    const aIndex = ETH_CHAIN_SYMBOLS.indexOf(a.symbol.toUpperCase());
    const bIndex = ETH_CHAIN_SYMBOLS.indexOf(b.symbol.toUpperCase());
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
});

// BNB chain tokens (BEP-20)
const bnbChainTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  const filtered = tokens.filter(
    (t) =>
      BNB_CHAIN_SYMBOLS.includes(t.symbol.toUpperCase()) && isBnbChain(t.chain)
  );
  // Sort by the defined order
  return filtered.sort((a, b) => {
    const aIndex = BNB_CHAIN_SYMBOLS.indexOf(a.symbol.toUpperCase());
    const bIndex = BNB_CHAIN_SYMBOLS.indexOf(b.symbol.toUpperCase());
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
});

// USDT on other chains (not ERC-20 or BEP-20) - like TRC-20
const usdtOtherChains = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.filter(
    (t) =>
      t.symbol.toUpperCase() === "USDT" &&
      !isEthChain(t.chain) &&
      !isBnbChain(t.chain)
  );
});

// Group standalone tokens by symbol (SOL, BTC)
const standaloneTokenGroups = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  const groups = {};
  const standaloneOnly = ["SOL", "BTC"];

  tokens.forEach((token) => {
    const symbol = token.symbol.toUpperCase();
    if (standaloneOnly.includes(symbol)) {
      if (!groups[symbol]) {
        groups[symbol] = [];
      }
      groups[symbol].push(token);
    }
  });

  return standaloneOnly
    .filter((symbol) => groups[symbol])
    .map((symbol) => ({
      symbol,
      tokens: groups[symbol],
      defaultToken: groups[symbol][0],
    }));
});

// Main crypto groups - ETH chain, BNB chain, USDT (other chains), then standalone tokens
const mainCryptoGroups = computed(() => {
  const groups = [];

  // ETH chain group (ERC-20 tokens)
  if (ethChainTokens.value.length > 0) {
    groups.push({
      symbol: "ETH",
      tokens: ethChainTokens.value,
      defaultToken:
        ethChainTokens.value.find((t) => t.symbol.toUpperCase() === "ETH") ||
        ethChainTokens.value[0],
    });
  }

  // BNB chain group (BEP-20 tokens)
  if (bnbChainTokens.value.length > 0) {
    groups.push({
      symbol: "BNB",
      tokens: bnbChainTokens.value,
      defaultToken:
        bnbChainTokens.value.find((t) => t.symbol.toUpperCase() === "BNB") ||
        bnbChainTokens.value[0],
    });
  }

  // USDT on other chains (TRC-20, etc.)
  if (usdtOtherChains.value.length > 0) {
    groups.push({
      symbol: "USDT",
      tokens: usdtOtherChains.value,
      defaultToken: usdtOtherChains.value[0],
    });
  }

  // Add standalone tokens (SOL, BTC)
  groups.push(...standaloneTokenGroups.value);

  return groups;
});

// More tokens - standalone coins (XRP, DOGE, TON, TRX, ADA)
const moreTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  const moreList = [];

  MORE_SYMBOLS.forEach((symbol) => {
    const found = tokens.filter(
      (t) => t.symbol.toUpperCase() === symbol.toUpperCase()
    );
    moreList.push(...found);
  });

  return moreList;
});

const handleTokenChange = (token) => {
  emit("update:value", token);
};
</script>
