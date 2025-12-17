<template>
  <div
    class="flex flex-col gap-3 sm:gap-4 min-w-0 overflow-hidden min-h-0 w-full"
  >
    <!-- Connect Wallet Prompt -->
    <div
      v-if="!presale.isConnected.value"
      class="flex flex-col items-center gap-4 py-8"
    >
      <p class="text-white/70 text-center font-grotesk">
        {{ t("presale.historyTab.connectWalletMessage") }}
      </p>
      <Button 
       @click="presale.connect" 
       :disabled="isBuying || presale.presaleEnded.value"
       variant="primary" 
       class="h-11 px-6 !bg-[#EB4102] !bg-none text-base font-semibold"
       style="border-radius: 80px"
>
        {{ t("presale.buyTab.connectWallet") }}
       <Spinner v-if="isBuying" :size="5" />
        <template v-else>
          <span>Connect Wallet</span>
        </template>
      </Button>
    </div>

    <template v-else>
      <!-- User Referral Data -->
      <div class="flex-shrink-0 flex flex-col gap-2 sm:gap-3 w-full">
        <UserReferralData />
      </div>

      <!-- Transactions Section -->
      <div
        class="flex flex-col gap-2 sm:gap-2 overflow-hidden w-full min-h-[300px]"
      >
        <p
          class="m-0 text-white font-grotesk text-sm sm:text-base md:text-lg font-semibold leading-none flex-shrink-0"
        >
          {{ t("presale.historyTab.yourTransactions") }}
        </p>
        <div
          class="flex flex-col gap-2 flex-1 rounded-xl sm:rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)] p-2 sm:p-3 overflow-y-auto w-full max-h-[35rem]"
          :style="{ colorScheme: 'dark' }"
        >
          <TransactionHistoryList />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import UserReferralData from "../user/UserReferralData.vue";
import TransactionHistoryList from "../transaction/TransactionHistoryList.vue";
import { Button } from "../ui";
import { usePresale } from "@/composables/usePresale";
import Spinner from "../ui/Spinner.vue";

const { t } = useI18n();
const presale = usePresale();

const handleBuy = async () => {
  if (!presale.isConnected.value) {
    presale.showConnectWalletModal();
    return;
  }
};
</script>
