<template>
  <div class="flex flex-col gap-4 w-full min-w-0 max-w-full">
    <!-- Stage Box (only if presale active) -->
    <template v-if="!presale.presaleEnded.value">
      <StageBox />
      <p
        class="text-center self-center text-white font-grotesk text-sm font-semibold leading-none"
      >
        1 $DOGEBALL =
        {{
          formatDollar(parseNum(presale.stage.value?.token_price), true, 0, 6)
        }}
      </p>
    </template>

    <!-- Payment Methods -->
    <TokenSelectGrid :value="selectedToken" @update:value="setSelectedToken" />

    <!-- Presale/Launch Price Bar -->
    <div
      class="flex px-3 sm:px-4 py-2 justify-between sm:justify-center items-center gap-1 self-stretch rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)]"
    >
      <span
        class="gap-1 text-white text-sm font-semibold leading-5 font-grotesk whitespace-nowrap overflow-hidden text-ellipsis h-full flex items-center font-feature-off"
      >
        Presale Price =
        <span class="text-[#59A6FD]">
          {{
            formatDollar(parseNum(presale.stage.value?.token_price), true, 0, 4)
          }}
        </span>
        <span> | </span>
        <span>Launch Price =</span>
        <span class="text-[#59A6FD]">
          {{ formatDollar(LAUNCH_PRICE, true, 0, 4) }}
        </span>
      </span>
    </div>

    <!-- Token Amount Inputs -->
    <TokenAmountInputs
      :selected-token="selectedToken"
      v-model:payment-amount="paymentAmountStr"
      v-model:receive-amount="receiveAmountStr"
    />

    <!-- Main Action Button -->
    <Button
      @click="handleBuy"
      :disabled="isBuying || presale.presaleEnded.value"
      variant="primary"
      class="w-full h-11 px-6 !bg-[#EB4102] !bg-none text-base font-semibold"
      style="border-radius: 80px"
    >
      <Spinner v-if="isBuying" :size="5" />
      <template v-else>
        <span v-if="presale.presaleEnded.value">Presale Ended</span>
        <span v-else-if="!presale.isConnected.value">Connect Wallet</span>
        <span v-else>{{ buyButtonText }}</span>
      </template>
    </Button>

    <!-- Buy State Message -->
    <p
      v-if="buyStateMessage"
      class="text-center text-sm text-white/70 font-grotesk"
    >
      {{ buyStateMessage }}
    </p>

    <!-- Code Input Buttons -->
    <div class="flex flex-row justify-center items-center gap-3">
      <PillButton
        v-for="item in codeOptions"
        :key="item.value"
        :active="visibleOption === item.value"
        @click="toggleCodeOption(item.value)"
      >
        {{ item.label }}
      </PillButton>
    </div>

    <!-- Code Inputs -->
    <Transition name="slide-fade" mode="out-in">
      <BonusCodeInput v-if="visibleOption === 'bonus'" />
      <ReferralCodeInput v-else-if="visibleOption === 'referral'" />
    </Transition>

    <!-- Powered By -->
    <PoweredBy />
    <NowPaymentsModal
      v-if="nowPaymentsTransaction"
      :open="nowPaymentsModalVisible"
      @close="() => (nowPaymentsModalVisible = false)"
      :transaction="nowPaymentsTransaction"
    />
    <WalletTransferModal
      v-if="presale.currentPurchase.value"
      :open="walletTransferModalVisible"
      @close="closeWalletTransfer"
      :pay-amount="presale.currentPurchase.value.payAmount"
      :pay-currency="presale.currentPurchase.value.token"
      :state="presale.currentPurchase.value.state"
      :transaction="presale.currentPurchase.value.transaction"
      :transaction-hash="presale.currentPurchase.value.transactionHash"
      :transaction-error="presale.currentPurchase.value.error"
    />
    <ContactModal
      :open="contactModalVisible"
      @close="() => (contactModalVisible = false)"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, watchEffect } from "vue";
import StageBox from "../stage/StageBox.vue";
import { TokenSelectGrid, TokenAmountInputs } from "../token";
import { Button, Spinner, PillButton } from "../ui";
import PoweredBy from "../shared/PoweredBy.vue";
import BonusCodeInput from "../code/BonusCodeInput.vue";
import ReferralCodeInput from "../code/ReferralCodeInput.vue";
import { usePresale, BuyStateType } from "@/composables/usePresale";
import { useToast } from "@/composables/useToast";
import { formatDollar, parseNum, formatPrecision } from "@/utils/format";
import { LAUNCH_PRICE, DEFAULT_PAYMENT_AMOUNT } from "@/config/presale";
import { presaleApi } from "@/api";
import NowPaymentsModal from "../modals/NowPaymentsModal.vue";
import WalletTransferModal from "../modals/WalletTransferModal.vue";
import { isWalletTransferSupported } from "@/utils/web3";
import ContactModal from "../modals/ContactModal.vue";

// Composables
const presale = usePresale();
const toast = useToast();

watchEffect(() => console.log(presale.isConnected.value));

// Local state
const selectedToken = ref(null);
const paymentAmountStr = ref(DEFAULT_PAYMENT_AMOUNT);
const receiveAmountStr = ref("0");
const visibleOption = ref(null);

