<template>
  <div class="flex flex-col gap-3 sm:gap-4 min-w-0 overflow-hidden min-h-0 w-full">
    <!-- Connect Wallet Prompt -->
    <div
      v-if="!presale.isConnected.value"
      class="flex flex-col items-center gap-4 py-8"
    >
      <p class="text-white/70 text-center font-grotesk">
        Connect your wallet to view your dashboard
      </p>
      <Button @click="presale.connect" variant="primary" class="px-8">
        Connect Wallet
      </Button>
    </div>

    <template v-else>
      <!-- User Referral Data -->
      <div class="flex-shrink-0 flex flex-col gap-2 sm:gap-3 w-full">
        <UserReferralData />
      </div>

      <!-- Transactions Section -->
      <div class="flex flex-col gap-2 sm:gap-2 overflow-hidden w-full min-h-[300px]">
        <p
          class="m-0 text-white font-grotesk text-sm sm:text-base md:text-lg font-semibold leading-none flex-shrink-0"
        >
          Your Transactions
        </p>
        <div
          class="flex flex-col gap-2 flex-1 rounded-xl sm:rounded-2xl border border-white/20 bg-[rgba(8,12,35,0.48)] p-2 sm:p-3 overflow-y-auto w-full"
        >
          <TransactionHistoryList />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import UserReferralData from "../user/UserReferralData.vue";
import TransactionHistoryList from "../transaction/TransactionHistoryList.vue";
import { Button } from "../ui";
import { usePresale } from "@/composables/usePresale";

const presale = usePresale();
</script>
