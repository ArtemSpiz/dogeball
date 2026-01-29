<script setup>
import { useI18n } from "vue-i18n";
import CustomButton from "@/ui/CustomButton.vue";
import TimerCounter from "./TimerCounter.vue";
import Circle from "@/assets/img/Home/CircleText.png";
import { Vue3Marquee } from "vue3-marquee";

const { t } = useI18n();
import { useAccount, useToast } from "@/composables";
import { ref, computed, onMounted, onUnmounted } from "vue";
import Spinner from "../PresaleWidget/ui/Spinner.vue";
import { presaleApi } from "@/api";

const accountData = useAccount();
const loading = ref(false);
const email = ref("");
const { showSuccess, showInfo, showError } = useToast();

const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const tickerDuration = computed(() => (isMobile.value ? 15 : 12));

const submit = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    console.log(email.value);
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
  <div class="relative">
    <div
      class="absolute top-[70px] left-0 right-0 bg-[#8B94F5] text-white py-1 overflow-hidden z-10 max-xl:top-[40px]"
    >
      <Vue3Marquee
        :duration="tickerDuration"
        :pause-on-hover="false"
        :clone="true"
        direction="normal"
      >
        <div class="shrink-0 px-6 flex items-center">
          <span class="font-grotesk font-semibold text-xs whitespace-nowrap">
            $DOGEBALL TOKEN PRESALE IS LIVE!
          </span>
        </div>
      </Vue3Marquee>
    </div>
    <div
      class="h-screen 2xl:max-h-[1400px] 2xl:bg-bottom max-md:h-auto max-md:min-h-[440px] relative min-h-[600px] px-5 pt-[100px] max-md:pt-[80px] flex flex-col items-center justify-between pb-[56px] max-md:pb-[30px] bg-[url('@/assets/img/Home/HeroBg.png')] max-xl:!bg-cover bgFill bg-[center_bottom] bg-no-repeat mobile-bg-crop"
    >
      <div class="text-center flex flex-col items-center justify-center w-full">
        <div class="title max-w-[800px] px-3">
          {{ t("hero.title") }}
        </div>
        <!-- <div class="title max-w-[800px] px-3 mt-2">
          {{ t("hero.whitelistSignup") }}
        </div> -->
        <div
          class="font-grotesk leading-[120%] text-base font-normal max-md:text-sm max-w-[470px] mt-4 max-md:mt-3 max-md:px-3 subtitle-text"
        >
          {{ t("hero.subtitle") }}
        </div>
        <!-- <div
          class="font-grotesk leading-[120%] text-base font-normal max-md:text-sm max-w-[470px] mt-6 max-md:mt-2"
        >
          {{ t("hero.presaleLaunch") }}
        </div> -->
        <TimerCounter />
      </div>

      <div
        class="max-w-[2000px] w-full flex justify-center items-center mx-auto relative max-md:static"
      >
        <!-- <div
          class="flex absolute bottom-0 left-[120px] max-xl:left-[20px] max-lg:hidden w-full max-w-[325px] max-xl:max-w-[300px] flex-col p-4 gap-4 border border-[#8B94F5] rounded-2xl bg-[rgba(53,19,147,0.52)] backdrop-blur-[5px] shadow-[0_0_154px_0_#263166]"
        >
          <div>
            <div class="text-sm leading-[140%] font-grotesk">
              {{ t("hero.whitelistEmail") }}
            </div>
            <input
              class="py-1 w-full px-2 h-10 border border-[#DCDCDC] rounded-lg bg-[rgba(255,255,255,0.06)] text-base font-medium text-[rgba(255,255,255,0.30)]"
              @input="(e) => (email = e.currentTarget.value)"
              :placeholder="t('hero.emailPlaceholder')"
            />
          </div>
          <CustomButton
            :title="loading ? '' : t('hero.getEarlyAccess')"
            class="w-full"
            @click="submit"
          >
            <Spinner v-if="loading" :size="6" />
          </CustomButton>
        </div> -->

        <div class="flex gap-4 items-center max-md:hidden">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/DOGEBALLCoinsultAudit.pdf"
          >
            <CustomButton
              :title="t('hero.audit')"
              class="py-[18px] !text-[22px] !w-[160px]"
          /></a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/DOGEBALLWhitepaper.pdf"
          >
            <CustomButton
              :title="t('hero.whitepaper')"
              white-bg="true"
              class="py-[18px] !text-[22px] !w-[160px]"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .mobile-bg-crop {
    background-size: 250% auto !important;
    background-position: center bottom !important;
  }
}

/* Improve subtitle readability on mobile */
.subtitle-text {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9);
}

@media (max-width: 768px) {
  .subtitle-text {
    text-shadow: 
      0 2px 20px rgba(0, 0, 0, 1),
      0 1px 8px rgba(0, 0, 0, 1),
      0 0 4px rgba(0, 0, 0, 1),
      0 4px 16px rgba(0, 0, 0, 0.9);
    /* Optional: Add subtle backdrop for extra readability */
    /* background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    padding: 8px 12px;
    border-radius: 8px; */
  }
}
</style>
