<template>
  <div
    class="flex flex-col gap-3 sm:gap-4 min-w-0 overflow-hidden min-h-0 w-full"
  >
    <div
      class="flex max-sm:flex-col max-sm:items-start items-center justify-between gap-2"
    >
      <p
        class="m-0 text-white font-grotesk text-sm sm:text-base md:text-lg font-semibold leading-none flex-shrink-0 max-sm:w-full max-sm:text-center"
      >
        {{ t("presale.leaderboardTab.title") }}
      </p>
      <div
        class="flex gap-1 p-1 rounded-full border border-white/15 bg-white/10 max-sm:w-full max-sm:justify-between"
        role="group"
      >
        <button
          type="button"
          class="px-2.5 py-1.5 rounded-full text-xs font-grotesk font-medium transition-colors max-sm:flex-1"
          :class="
            showAllTime
              ? 'bg-white text-[#212F5C]'
              : 'text-white/70 hover:text-white'
          "
          @click="showAllTime = true"
        >
          {{ t("presale.leaderboardTab.allTime") }}
        </button>
        <button
          type="button"
          class="px-2.5 py-1.5 rounded-full text-xs font-grotesk font-medium transition-colors max-sm:flex-1"
          :class="
            !showAllTime
              ? 'bg-white text-[#212F5C]'
              : 'text-white/70 hover:text-white'
          "
          @click="showAllTime = false"
        >
          {{ t("presale.leaderboardTab.monthly") }}
        </button>
      </div>
    </div>

    <div
      class="flex flex-col gap-2 flex-1 rounded-xl sm:rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)] p-2 sm:p-3 overflow-y-auto w-full min-h-[300px]"
      :style="{ colorScheme: 'dark' }"
    >
      <div v-if="loading" class="py-8 text-center text-white/70 font-grotesk">
        {{ t("presale.leaderboardTab.loading") }}
      </div>
      <div v-else-if="error" class="py-8 text-center text-red-300 font-grotesk">
        {{ t("presale.leaderboardTab.error") }}
      </div>
      <div
        v-else-if="displayRows.length === 0"
        class="py-8 text-center text-white/70 font-grotesk"
      >
        {{ t("presale.leaderboardTab.empty") }}
      </div>
      <table v-else class="w-full table-fixed border-collapse text-left">
        <thead>
          <tr class="border-b border-white/10">
            <th
              class="w-[14%] sm:w-[16%] py-2 px-1.5 sm:px-2 text-[10px] sm:text-[11px] leading-tight uppercase tracking-wide text-white/50 font-semibold"
            >
              {{ t("presale.leaderboardTab.rank") }}
            </th>
            <th
              class="w-[34%] sm:w-[38%] py-2 px-1.5 sm:px-2 text-[10px] sm:text-[11px] leading-tight uppercase tracking-wide text-white/50 font-semibold"
            >
              {{ t("presale.leaderboardTab.wallet") }}
            </th>
            <th
              class="w-[18%] sm:w-[22%] py-2 px-1.5 sm:px-2 text-[10px] sm:text-[11px] leading-tight uppercase tracking-wide text-white/50 font-semibold text-right"
            >
              <span class="sm:hidden">Refs</span>
              <span class="hidden sm:inline">{{
                t("presale.leaderboardTab.referrals")
              }}</span>
            </th>
            <th
              class="w-[34%] sm:w-[24%] py-2 px-1.5 sm:px-2 text-[10px] sm:text-[11px] leading-tight uppercase tracking-wide text-white/50 font-semibold text-right"
            >
              <span class="sm:hidden">Earned</span>
              <span class="hidden sm:inline">{{
                t("presale.leaderboardTab.tokensEarned")
              }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in displayRows"
            :key="`${row.wallet_address}-${idx}`"
            class="border-b border-white/10 font-grotesk text-xs sm:text-sm"
            :class="row.isCurrentUser ? 'bg-[#FA7B55]/20' : ''"
          >
            <td class="py-2.5 px-1.5 sm:px-2 whitespace-nowrap">
              {{ formatRank(row.rank) }}
            </td>
            <td class="py-2.5 px-1.5 sm:px-2 font-mono text-xs sm:text-sm">
              <div class="truncate">
                {{ formatWallet(row.wallet_address) }}
              </div>
              <span
                v-if="row.isCurrentUser"
                class="hidden sm:inline ml-1 text-[10px] uppercase tracking-wider text-[#FA7B55]"
              >
                {{ t("presale.leaderboardTab.you") }}
              </span>
            </td>
            <td class="py-2.5 px-1.5 sm:px-2 text-right tabular-nums">
              {{ row.referral_count ?? "—" }}
            </td>
            <td class="py-2.5 px-1.5 sm:px-2 text-right tabular-nums">
              {{ formatTokensEarned(row) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import api from "@/api/presale";
import { useWallet } from "@/composables";
import { formatNumber, truncateString } from "@/utils/format";

const { t } = useI18n();
const { address, isConnected } = useWallet();

const loading = ref(true);
const error = ref(false);
const showAllTime = ref(true);
const topEntries = ref([]);
const userEntry = ref(null);

const normAddr = (value) => String(value || "").toLowerCase();

const normalizeUserPayload = (data) => {
  if (data == null) return null;
  return Array.isArray(data) ? (data[0] ?? null) : data;
};

const loadLeaderboard = async () => {
  loading.value = true;
  error.value = false;
  try {
    const period = { showAllTime: showAllTime.value };
    const userPromise =
      isConnected.value && address.value
        ? api.getUserLeaderboardRank(address.value, period)
        : Promise.resolve({ data: null });
    const [leaderboardRes, userRes] = await Promise.all([
      api.getLeaderboard(period),
      userPromise,
    ]);
    topEntries.value = Array.isArray(leaderboardRes.data)
      ? leaderboardRes.data
      : [];
    userEntry.value = normalizeUserPayload(userRes.data);
  } catch {
    error.value = true;
    topEntries.value = [];
    userEntry.value = null;
  } finally {
    loading.value = false;
  }
};

const displayRows = computed(() => {
  const currentAddress = address.value;
  const rows = (topEntries.value || []).map((entry) => ({
    ...entry,
    isCurrentUser:
      !!currentAddress &&
      normAddr(entry.wallet_address) === normAddr(currentAddress),
  }));
  if (!currentAddress || !isConnected.value) return rows;

  const isAlreadyInTop = rows.some((entry) => entry.isCurrentUser);
  if (isAlreadyInTop) return rows;

  if (
    userEntry.value?.wallet_address &&
    normAddr(userEntry.value.wallet_address) === normAddr(currentAddress)
  ) {
    rows.push({ ...userEntry.value, isCurrentUser: true });
  }
  return rows;
});

const formatWallet = (wallet) => {
  if (!wallet) return "—";
  return truncateString(wallet, 12);
};

const formatRank = (rank) => {
  if (rank == null || rank === "") return "—";
  const value = String(rank).trim();
  if (value.toUpperCase() === "N/A")
    return t("presale.leaderboardTab.notRanked");
  return value;
};

const formatTokensEarned = (row) => {
  const value = row?.total_earned ?? row?.total_earned_tokens;
  if (value == null || value === "") return "—";
  return formatNumber(value);
};

watch([showAllTime, address, isConnected], loadLeaderboard, {
  immediate: true,
});
</script>
