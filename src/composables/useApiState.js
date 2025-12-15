import { $apiState } from "@/presale-gg/stores/api.store";
import { useStore } from "@nanostores/vue";
import { computed } from "vue";

export function useApiState() {
  const apiData = useStore($apiState)

  return {
    stage: computed(() => apiData.value.stage),
    stageLoading: computed(() => apiData.value.stageLoading),
    paymentTokens: computed(() => apiData.value.paymentTokens),
    paymentTokensLoading: computed(() => apiData.value.paymentTokensLoading),
    presaleEnded: computed(() => apiData.value.presaleEnded),
    leaderboard: computed(() => apiData.value.leaderboard),
    info: computed(() => apiData.value.info),
    infoLoading: computed(() => apiData.value.infoLoading),
  };
}
