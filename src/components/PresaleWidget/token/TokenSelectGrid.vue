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
        <span class="text-white font-grotesk text-lg font-medium leading-5 font-feature-off">
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

const MAIN_CRYPTO_SYMBOLS = ["ETH", "BNB", "USDT", "BTC", "SOL"];

const cardToken = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.find((t) => t.symbol.toUpperCase() === "CARD");
});

const tokenGroups = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  const cryptoTokens = tokens.filter((t) => t.symbol.toUpperCase() !== "CARD");

  const groups = {};
  cryptoTokens.forEach((token) => {
    const symbol = token.symbol.toUpperCase();
    if (!groups[symbol]) {
      groups[symbol] = [];
    }
    groups[symbol].push(token);
  });

  return groups;
});

const mainCryptoGroups = computed(() => {
  return MAIN_CRYPTO_SYMBOLS.filter((symbol) => tokenGroups.value[symbol]).map(
    (symbol) => ({
      symbol,
      tokens: tokenGroups.value[symbol],
      defaultToken: tokenGroups.value[symbol][0],
    })
  );
});

const moreTokens = computed(() => {
  const tokens = apiData.paymentTokens.value ?? [];
  return tokens.filter(
    (t) =>
      t.symbol.toUpperCase() !== "CARD" &&
      !MAIN_CRYPTO_SYMBOLS.includes(t.symbol.toUpperCase())
  );
});

const handleTokenChange = (token) => {
  emit("update:value", token);
};
</script>

