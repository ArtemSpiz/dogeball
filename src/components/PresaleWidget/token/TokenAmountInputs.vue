<template>
  <div class="flex flex-col gap-3">
    <!-- You Pay -->
    <div
      class="flex p-4 justify-between items-center self-stretch rounded-2xl bg-white/10 h-20 transition-colors focus-within:bg-white/15"
    >
      <div class="flex flex-col flex-1 min-w-0 gap-2">
        <p
          class="text-white font-grotesk text-sm font-medium leading-5 font-feature-off"
        >
          You pay
        </p>
        <input
          ref="paymentInputRef"
          size="1"
          class="flex-1 outline-none bg-transparent text-white text-left text-2xl font-medium leading-5 placeholder:text-white/30 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 font-feature-off"
          placeholder="0.00"
          inputmode="decimal"
          :value="paymentAmount"
          @focus="handlePaymentFocus"
          @blur="handlePaymentBlur"
          @input="handlePaymentInput"
        />
      </div>
      <TokenBadge :token="selectedToken" />
    </div>

    <!-- Swap Icon -->
    <!-- <div class="flex justify-center -my-1">
      <div
        class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
      >
        <svg
          class="w-4 h-4 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      </div>
    </div> -->

    <!-- You Receive -->
    <div
      class="flex p-4 justify-between items-center self-stretch rounded-2xl bg-white/10 h-20 transition-colors focus-within:bg-white/15"
    >
      <div class="flex flex-col flex-1 min-w-0 gap-2">
        <p
          class="text-white font-grotesk text-sm font-medium leading-5 font-feature-off"
        >
          You receive
        </p>
        <input
          ref="receiveInputRef"
          size="1"
          class="flex-1 outline-none bg-transparent text-white text-left text-2xl font-medium leading-5 placeholder:text-white/30 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 font-feature-off"
          placeholder="0.00"
          inputmode="decimal"
          :value="receiveAmount"
          @focus="handleReceiveFocus"
          @blur="handleReceiveBlur"
          @input="handleReceiveInput"
        />
      </div>
      <TokenBadge :is-dogeball="true" />
    </div>

    <!-- USD Estimate -->
    <!-- <p
      v-if="usdEstimate > 0"
      class="text-center text-white/50 text-xs font-grotesk"
    >
      ≈ ${{ formatPrecision(usdEstimate, 2, 2) }} USD
    </p> -->
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import TokenBadge from "./TokenBadge.vue";
import { usePresale } from "@/composables/usePresale";
import { parseNum, formatPrecision, partialNumRegexp } from "@/utils/format";

const props = defineProps({
  selectedToken: {
    type: Object,
    default: null,
  },
  paymentAmount: {
    type: String,
    default: "0",
  },
  receiveAmount: {
    type: String,
    default: "0",
  },
});

const emit = defineEmits(["update:paymentAmount", "update:receiveAmount"]);

const presale = usePresale();

// Refs for inputs
const paymentInputRef = ref(null);
const receiveInputRef = ref(null);

// Computed
const usdEstimate = computed(() => {
  if (!props.selectedToken) return 0;
  return parseNum(props.paymentAmount) * parseNum(props.selectedToken.price);
});

// Payment input handlers
const handlePaymentFocus = (e) => {
  if (e.target.value === "0") {
    e.target.value = "";
    emit("update:paymentAmount", "");
  }
};

const handlePaymentBlur = (e) => {
  if (e.target.value === "") {
    e.target.value = "0";
    emit("update:paymentAmount", "0");
  }
};

const handlePaymentInput = (e) => {
  let val = e.target.value;

  // Validate numeric input
  if (!partialNumRegexp.test(val) && val !== "") {
    val = props.paymentAmount;
  }

  e.target.value = val;
  emit("update:paymentAmount", val);

  // Calculate receive amount
  if (props.selectedToken && presale.stage.value) {
    const receiveNum = presale.calculateReceiveAmount(val, props.selectedToken);
    emit("update:receiveAmount", formatPrecision(receiveNum, 0, 2));
  }
};

// Receive input handlers
const handleReceiveFocus = (e) => {
  if (e.target.value === "0") {
    e.target.value = "";
    emit("update:receiveAmount", "");
  }
};

const handleReceiveBlur = (e) => {
  if (e.target.value === "") {
    e.target.value = "0";
    emit("update:receiveAmount", "0");
  }
};

const handleReceiveInput = (e) => {
  let val = e.target.value;

  // Validate numeric input
  if (!partialNumRegexp.test(val) && val !== "") {
    val = props.receiveAmount;
  }

  e.target.value = val;
  emit("update:receiveAmount", val);

  // Calculate payment amount
  if (props.selectedToken && presale.stage.value) {
    const paymentNum = presale.calculatePaymentAmount(val, props.selectedToken);
    emit("update:paymentAmount", formatPrecision(paymentNum, 0, 6));
  }
};
</script>
