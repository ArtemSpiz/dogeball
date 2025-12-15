<template>
  <Modal
    :open="modalState.connectWalletModalOpen.value"
    @close="modalStore.hideConnectWalletModal"
    title="Connect your Wallet"
  >
    <div class="flex flex-col gap-2">
      <button
        v-for="conn in connections"
        :key="conn.key"
        class="flex items-center justify-start gap-4 px-4 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:shadow-[0_0_10px_0_rgba(84,100,216,0.3)]"
        @click="connectToConn(conn)"
      >
        <img :src="conn.icon" alt="" class="w-8 h-8 flex-shrink-0" />
        <span class="text-sm">{{ conn.label }}</span>
      </button>
    </div>
  </Modal>
</template>

<script setup>
import { useModalState } from "@/composables";
import Modal from "../ui/Modal.vue";
import { modalStore } from "@/presale-gg/stores";
import { getConfig } from "@/presale-gg/web3";
import { connect } from "@wagmi/core";
import { connections } from "@/presale-gg/web3";

defineEmits(["close"]);
const modalState = useModalState();

const connectToConn = async (conn) => {
  const { walletConnectModal, config } = await getConfig();
  if (conn.key === "walletconnect") {
    walletConnectModal.open();
  } else if (conn.onClick) {
    await conn.onClick();
  } else {
    connect(config, {
      connector: config.connectors[conn.connectorIndex],
    });
  }
  modalStore.hideConnectWalletModal();
};
</script>