const codeOptions = [
  { label: "Bonus Code", value: "bonus" },
  { label: "Referral Code", value: "referral" },
];

// Computed
const isBuying = computed(() => {
  const state = presale.buyState.value.type;
  return (
    [
      BuyStateType.SENDING,
      BuyStateType.CONFIRMING,
      BuyStateType.FINALIZING,
    ].includes(state) || presale.buyLoading.value
  );
});

const buyButtonText = computed(() => {
  if (!selectedToken.value) return "Select Token";
  if (parseNum(paymentAmountStr.value) <= 0) return "Enter Amount";
  if (selectedToken.value.symbol.toUpperCase() === "CARD") {
    return "Buy with Card";
  }
  return "Coming Soon";
});

const buyStateMessage = computed(() => {
  const state = presale.buyState.value;
  switch (state.type) {
    case BuyStateType.SENDING:
      return "Confirm the transaction in your wallet...";
    case BuyStateType.CONFIRMING:
      return "Waiting for blockchain confirmation...";
    case BuyStateType.FINALIZING:
      return "Processing your purchase...";
    default:
      return null;
  }
});

// Initialize selected token
watch(
  () => presale.paymentTokens.value,
  (tokens) => {
    if (!tokens?.length) return;
    const ethToken = tokens.find(
      (token) => token.symbol.toUpperCase() === "ETH"
    );
    selectedToken.value = ethToken ?? tokens[0];
  },
  { immediate: true }
);

// Calculate receive amount when payment changes
watch(
  [selectedToken, () => presale.stage.value?.token_price],
  () => {
    if (!selectedToken.value || !presale.stage.value) return;
    const receiveNum = presale.calculateReceiveAmount(
      paymentAmountStr.value,
      selectedToken.value
    );
    receiveAmountStr.value = (
      Math.floor(receiveNum * 10 ** 2) /
      10 ** 2
    ).toString();
  },
  { immediate: true }
);

// Check URL params for code inputs on mount
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("referral_code")) visibleOption.value = "referral";
  if (params.has("bonus_code")) visibleOption.value = "bonus";
});

// Methods
const setSelectedToken = (token) => {
  selectedToken.value = token;
};

const toggleCodeOption = (value) => {
  visibleOption.value = visibleOption.value === value ? null : value;
};

/** @type {import("vue").Ref<import("@/api/api.types").API.Transaction | null>} */
const nowPaymentsTransaction = ref(null);
const nowPaymentsModalVisible = ref(false);
const walletTransferModalVisible = ref(false);

const contactModalVisible = ref(false);

const closeWalletTransfer = () => {
  walletTransferModalVisible.value = false;
  contactModalVisible.value = true;
};

const handleBuy = async () => {
  // Connect wallet if not connected
  if (!presale.isConnected.value) {
    presale.showConnectWalletModal();
    return;
  }

  // Validation
  if (presale.presaleEnded.value) {
    toast.showError("Presale has ended");
    return;
  }

  if (!selectedToken.value) {
    toast.showError("Please select a payment method");
    return;
  }

  const paymentAmount = parseNum(paymentAmountStr.value);
  if (paymentAmount <= 0) {
    toast.showError("Please enter an amount");
    return;
  }

  // Handle card payment
  if (selectedToken.value.symbol.toUpperCase() === "CARD") {
    try {
      const usdAmount = paymentAmount; // For card, payment is in USD
      await presale.buyWithCard({
        usdAmount,
        onSuccess: (tokensBought) => {
          toast.showSuccess(
            `Successfully purchased ${formatPrecision(
              tokensBought,
              0,
              2
            )} $DOGEBALL!`
          );
        },
        onError: (err) => {
          toast.showError(
            presaleApi.getApiErrorMessage(
              err,
              "Card payment failed. Please try again."
            )
          );
        },
        onClosedEarly: () => {
          toast.showInfo("Payment is being processed. Check your dashboard.");
        },
      });
    } catch (err) {
      console.error("Card payment error:", err);
    }
    return;
  }

  // Handle crypto payment
  try {
    const result = await presale.buyWithCrypto({
      paymentToken: selectedToken.value,
      paymentAmount: paymentAmountStr.value,
      onStateChanged: (state) => {
        if (
          state.state === "sending" &&
          isWalletTransferSupported(selectedToken.value)
        ) {
          setTimeout(() => (walletTransferModalVisible.value = true), 50);
        }
        if (state.state === BuyStateType.FINISHED) {
          const tokensReceived = parseNum(receiveAmountStr.value);
          toast.showSuccess(
            `Successfully purchased ${formatPrecision(
              tokensReceived,
              0,
              2
            )} $DOGEBALL!`
          );
        }
      },
    });

    // Handle NowPayments flow (shows payment modal)
    if (result?.type === "created" && result.transaction) {
      toast.showInfo("Complete your payment in the popup window");
      nowPaymentsTransaction.value = result.transaction;
      setTimeout(() => (nowPaymentsModalVisible.value = true), 50);
    }
  } catch (err) {
    const message =
      err?.shortMessage ||
      err?.message ||
      "Transaction failed. Please try again.";
    toast.showError(message);
    console.error("Buy error:", err);
  }
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
