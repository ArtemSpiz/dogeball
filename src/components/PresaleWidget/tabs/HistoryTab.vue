<template>
  <div
    class="flex flex-col gap-3 sm:gap-4 min-w-0 overflow-hidden min-h-0 w-full"
  >
    <div v-if="!address" class="flex flex-col items-center gap-4 py-8">
      <p class="text-white/70 text-center font-grotesk">
        {{ t("presale.historyTab.connectWalletMessage") }}
      </p>
      <Button
        variant="primary"
        class="h-11 px-6 !bg-[#EB4102] !bg-none text-base font-semibold"
        style="border-radius: 80px"
		@click="showConnectWalletModal"
      >
        {{ t("presale.buyTab.connectWallet") }}
      </Button>
    </div>

    <template v-if="address">
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
import { Button } from "../ui";
import { TransactionHistoryList } from "../transaction";
import { showConnectWalletModal } from "@/presale-gg/stores/modal.store";
import { useWallet } from "@/composables";
import { UserReferralData } from "../user";

const { address } = useWallet()
const { t } = useI18n();
</script>
