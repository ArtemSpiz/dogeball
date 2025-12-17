<script setup>
  import { computed, Fragment, onWatcherCleanup, ref, useTemplateRef, watch, watchEffect } from 'vue';
  import Modal from '../ui/Modal.vue';
  import { useAccount, useBuy } from '@/composables';
  import { NumberValue } from '../ui';
  import CheckCircleIcon from '@/assets/icons/CheckCircle.vue';
  import ClockIcon from '@/assets/icons/Clock.vue';
  import ErrorIcon from '@/assets/icons/Error.vue';
  import { capitalize } from "@/utils/format"
  import { QRCodeCanvas } from '@akamfoad/qrcode';

  /** @type {{open: boolean, transaction: import("@/api/api.types").API.Transaction}} */
  const props = defineProps({
    open: {type: Boolean, required: true},
    transaction: {type: Object, required: true}
  })

  defineEmits(["close"])

  const EXPIRES_IN_MS = 60 * 60 * 1000;

  const qrRef = useTemplateRef("qr")
  
  /** @type {import("vue").Ref<"paid" | "unpaid" | "expired">} */
  const status = ref("unpaid")

  /** @type {import("vue").Ref<import("@/api/api.types").API.PurchaseTransactionHistoryItemV2 | null>} */
  const completedTransaction = ref(null)
  const accountData = useAccount();
  const createdAt = ref(Date.now() - 1000)
  const expiresInMs = ref(EXPIRES_IN_MS)
  const buy = useBuy()

  const timeStr = computed(() => {
    const mins = Math.floor(expiresInMs.value / (60 * 1000));
    const secs = Math.floor((expiresInMs.value - mins * 60 * 1000) / 1000);
    return `${Math.floor(mins).toString().padStart(2, "0")}:${Math.floor(secs).toString().padStart(2, "0")}`;
  });

  watchEffect(() => {
    if (!props.open) return;
    const interval = setInterval(() => {
      const diff = Math.max(createdAt.value + EXPIRES_IN_MS - Date.now(), 0);
      if (diff === 0 && status.value === "unpaid") status.value = "expired";
      expiresInMs.value = diff;
    }, 1000);
    onWatcherCleanup(() => clearInterval(interval));
  });


  watch(props.transaction, () => {
    status.value = "unpaid"
    createdAt.value = Date.now() - 1000
  });

  watchEffect(() => {
    if (!accountData.address.value || !props.open) return;
    const abortController = new AbortController();
    buy.waitForNextTransaction(accountData.address.value, createdAt.value, {
      signal: abortController.signal,
    }).then((trx) => {
      refetchUserStakeData();
      refetchUserData().finally(() => {
        if (abortController.signal.aborted) return;
        status.value = "paid";
        completedTransaction.value = trx;
      });
    });
    onWatcherCleanup(() => abortController.abort());
  });

  watchEffect(() => {
    if (!qrRef.value) return;
    new QRCodeCanvas(props.transaction.pay_address).draw(qrRef.value);
  });

  /** @type {Record<"unpaid" | "paid" | "expired", string>} */
  const statusCols = {
    paid: "#abdbf3",
    unpaid: "#fff",
    expired: "#ff4040",
  };

  /** @type {Record<"unpaid" | "paid" | "expired", string>} */
  const statusClasses = {
    paid: '',
    unpaid: '',
    expired: ''
  };
</script>

<template>
  <Modal
    :class="['', statusClasses[status]]"
    title="Transaction"
    :style="{'--status-col': statusCols[status]}"
    :open="props.open"
    @close="$emit('close')"
  >
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-between text-sm">
        <div class="flex gap-1 items-center text-[var(--status-col)]">
          <CheckCircleIcon class="w-4 h-4" v-if="status === 'paid'" />
          <ClockIcon class="w-4 h-4" v-if="status === 'unpaid'" />
          <ErrorIcon class="w-4 h-4" v-if="status === 'expired'" />
          {{capitalize(status)}}
        </div>
        <p class="" v-if="status === 'unpaid'">Expires in {{timeStr}}</p>
      </div>
      <div
        class="w-full h-3 rounded-full overflow-hidden bg-[rgba(255,255,255,0.2)]"
        :style="{'--frac': `${1 - expiresInMs / EXPIRES_IN_MS}`}"
      >
        <div :style="{width: 'calc(var(--frac) * 100%)'}" class="h-full bg-[var(--status-col)] rounded-full"></div>
      </div>
    </div>
    <template v-if="status == 'unpaid'">
      <div class="flex flex-col gap-4">
        <canvas ref="qr" class="w-32 h-32 rounded-lg mx-auto"></canvas>
        <div class="flex flex-col gap-4">
          <NumberValue
            :value="props.transaction.pay_amount"
            :label="`Pay amount (${props.transaction.pay_currency.toUpperCase()})`"
          />
          <NumberValue
            :value="props.transaction.payment_id"
            label="Payment ID"
          />
        </div>
      </div>
      <template v-if="props.transaction.payin_extra_id">
        <NumberValue
          :value="props.transaction.payin_extra_id"
          label="Destination Tag"
        />
        <p class="">
          You <span class="font-bold">must include</span> the
          destination tag in the transaction or you will not receive your
          tokens
        </p>
      </template>
      <NumberValue
        :value="props.transaction.pay_address"
        label="Payment address"
      />
      <p class="">
        Pay{{" "}}
        <span class="font-bold">{{props.transaction.pay_amount}}</span> of{{" "}}
        <span class="font-bold">
          {{props.transaction.pay_currency.toUpperCase()}}
        </span>{{" "}}
        on the{{" "}}
        <span class="font-bold">
          {{props.transaction.network.toUpperCase()}}
        </span>{{" "}}
        network
        <template v-if="props.transaction.payin_extra_id">
          , with the destination tag of{{" "}}
          <span class="font-bold">
            {{props.transaction.payin_extra_id}}
          </span>
        </template>{{" "}}
        to the address above to confirm the payment.
      </p>
      <p class="">
        The tokens will automatically be deposited upon received payment.
        Note that it can take between 10 minutes and 1 hour for transactions
        to go through.
      </p>
      <p class="">
        Refresh the page to check your balance.
      </p>
    </template>
    <template v-if="status === 'expired'">
      <NumberValue :value="props.transaction.payment_id" label="Payment ID" />
      <p class="">
        This transaction has expired, do not send any more tokens as they
        may be lost. To try again create a new transaction.
      </p>
    </template>
    <template v-if="status === 'paid'">
      <NumberValue
        :value="props.transaction.pay_amount"
        :label="`Pay amount (${transaction.pay_currency.toUpperCase()})`"
      />
      <NumberValue
        :value="completedTransaction?.tokens_bought ?? '0'"
        label="You Received ($DOGEBALL)"
        noCopy
      />
      <NumberValue :value="props.transaction.payment_id" label="Payment ID" />
      <p class="">
        This transaction has completed successfully, do not send any more
        tokens as they may be lost. To try again create a new transaction.
      </p>
    </template>
  </Modal>
</template>