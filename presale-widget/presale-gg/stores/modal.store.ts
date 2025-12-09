import { map } from "nanostores";
import { useNanostore } from "../util";

export const defaultModalStore = {
  connectWalletModalOpen: false,
};

export const $modalState = map({ ...defaultModalStore });
export const useModalState = () => useNanostore($modalState, defaultModalStore);

export const showConnectWalletModal = () => {
  $modalState.setKey("connectWalletModalOpen", true);
};

export const hideConnectWalletModal = () => {
  $modalState.setKey("connectWalletModalOpen", false);
};
