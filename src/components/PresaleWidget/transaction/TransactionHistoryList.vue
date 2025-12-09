<template>
  <div class="flex flex-col gap-2 flex-1 overflow-y-auto min-h-0">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col gap-2">
      <Skeleton v-for="i in 3" :key="i" class="h-20 w-full rounded-md" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="formattedTransactions.length === 0"
      class="flex flex-col items-center justify-center gap-3 py-8 text-white/60"
    >
      <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p class="text-sm font-grotesk">No transactions yet</p>
      <p class="text-xs text-white/40">Your purchases will appear here</p>
    </div>

    <!-- Transaction List -->
    <template v-else>
      <div
        v-for="trx in formattedTransactions"
        :key="trx.id"
        class="bg-white/10 p-2.5 sm:p-3 rounded-md flex flex-col gap-2 hover:bg-white/15 transition-colors"
      >
        <!-- Status Chips -->
        <div class="flex gap-1.5 sm:gap-2 flex-wrap">
          <TransactionChip
            v-for="(chip, idx) in getChips(trx)"
            :key="idx"
            :bg="chip.bg"
            :text-color="chip.textColor"
          >
            {{ chip.text }}
          </TransactionChip>
        </div>

        <!-- Transaction Details -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
          <div class="flex-1 min-w-0">
            <!-- Transaction Type Content -->
            <template v-if="trx.record_type === 'transaction'">
              <p class="text-xs sm:text-sm font-medium break-words text-white">
                {{ formatLargeNumber(parseNum(trx.payment_token_amount)) }}
                {{ trx.payment_token_name?.toUpperCase() }}
              </p>
              <p
                v-if="trx.tokens_bought !== null"
                class="text-[10px] sm:text-xs text-white/60 break-words"
              >
                {{ formatLargeNumber(parseNum(trx.tokens_bought)) }} $DOGEBALL
                for ${{ formatLargeNumber(parseNum(trx.payment_usd_amount)) }}
              </p>
              <p v-else class="text-[10px] sm:text-xs text-white/60">
                {{ trx.status === "pending" ? "Awaiting payment" : "Processing..." }}
              </p>
            </template>

            <template v-else-if="trx.record_type === 'manual_transaction'">
              <p class="text-xs sm:text-sm font-medium break-words text-white">
                +{{ formatLargeNumber(parseNum(trx.tokens_bought)) }} $DOGEBALL
              </p>
            </template>

            <template v-else-if="trx.record_type === 'bonus_transaction'">
              <p class="text-xs sm:text-sm font-medium break-words text-white">
                +{{ formatLargeNumber(parseNum(trx.bonus_token_amount)) }} $DOGEBALL
              </p>
            </template>
          </div>

          <!-- Date -->
          <div class="text-[10px] sm:text-xs text-white/60 flex-shrink-0">
            {{ formatDate(trx.created_at) }}
          </div>
        </div>

        <!-- Reason (for manual transactions) -->
        <p
          v-if="trx.record_type === 'manual_transaction' && trx.reason"
          class="text-[10px] sm:text-xs break-words text-white/80"
        >
          <span class="font-semibold">Reason:</span> {{ trx.reason }}
        </p>

        <!-- Extras (bonuses associated with this transaction) -->
        <div
          v-if="trx.extras && trx.extras.length > 0"
          class="flex flex-wrap gap-2 pt-1 border-t border-white/10"
        >
          <div
            v-for="(extra, idx) in trx.extras"
            :key="idx"
            class="text-[10px] text-white/60 bg-white/5 px-2 py-0.5 rounded"
          >
            {{ extra.label }}: +{{ formatLargeNumber(parseNum(extra.tokens_received)) }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Spinner, Skeleton } from "../ui";
import TransactionChip from "./TransactionChip.vue";
import { usePresale } from "@/composables/usePresale";
import { formatLargeNumber, parseNum, capitalize } from "@/utils/format";

const presale = usePresale();

const loading = ref(true);
const transactions = ref([]);

