<script>
const validStates = [
  "sending",
  "confirming",
  "finalizing",
  "finished",
  "errored",
];
</script>

<script setup>
import { capitalize, formatNumber, parseNum } from "@/utils/format";
import { Modal } from "../ui";
import Input from "../ui/Input.vue";
import CheckCircleIcon from "@/assets/icons/CheckCircle.vue";
import ClockIcon from "@/assets/icons/Clock.vue";
import ErrorIcon from "@/assets/icons/Error.vue";
import CancelledIcon from "@/assets/icons/XCircle.vue";
import { computed, ref } from "vue";
import Spinner from "../ui/Spinner.vue";
import { getApiErrorMessage } from "@/api";
import Copy from "@/assets/icons/Copy.vue";
import CopyIcon from "../icons/CopyIcon.vue";
import CheckIcon from "../icons/CheckIcon.vue";

/**
 * @typedef {"sending" | "confirming" | "finalizing" | "finished" | "errored"} State
 * @typedef {import("@/api/api.types").API.PurchaseTransactionHistoryItemV2} PurchaseTransaction
 * @typedef {import("@/api/api.types").API.PaymentToken} PaymentToken
 * @type {{open: boolean, state: State, transaction: PurchaseTransaction, transactionHash: string | null, transactionError: string | null, payAmount: string, payCurrency: PaymentToken }}
 */
const props = defineProps({
  open: { type: Boolean, required: true },
  state: {
    type: String,
    required: true,
    validator: (val) => validStates.includes(val),
  },
  transaction: { type: Object, required: true },
  transactionHash: { type: [String, null], required: true },
  transactionError: { type: [String, null], required: true },
  payAmount: { type: String, required: true },
  payCurrency: { type: Object, required: true },
});
defineEmits(["close"]);

const copied = ref(false);

const copyToClipboard = async () => {
  if (props.transactionHash) {
    try {
      await navigator.clipboard.writeText(props.transactionHash);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
};

/**
 * @type {import("vue").ComputedRef<{title: string, body?: string, status: "in_progress" | "completed" | "waiting" | "errored" | "cancelled"}[]>}
 */
const statusBoxes = computed(() => {
  const boxes = [];

  let sendStatus;
  if (props.state === "sending") sendStatus = "in_progress";
  else if (props.state === "errored") sendStatus = "errored";
  else sendStatus = "completed";

  let sendTitle = "Transaction Sending";
  if (sendStatus === "completed") sendTitle = "Transaction Sent";
  else if (sendStatus === "errored") sendTitle = "Transaction Errored";

  const errorString = getApiErrorMessage(props.transactionError);

  boxes.push({
    status: sendStatus,
    title: sendTitle,
    body: sendStatus === "errored" ? errorString ?? undefined : undefined,
  });

  let confirmStatus;
  if (props.state === "confirming") confirmStatus = "in_progress";
  else if (props.state === "errored") confirmStatus = "cancelled";
  else if (props.state === "sending") confirmStatus = "waiting";
  else confirmStatus = "completed";

  let confirmTitle;
  if (confirmStatus === "completed") confirmTitle = "Transaction Confirmed";
  else if (confirmStatus === "cancelled")
    confirmTitle = "Confirmation Cancelled";
  else if (confirmStatus === "in_progress")
    confirmTitle = "Confirming Transaction";
  else confirmTitle = "Awaiting Confirmation";

  boxes.push({ status: confirmStatus, title: confirmTitle });

  let completeStatus;
  if (props.state === "confirming") completeStatus = "waiting";
  else if (props.state === "errored") completeStatus = "cancelled";
  else if (props.state === "sending") completeStatus = "waiting";
  else if (props.state === "finalizing") completeStatus = "in_progress";
  else completeStatus = "completed";

  let completeTitle;
  if (completeStatus === "completed") completeTitle = "Transaction Complete";
  else if (completeStatus === "cancelled")
    completeTitle = "Transaction Cancelled";
  else if (completeStatus === "in_progress")
    completeTitle = "Finalizing Transaction";
  else completeTitle = "Awaiting Completion";

  const completeBody =
    completeStatus === "completed"
      ? `Received ${formatNumber(
          parseNum(props.transaction?.tokens_bought),
          2,
          4
        )} $DOGEBALL`
      : undefined;

  boxes.push({
    status: completeStatus,
    title: completeTitle,
    body: completeBody,
  });

  return boxes;
});

const statusCols = {
  completed: ["#07b059", "#fff"],
  errored: ["#ff3f3f", "#fff"],
  in_progress: ["#007BF9", "#fff"],
  waiting: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.5)"],
  cancelled: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.5)"],
};
</script>

