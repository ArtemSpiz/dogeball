<template>
  <CodeInputs
    :applied-text="appliedText"
    :loading="presale.bonusCodeLoading.value"
    label="Bonus Code"
    url-key="bonus_code"
    placeholder="Enter bonus code"
    @apply="handleApply"
    @change="handleChange"
  />
</template>

<script setup>
import { computed } from "vue";
import { usePresale } from "@/composables/usePresale";
import { useToast } from "@/composables/useToast";
import CodeInputs from "./CodeInputs.vue";

const presale = usePresale();
const toast = useToast();

const appliedText = computed(() => {
  const bonusCode = presale.userData.appliedBonusCode.value;
  if (!bonusCode) return null;
  return bonusCode.message || `+${bonusCode.bonus_percent}% bonus applied!`;
});

const handleApply = async (code) => {
  if (!presale.isConnected.value) {
    toast.showError("Please connect your wallet first");
    return;
  }

  if (!code?.trim()) {
    toast.showError("Please enter a bonus code");
    return;
  }

  try {
    const result = await presale.applyBonusCode(code.trim());
    toast.showSuccess(result.message || "Bonus code applied successfully!");
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || "Invalid bonus code";
    toast.showError(message);
    throw err;
  }
};

const handleChange = () => {
  presale.resetBonusCode();
};
</script>
