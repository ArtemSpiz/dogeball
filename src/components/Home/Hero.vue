<script setup>
import { useI18n } from "vue-i18n";
import CustomButton from "@/ui/CustomButton.vue";
import TimerCounter from "./TimerCounter.vue";
import Circle from "@/assets/img/Home/CircleText.png";

const { t } = useI18n();
import { useAccount, useToast } from "@/composables";
import { ref } from "vue";
import Spinner from "../PresaleWidget/ui/Spinner.vue";
import { presaleApi } from "@/api";

const accountData = useAccount();
const loading = ref(false);
const email = ref("");
const { showSuccess, showInfo, showError } = useToast();

const submit = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
	console.log(email.value)
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
      return;
    }
    showError(msg);
  }
  loading.value = false;
};
</script>

<template>
  <div
    class="h-screen 2xl:h-[calc(100vh+100px)] 2xl:max-h-[1400px] 2xl:bg-bottom max-md:h-[calc(100vh-30px)] max-md:min-h-[660px] relative min-h-[600px] px-5 pt-[100px] flex flex-col items-center justify-between pb-[56px] bg-[url('@/assets/img/Home/HeroBg.png')] max-xl:!bg-cover bgFill bg-[center_bottom] bg-no-repeat"
  >
    <div class="text-center flex flex-col items-center justify-center w-full">
      <div class="title max-w-[800px] px-3">
        {{ t("hero.title") }}
      </div>
      <div
        class="font-grotesk leading-[120%] text-base font-normal max-md:text-sm max-w-[470px] mt-4 max-md:px-3"
      >
        {{ t("hero.subtitle") }}
      </div>
      <TimerCounter />
    </div>

    <div
      class="max-w-[2000px] w-full flex justify-center items-center mx-auto relative max-md:static"
    >
      <div
        class="flex absolute bottom-0 left-[120px] max-xl:left-[20px] max-lg:hidden w-full max-w-[325px] max-xl:max-w-[300px] flex-col p-4 gap-4 border border-[#8B94F5] rounded-2xl bg-[rgba(53,19,147,0.52)] backdrop-blur-[5px] shadow-[0_0_154px_0_#263166]"
      >
        <div>
          <div class="text-sm leading-[140%] font-grotesk">
            {{ t("hero.whitelistEmail") }}
          </div>
          <input
            class="py-1 w-full px-2 h-10 border border-[#DCDCDC] rounded-lg bg-[rgba(255,255,255,0.06)] text-base font-medium text-[rgba(255,255,255,0.30)]"
        	@input="(e) => email = e.currentTarget.value"
            :placeholder="t('hero.emailPlaceholder')"
          />
        </div>
        <CustomButton :title="loading ? '' : t('hero.getEarlyAccess')" class="w-full" @click="submit">
          <Spinner v-if="loading" :size="6" />
        </CustomButton>
      </div>

      <div class="flex gap-4 items-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/DOGEBALLCoinsultAudit.pdf"
        >
          <CustomButton
            :title="t('hero.audit')"
            class="py-[18px] !text-[22px] !w-[160px] max-md:h-[50px]"
        /></a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/DOGEBALLWhitepaper.pdf"
        >
          <CustomButton
            :title="t('hero.whitepaper')"
            white-bg="true"
            class="py-[18px] !text-[22px] !w-[160px] max-md:h-[50px]"
        /></a>
      </div>

      <div
        class="w-[230px] max-md:w-[150px] absolute bottom-[-40px] max-lg:bottom-[50px] max-md:top-[400px] max-md:bottom-auto right-[120px] max-md:right-[10px] aspect-square"
      >
        <img :src="Circle" class="object-contain animate-rotateClockwise" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
