<template>
  <CodeInputs
    :applied-text="appliedText"
    :loading="presale.referralCodeLoading.value"
    label="Referral Code"
    url-key="referral_code"
    placeholder="Enter referral code"
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
  const referredBy = presale.user.value?.referred_by;
  if (!referredBy) return null;
  return "Referral code applied!";
});

const handleApply = async (code) => {
  if (!presale.isConnected.value) {
    toast.showError("Please connect your wallet first");
    return;
  }

  if (!code?.trim()) {
    toast.showError("Please enter a referral code");
    return;
  }

  // Prevent self-referral
  if (code.trim() === presale.user.value?.referral_code) {
    toast.showError("You cannot use your own referral code");
    return;
  }

  try {
    await presale.applyReferralCode(code.trim());
    toast.showSuccess("Referral code applied successfully!");
  } catch (err) {
    const message =
      err?.response?.data?.message || err?.message || "Invalid referral code";
    toast.showError(message);
    throw err;
  }
};

const handleChange = () => {
  // Referral codes cannot be reset once applied
};
</script>
