<script>
  const validStates = ["sending", "confirming", "finalizing", "finished", "errored"];
</script>

<script setup>
  import { capitalize, formatNumber, parseNum } from '@/utils/format';
  import { Modal } from '../ui';
  import Input from '../ui/Input.vue';
  import CheckCircleIcon from '@/assets/icons/CheckCircle.vue';
  import ClockIcon from '@/assets/icons/Clock.vue';
  import ErrorIcon from '@/assets/icons/Error.vue';
  import CancelledIcon from "@/assets/icons/XCircle.vue"
  import { computed, watchEffect } from 'vue';
  import Spinner from '../ui/Spinner.vue';
  import { getApiErrorMessage } from '@/api';

  /**
   * @typedef {"sending" | "confirming" | "finalizing" | "finished" | "errored"} State
   * @typedef {import("@/api/api.types").API.PurchaseTransactionHistoryItemV2} PurchaseTransaction
   * @typedef {import("@/api/api.types").API.PaymentToken} PaymentToken
   * @type {{open: boolean, state: State, transaction: PurchaseTransaction, transactionHash: string | null, transactionError: string | null, payAmount: string, payCurrency: PaymentToken }}
   */
  const props = defineProps({
    open: {type: Boolean, required: true},
    state: {type: String, required: true, validator: (val) => validStates.includes(val)},
    transaction: {type: Object, required: true},
    transactionHash: {type: [String, null], required: true},
    transactionError: {type: [String, null], required: true},
    payAmount: {type: String, required: true},
    payCurrency: {type: Object, required: true}
  })
  defineEmits(["close"])

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

    const errorString = getApiErrorMessage(props.transactionError)

    boxes.push({
      status: sendStatus,
      title: sendTitle,
      body:
        sendStatus === "errored" ? errorString ?? undefined : undefined,
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
    completed: ['#07b059', '#000'],
    errored: ['#ff3f3f', '#000'],
    in_progress: ['#f5a336', '#000'],
    waiting: ['#aaa', '#444'],
    cancelled: ['#aaa', '#444']
  };
</script>

<template>
  <Modal
    title="Transaction"
    :open="props.open"
    @close="$emit('close')"
  >
    <div class="">
      <Input
        :value="props.state === 'errored' ? 'Error' : transactionHash ?? 'Loading...'"
        label="Transaction Hash"
        :loading="!props.transactionHash && props.state !== 'errored'"
      />
    </div>
    <div class="flex flex-col bg-[rgba(255,255,255,0.15)] rounded-lg py-2 px-4">
      <p class="text-center">Transaction Summary</p>
      <div class="text-sm">
        <div class="flex justify-between border-b border-[rgba(255,255,255,0.15)] py-2">
          <p class="font-bold">You Sent</p>
          <p class="text-[#ccc]">
            {{formatNumber(parseNum(payAmount))}}{{" "}}
            {{payCurrency.symbol.toUpperCase()}}
          </p>
        </div>
        <div class="flex justify-between border-b border-[rgba(255,255,255,0.15)] py-2">
          <p class="font-bold">You Received</p>
          <div class="text-[#ccc] items-center flex gap-2">
            <template v-if="!transaction && props.state !== 'errored'">
              <Spinner :size="4" /> Calculating
            </template>
            <template v-else>
              {{props.state === "errored"
                ? "Error"
                : `${formatNumber(
                    parseNum(props.transaction?.tokens_bought),
                    2,
                    4
                  )} $DOGEBALL`}}
            </template>
          </div>
        </div>
        <div class="flex justify-between py-2">
          <p class="font-bold">Rate</p>
          <div class="text-[#ccc] items-center flex gap-2">
            <template v-if="!props.transaction && props.state !== 'errored'">
              <Spinner :size="4" /> Calculating
            </template>
            <template v-else>
              {{props.state === "errored"
                ? "Error"
                : `1 ${props.payCurrency.symbol.toUpperCase()} = ${formatNumber(
                    parseNum(props.transaction?.tokens_bought) /
                      parseNum(props.payAmount),
                    2,
                    4
                  )} $DOGEBALL`}}
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[rgba(255,255,255,0.15)] rounded-lg p-3 flex flex-col gap-3">
      <div
        v-for="(box, idx) in statusBoxes"
        class="flex items-center gap-2"
      >
        <div
          class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg border-[3px] border-[#000]"
          :style="{backgroundColor: statusCols[box.status][0], color: statusCols[box.status][1]}"
        >
          <Spinner v-if="box.status === 'in_progress'" size={4} class="w-5 h-5" />
          <CheckCircleIcon v-if="box.status === 'completed'" class="w-5 h-5" />
          <ClockIcon v-if="box.status === 'waiting'" class="w-5 h-5" />
          <ErrorIcon v-if="box.status === 'errored'" class="w-5 h-5" />
          <CancelledIcon v-if="box.status === 'cancelled'" class="w-5 h-5" />
        </div>
        <div class="w-0 flex-1 leading-[1.3] text-sm">
          <p class="">{{box.title}}</p>
          <p class="">
            {{capitalize(box.status)}}
          </p>
          <p :style="{overflowWrap: 'break-word'}">{{box.body}}</p>
        </div>
      </div>
    </div>
  </Modal>
</template>