<template>
  <Modal title="Transaction" :open="props.open" @close="$emit('close')">
    <div class="flex flex-col gap-4 max-md:gap-3">
      <div
        class="flex items-center gap-3 self-stretch rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)] p-3 transition-colors hover:bg-[rgba(8,12,35,0.6)]"
      >
        <div class="flex flex-col gap-0.5 flex-1 min-w-0">
          <p
            class="text-left text-sm leading-5 m-0 text-white/80 font-grotesk font-medium font-feature-off"
          >
            Transaction Hash
          </p>
          <template v-if="!props.transactionHash && props.state !== 'errored'">
            <div class="flex items-center gap-2">
              <Spinner :size="4" />
            </div>
          </template>
          <p
            v-else
            class="text-left text-base leading-5 m-0 text-white font-grotesk font-medium font-feature-off line-clamp-1"
          >
            {{ props.state === "errored" ? "Error" : transactionHash }}
          </p>
        </div>

        <button
          v-if="props.transactionHash && props.state !== 'errored'"
          @click="copyToClipboard"
          class="inline-flex py-2 items-center justify-center gap-1 px-2 font-black rounded-md bg-white text-[#080C23] text-sm leading-tight cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap font-grotesk"
          title="Copy code"
        >
          {{ copied ? "Copied!" : "Copy" }}
          <CopyIcon v-if="!copied" :size="16" color="#EB4102" />
          <CheckIcon v-else :size="16" />
        </button>
      </div>

      <div
        class="flex flex-col rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)] p-4 max-md:p-3"
      >
        <p class="text-center font-medium mb-2 font-grotesk">
          Transaction Summary
        </p>
        <div class="text-sm flex flex-col">
          <div class="flex justify-between border-b border-white/10 py-2.5">
            <p class="font-semibold">You Sent</p>
            <p class="text-white/80">
              {{ formatNumber(parseNum(payAmount)) }}{{ " " }}
              {{ payCurrency?.symbol?.toUpperCase() ?? "TOKEN" }}
            </p>
          </div>
          <div class="flex justify-between border-b border-white/10 py-2.5">
            <p class="font-semibold">You Received</p>
            <div class="text-white/80 items-center flex gap-2">
              <template v-if="!transaction && props.state !== 'errored'">
                <Spinner :size="4" />
              </template>
              <template v-else>
                {{
                  props.state === "errored"
                    ? "Error"
                    : `${formatNumber(
                        parseNum(props.transaction?.tokens_bought),
                        2,
                        4
                      )} $DOGEBALL`
                }}
              </template>
            </div>
          </div>
          <div class="flex justify-between py-2.5">
            <p class="font-semibold">Rate</p>
            <div class="text-white/80 items-center flex gap-2">
              <template v-if="!props.transaction && props.state !== 'errored'">
                <Spinner :size="4" />
              </template>
              <template v-else>
                {{
                  props.state === "errored"
                    ? "Error"
                    : `1 ${props.payCurrency.symbol.toUpperCase()} = ${formatNumber(
                        parseNum(props.transaction?.tokens_bought) /
                          parseNum(props.payAmount),
                        2,
                        4
                      )} $DOGEBALL`
                }}
              </template>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)] p-4 max-md:p-3 flex flex-col gap-3"
      >
        <div
          v-for="(box, idx) in statusBoxes"
          :key="idx"
          class="flex items-center max-md:items-start gap-3"
        >
          <div
            class="w-12 h-12 max-md:w-10 max-md:h-10 max-md:rounded-lg flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300"
            :style="{
              backgroundColor: statusCols[box.status][0],
              color: statusCols[box.status][1],
            }"
          >
            <Spinner
              v-if="box.status === 'in_progress'"
              size="{4}"
              class="w-5 h-5"
            />
            <CheckCircleIcon
              v-if="box.status === 'completed'"
              class="w-5 h-5"
            />
            <ClockIcon v-if="box.status === 'waiting'" class="w-5 h-5" />
            <ErrorIcon v-if="box.status === 'errored'" class="w-5 h-5" />
            <CancelledIcon v-if="box.status === 'cancelled'" class="w-5 h-5" />
          </div>
          <div class="w-0 flex-1 leading-[1.4] text-sm">
            <p class="font-semibold font-grotesk">{{ box.title }}</p>
            <p class="text-white/70 text-xs">
              {{ capitalize(box.status) }}
            </p>
            <p
              v-if="box.body"
              class="text-white/80 mt-1"
              :style="{ overflowWrap: 'break-word' }"
            >
              {{ box.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
