<template>
  <div class="flex flex-col gap-2">
    <InfoCard
      v-for="item in referralData"
      :key="item.label"
      :label="item.label"
      :loading="!presale.user.value"
    >
      <span
        :class="
          item.label === 'Your Referral Link'
            ? 'max-w-full sm:max-w-[380px] truncate block text-sm'
            : 'text-sm'
        "
      >
        {{ item.value || "—" }}
      </span>
      <template #action>
        <CopyButton
          v-if="item.value"
          :text="item.value"
          :title="`Copy ${item.label}`"
        />
      </template>
    </InfoCard>

    <!-- Referral Stats (if user has referrals) -->
    <div
      v-if="hasReferralStats"
      class="grid grid-cols-2 gap-2 mt-2"
    >
      <div
        class="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/10"
      >
        <span class="text-2xl font-bold text-white">
          {{ referralStats.totalReferrals }}
        </span>
        <span class="text-xs text-white/60">Total Referrals</span>
      </div>
      <div
        class="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/10"
      >
        <span class="text-2xl font-bold text-[#00bf9a]">
          {{ formatLargeNumber(referralStats.totalEarned) }}
        </span>
        <span class="text-xs text-white/60">Tokens Earned</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { InfoCard } from "../ui";
import CopyButton from "../shared/CopyButton.vue";
import { usePresale } from "@/composables/usePresale";
import { formatLargeNumber, parseNum } from "@/utils/format";

const presale = usePresale();

const referralLink = computed(() => {
  const referralCode = presale.user.value?.referral_code ?? "";
  if (!referralCode) return "";
  return `${window.location.origin}?referral_code=${referralCode}`;
});

const referralData = computed(() => [
  { label: "Your Referral Link", value: referralLink.value },
  { label: "Your Referral Code", value: presale.user.value?.referral_code ?? "" },
]);

const hasReferralStats = computed(() => {
  const user = presale.user.value;
  return user?.total_referrals > 0 || parseNum(user?.referral_earnings) > 0;
});

const referralStats = computed(() => ({
  totalReferrals: presale.user.value?.total_referrals ?? 0,
  totalEarned: parseNum(presale.user.value?.referral_earnings ?? 0),
}));
</script>
