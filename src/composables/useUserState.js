import { $userState } from "@/presale-gg/stores/user.store";
import { useStore } from "@nanostores/vue";
import { computed, ref } from "vue";

export function useUserState() {
  const userData = useStore($userState)

  return {
    user: computed(() => userData.value.user),
    userStakeData: computed(() => userData.value.userStakeData),
    appliedBonusCode: computed(() => userData.value.appliedBonusCode),
  };
}
