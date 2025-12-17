<template>
  <CodeInputs
    :applied-text="appliedText"
    :loading="presale.bonusCodeLoading.value"
    :label="t('presale.bonusCode.label')"
    url-key="bonus_code"
    :placeholder="t('presale.bonusCode.placeholder')"
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

const { t } = useI18n();
const presale = usePresale();
const toast = useToast();

const appliedText = computed(() => {
  const bonusCode = presale.userData.appliedBonusCode.value;
  if (!bonusCode) return null;
  return (
    bonusCode.message ||
    `+${bonusCode.bonus_percent}% ${t("presale.bonusCode.applied")}`
  );
});

const handleApply = async (code) => {
  if (!presale.isConnected.value) {
    toast.showError(t("presale.bonusCode.connectWalletFirst"));
    return;
  }

  if (!code?.trim()) {
    toast.showError(t("presale.bonusCode.enterCode"));
    return;
  }

  try {
    const result = await presale.applyBonusCode(code.trim());
    toast.showSuccess(result.message || t("presale.bonusCode.appliedSuccess"));
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      t("presale.bonusCode.invalidCode");
    toast.showError(message);
    throw err;
  }
};

const handleChange = () => {
  presale.resetBonusCode();
};
</script>
