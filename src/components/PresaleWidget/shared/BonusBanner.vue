<template>
  <div
    class="flex flex-col justify-center items-center gap-3 rounded-2xl border border-white/20 bg-white/10 shadow-[0_0_14px_0_#5464D8] backdrop-blur-sm px-6 max-md:p-4 py-4 w-full max-w-[519px]"
  >
    <p
      class="text-white text-center font-grotesk font-medium text-sm max-md:text-xs leading-[120%]"
    >
      {{ t("presale.bonusBanner.turnRewards") }}<br />
      <span class="font-semibold">{{
        t("presale.bonusBanner.dashboardEarn")
      }}</span>
      <!-- {{ t("presale.bonusBanner.turnRewardsSuffix") }} -->
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { CopyIcon, CheckIcon } from "../icons";

const { t } = useI18n();

const BONUS_CODE = "DOGEBALL10";
const copied = ref(false);

const copyBonusCode = async () => {
  try {
    await navigator.clipboard.writeText(BONUS_CODE);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = BONUS_CODE;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
};
</script>