const STATUS_COLORS = {
  completed: ["#00bf9a", "#fff"],
  success: ["#00bf9a", "#fff"],
  error: ["#fa332f", "#fff"],
  failed: ["#fa332f", "#fff"],
  expired: ["#fa332f", "#fff"],
  pending: ["#bf7e15", "#fff"],
  waiting: ["#bf7e15", "#fff"],
  finalising: ["#0c6db3", "#fff"],
  processing: ["#0c6db3", "#fff"],
  confirming: ["#0c6db3", "#fff"],
  refunded: ["#00bf9a", "#fff"],
};

const groupedTransactions = computed(() => {
  const groups = [];

  transactions.value.forEach((trx) => {
    const trxId =
      "parent_transaction_id" in trx
        ? parseNum(trx.parent_transaction_id)
        : trx.record_type === "transaction"
        ? parseNum(trx.id)
        : null;

    if (trxId === null) {
      groups.push({ transactionId: null, transactions: [trx] });
      return;
    }

    let group = groups.find((g) => g.transactionId === trxId);
    if (!group) {
      group = { transactionId: trxId, transactions: [] };
      groups.push(group);
    }
    group.transactions.push(trx);
  });

  const getSortOrder = (type) =>
    ({
      transaction: 0,
      manual_transaction: 1,
      bonus_transaction: 2,
    }[type] ?? 3);

  groups.forEach((group) => {
    group.transactions.sort(
      (a, b) => getSortOrder(a.record_type) - getSortOrder(b.record_type)
    );
  });

  return groups;
});

const formattedTransactions = computed(() => {
  return groupedTransactions.value.map((group) => {
    if (group.transactions.length === 1) {
      return { ...group.transactions[0], extras: [] };
    }

    return {
      ...group.transactions[0],
      extras: group.transactions.slice(1).map((trx) => ({
        label:
          trx.record_type === "bonus_transaction"
            ? capitalize(trx.bonus_type)
            : trx.record_type === "manual_transaction"
            ? "Manual"
            : trx.record_type === "transaction"
            ? "Purchase"
            : "",
        tokens_received:
          trx.record_type === "bonus_transaction"
            ? trx.bonus_token_amount
            : trx.record_type === "manual_transaction" ||
              trx.record_type === "transaction"
            ? trx.tokens_bought
            : "0",
      })),
    };
  });
});

const getChips = (trx) => {
  const chips = [
    {
      text: capitalize(
        trx.record_type === "bonus_transaction"
          ? trx.bonus_type
          : trx.record_type === "transaction"
          ? "purchase"
          : trx.record_type?.replace("_", " ") || "transaction"
      ),
      bg: "#444",
      textColor: "#fff",
    },
  ];

  if (trx.status) {
    const statusKey = trx.status.toLowerCase();
    chips.push({
      text: capitalize(statusKey === "pending" ? "unpaid" : statusKey),
      bg: STATUS_COLORS[statusKey]?.[0] || "#444",
      textColor: STATUS_COLORS[statusKey]?.[1] || "#fff",
    });
  }

  if ("stage_name" in trx && trx.stage_name) {
    chips.push({
      text: trx.stage_name,
      bg: "#333",
      textColor: "#fff",
    });
  }

  return chips;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const fetchTransactions = async () => {
  if (!presale.address.value) {
    transactions.value = [];
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const data = await presale.getTransactionHistory(0, 50);
    transactions.value = data || [];
  } catch (err) {
    console.error("Failed to fetch transactions:", err);
    transactions.value = [];
  }
  loading.value = false;
};

// Fetch transactions when address changes
watch(
  () => presale.address.value,
  () => fetchTransactions(),
  { immediate: true }
);

// Refetch when buy state changes to finished
watch(
  () => presale.buyState.value,
  (state) => {
    if (state.type === "finished") {
      // Delay refetch to allow backend to process
      setTimeout(fetchTransactions, 2000);
    }
  }
);
</script>
