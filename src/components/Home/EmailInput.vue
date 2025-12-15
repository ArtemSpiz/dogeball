<script setup>
  import { useAccount, useToast } from '@/composables';
  import CustomButton from '@/ui/CustomButton.vue';
  import { ref } from 'vue';
  import Spinner from '../PresaleWidget/ui/Spinner.vue';
import { presaleApi } from '@/api';

  const accountData = useAccount();
  const loading = ref(false)
  const email = ref("");
  const { showSuccess, showInfo, showError } = useToast()

  const submit = async () => {
    if (loading.value) return
    loading.value = true
     try {
      await presaleApi.postLeads({
        email: email.value,
        wallet_address: accountData.address.value ?? undefined,
      });
      showSuccess("Successfully submitted details");
    } catch (err) {
      const msg = presaleApi.getApiErrorMessage(err, "Error submitting details");
      if (msg.toLowerCase() === "user details already exist") {
        showInfo(msg);
        loading.value = false;
        return
      }
      showError(msg);
    }
    loading.value = false
  };
</script>

<template>
  <div
    class="hidden mx-auto max-lg:flex my-12 w-full max-w-[325px] flex-col p-4 gap-4 border border-[#8B94F5] rounded-2xl bg-[rgba(53,19,147,0.52)] backdrop-blur-[5px] shadow-[0_0_20px_0_#263166]"
  >
    <div>
      <div class="text-sm leading-[140%] font-grotesk mb-1">
        Enter email to be added to the Whitelist
      </div>
      <input
        class="py-1 w-full px-2 h-10 border border-[#DCDCDC] rounded-lg bg-[rgba(255,255,255,0.06)] text-base font-medium text-[rgba(255,255,255,0.30)]"
        placeholder="your email"
        @input="(e) => email = e.currentTarget.value"
      />
    </div>
    <CustomButton :title="loading ? '' : 'Get early access!'" class="w-full" @click="submit">
      <Spinner v-if="loading" :size="6" />
    </CustomButton>
  </div>
</template>

<style lang="scss" scoped></style>
