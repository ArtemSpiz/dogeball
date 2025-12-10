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
const ERC20_ORDER = ["ETH", "USDT", "USDC", "PEPE", "SHIB", "FLOKI"];
// BEP-20 tokens (shown under BNB button)
const BEP20_ORDER = ["BNB", "BUSD", "USDT", "USDC"];
// More dropdown tokens
const MORE_SYMBOLS = ["XRP", "DOGE", "TON", "TRX", "ADA"];

// Helper to check if chain is ERC-20 / Ethereum
const isErc20Chain = (chain) => {
  const c = (chain || "").toUpperCase();
  return c === "ERC-20" || c === "ETHEREUM" || c.includes("ERC");
};

// Helper to check if chain is BEP-20 / BSC
const isBep20Chain = (chain) => {
  const c = (chain || "").toUpperCase();
  return c === "BEP-20" || c === "BSC" || c.includes("BEP");
};

// Helper to check if chain is Bitcoin
const isBitcoinChain = (chain) => {
  const c = (chain || "").toUpperCase();
  return c === "BITCOIN" || c === "BTC";
};

// Helper to check if chain is Solana
const isSolanaChain = (chain) => {
  const c = (chain || "").toUpperCase();
  return c === "SOLANA" || c === "SOL";
};

const cardToken = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.find((t) => t.symbol.toUpperCase() === "CARD");
});

// ETH chain tokens (ERC-20)
const ethChainTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  const filtered = tokens.filter((t) => isErc20Chain(t.chain));
  // Sort by the defined order
  return filtered.sort((a, b) => {
    const aIndex = ERC20_ORDER.indexOf(a.symbol.toUpperCase());
    const bIndex = ERC20_ORDER.indexOf(b.symbol.toUpperCase());
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
});

// BNB chain tokens (BEP-20)
const bnbChainTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  const filtered = tokens.filter((t) => isBep20Chain(t.chain));
  // Sort by the defined order
  return filtered.sort((a, b) => {
    const aIndex = BEP20_ORDER.indexOf(a.symbol.toUpperCase());
    const bIndex = BEP20_ORDER.indexOf(b.symbol.toUpperCase());
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
});

// USDT on other chains (not ERC-20 or BEP-20) - like POLYGON, TRC-20
const usdtOtherChains = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.filter(
    (t) =>
      t.symbol.toUpperCase() === "USDT" &&
      !isErc20Chain(t.chain) &&
      !isBep20Chain(t.chain)
  );
});

// Bitcoin tokens
const btcTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.filter(
    (t) => t.symbol.toUpperCase() === "BTC" || isBitcoinChain(t.chain)
  );
});

// Solana tokens
const solTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.filter(
    (t) => t.symbol.toUpperCase() === "SOL" || isSolanaChain(t.chain)
  );
});

// Main crypto groups - ETH, BNB, USDT, BTC, SOL
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

  // USDT on other chains (POLYGON, TRC-20, etc.)
  if (usdtOtherChains.value.length > 0) {
    groups.push({
      symbol: "USDT",
      tokens: usdtOtherChains.value,
      defaultToken: usdtOtherChains.value[0],
    });
  }

  // BTC tokens
  if (btcTokens.value.length > 0) {
    groups.push({
      symbol: "BTC",
      tokens: btcTokens.value,
      defaultToken: btcTokens.value[0],
    });
  }

  // SOL tokens
  if (solTokens.value.length > 0) {
    groups.push({
      symbol: "SOL",
      tokens: solTokens.value,
      defaultToken: solTokens.value[0],
    });
  }

  return groups;
});

// More tokens - coins like XRP, DOGE, TON, TRX, ADA
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
