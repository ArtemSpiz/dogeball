<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import ArrowDropDown from "@/assets/icons/ArrowDropDown.vue";
import TokenIcon1 from "@/assets/img/About/TokenIcon1.png";
import CustomButton from "@/ui/CustomButton.vue";
import { useWallet } from "@/composables/blockchain/useWallet";
import { useToast } from "@/composables/useToast";
import { claimFaucetTokens } from "@/api/faucet";

const wallet = useWallet();
const toast = useToast();

const { t } = useI18n();

const Tokens = [
  {
    icon: TokenIcon1,
    name: "0.01 $DOGEBALL",
    amount: 0.01,
  },
  {
    icon: TokenIcon1,
    name: "0.005 $DOGEBALL",
    amount: 0.005,
  },
];

const selectedToken = ref(Tokens[0]);
const isOpen = ref(false);
const walletAddress = ref("");
const isClaiming = ref(false);

// Auto-fill wallet address when connected
watch(
  () => wallet.address.value,
  (newAddress) => {
    if (newAddress) {
      walletAddress.value = newAddress;
    }
  },
  { immediate: true }
);

const selectToken = (token) => {
  selectedToken.value = token;
  isOpen.value = false;
};

const handleClaim = async () => {
  if (!walletAddress.value) {
    toast.showError("Please connect your wallet or enter a wallet address");
    return;
  }

  // Validate wallet address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress.value)) {
    toast.showError("Please enter a valid wallet address");
    return;
  }

  if (isClaiming.value) return;

  isClaiming.value = true;

  try {
    const result = await claimFaucetTokens({
      receiver: walletAddress.value,
      amount: selectedToken.value.amount,
    });

    if (result.success) {
      toast.showSuccess(
        `Successfully claimed ${
          selectedToken.value.name
        }! Transaction: ${result.transactionHash.slice(0, 10)}...`
      );
      // Reset form or show success state
    } else {
      toast.showError(result.message || "Failed to claim tokens");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to claim tokens. Please try again.";
    toast.showError(errorMessage);
  } finally {
    isClaiming.value = false;
  }
};
</script>

<template>
  <div
    class="flex justify-center px-5 max-md:py-12 items-center h-[590px] max-md:h-max text-center bg-[right_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/About/TokensBg.png')] max-md:bg-[url('@/assets/img/About/TokensBgMob.png')]"
  >
    <div
      class="p-8 rounded-2xl w-full bg-[rgba(53,19,147,0.52)] border border-[#8B94F5] shadow-[0_0_154px_0_#263166] max-md:shadow-[0_0_14px_0_#263166] backdrop-blur-sm flex flex-col gap-4 max-w-[600px]"
    >
      <div class="flex flex-col w-full gap-4">
        <div class="flex items-start flex-col relative">
          <div class="text-sm leading-[140%]">{{ t("ethL2.selectToken") }}</div>

          <div
            @click="isOpen = !isOpen"
            class="p-1 border w-full cursor-pointer rounded-lg gap-2 flex justify-between items-center border-[#DCDCDC] bg-[rgba(255,255,255,0.06)]"
          >
            <div class="flex items-center gap-2">
              <div class="w-8 aspect-square">
                <img :src="selectedToken.icon" class="object-contain" />
              </div>
              <div class="text-lg font-medium leading-[110%]">
                {{ selectedToken.name }}
              </div>
            </div>

            <ArrowDropDown
              :class="[
                'transition-transform duration-300',
                isOpen ? 'rotate-180' : '',
              ]"
            />
          </div>

          <div
            v-if="isOpen"
            class="absolute z-50 top-[65px] w-full rounded-xl overflow-hidden border border-[#8B94F5] bg-[rgba(30,10,90,0.9)] backdrop-blur-xl shadow-[0_0_40px_0_#1a1449]"
          >
            <div
              v-for="token in Tokens"
              :key="token.name"
              @click="selectToken(token)"
              class="flex items-center gap-3 px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-[rgba(255,255,255,0.10)]"
              :class="{
                'bg-[rgba(255,255,255,0.15)]':
                  selectedToken.name === token.name,
              }"
            >
              <img :src="token.icon" class="w-7 h-7 object-contain" />
              <span class="text-white text-lg">{{ token.name }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-start flex-col">
          <div class="text-sm leading-[140%]">
            {{ t("ethL2.walletAddress") }}
          </div>
          <input
            :placeholder="t('ethL2.walletAddressPlaceholder')"
            class="p-2 w-full max-h-[40px] border rounded-lg gap-2 flex items-center border-[#DCDCDC] bg-[rgba(255,255,255,0.06)] placeholder:text-lg max-md:placeholder:text-xs text-lg max-md:text-base placeholder:text-[rgba(255,255,255,0.30)] text-[rgba(255,255,255,0.30)]"
          />
        </div>
      </div>

      <CustomButton
        :title="t('ethL2.comingSoon')"
        class="w-full"
        @click="handleClaim"
      />
    </div>
  </div>
</template>
