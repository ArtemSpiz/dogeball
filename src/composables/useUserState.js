import { ref } from "vue";

// Mock user state - replace with actual user data from API
const user = ref({
  referral_code: "5ufR0RB2zJdZ",
});
const userStakeData = ref(null);
const appliedBonusCode = ref(null);

export function useUserState() {
  // TODO: Replace with actual user data fetching
  return {
    user,
    userStakeData,
    appliedBonusCode,
  };
}
