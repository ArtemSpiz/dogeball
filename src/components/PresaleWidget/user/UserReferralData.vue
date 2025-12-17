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
          item.label === t('presale.referralData.yourReferralLink')
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
          :title="`${t('presale.referralData.copy')} ${item.label}`"
        />
      </template>
    </InfoCard>

    <!-- Referral Stats (if user has referrals) -->
    <div v-if="hasReferralStats" class="grid grid-cols-2 gap-2 mt-2">
      <div
        class="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/10"
      >
        <span class="text-2xl font-bold text-white">
          {{ referralStats.totalReferrals }}
        </span>
        <span class="text-xs text-white/60">{{
          t("presale.referralData.totalReferrals")
        }}</span>
      </div>
      <div
        class="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-white/10"
      >
        <span class="text-2xl font-bold text-[#00bf9a]">
          {{ formatLargeNumber(referralStats.totalEarned) }}
        </span>
        <span class="text-xs text-white/60">{{
          t("presale.referralData.tokensEarned")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { InfoCard } from "../ui";
import CopyButton from "../shared/CopyButton.vue";
import { usePresale } from "@/composables/usePresale";
import { formatLargeNumber, parseNum } from "@/utils/format";

const { t } = useI18n();
const presale = usePresale();

const referralLink = computed(() => {
  const referralCode = presale.user.value?.referral_code ?? "";
  if (!referralCode) return "";
  return `${window.location.origin}?referral_code=${referralCode}`;
});

const referralData = computed(() => [
  {
    label: t("presale.referralData.yourReferralLink"),
    value: referralLink.value,
  },
  {
    label: t("presale.referralData.yourReferralCode"),
    value: presale.user.value?.referral_code ?? "",
  },
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
