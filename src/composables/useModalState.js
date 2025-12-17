import { $modalState } from "@/presale-gg/stores/modal.store";
import { useStore } from "@nanostores/vue";
import { computed } from "vue";

export function useModalState() {
  const modalData = useStore($modalState)

  return {
    connectWalletModalOpen: computed(() => modalData.value.connectWalletModalOpen),
  };
}
