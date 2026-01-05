<template>
  <CodeInputs
    :applied-text="appliedText"
    :loading="presale.referralCodeLoading.value"
    :label="t('presale.referralCode.label')"
    url-key="referral_code"
    :placeholder="t('presale.referralCode.placeholder')"
    @apply="handleApply"
    @change="handleChange"
  />
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { usePresale } from "@/composables/usePresale";
import { useToast } from "@/composables/useToast";
import CodeInputs from "./CodeInputs.vue";
import { userResetReferralCode } from "@/presale-gg/stores/user.store";
import { presaleApi } from "@/api";

const { t } = useI18n();
const presale = usePresale();
const toast = useToast();

const appliedText = computed(() => {
  const referredBy = presale.user.value?.referred_by;
  if (!referredBy) return null;
  return t("presale.referralCode.applied");
});

const handleApply = async (code) => {
  if (!presale.isConnected.value) {
    toast.showError(t("presale.referralCode.connectWalletFirst"));
    return;
  }

  if (!code?.trim()) {
    toast.showError(t("presale.referralCode.enterCode"));
    return;
  }

  // Prevent self-referral
  if (code.trim() === presale.user.value?.referral_code) {
    toast.showError(t("presale.referralCode.cannotUseOwn"));
    return;
  }

  try {
    await presale.applyReferralCode(code.trim());
    toast.showSuccess(t("presale.referralCode.appliedSuccess"));
  } catch (err) {
    const message = presaleApi.getApiErrorMessage(err, t("presale.referralCode.invalidCode"))
    toast.showError(message);
    throw err;
  }
};

const handleChange = () => {
  userResetReferralCode()
};
</script>
