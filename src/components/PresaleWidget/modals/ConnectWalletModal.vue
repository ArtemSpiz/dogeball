<template>
  <Modal
    :open="modalState.connectWalletModalOpen.value"
    @close="modalStore.hideConnectWalletModal"
    title="Connect your Wallet"
  >
    <div className="flex flex-col gap-2">
      <button
        v-for="conn in connections"
        class="flex items-center justify-start gap-4 p-2 rounded-md hover:bg-[#000]/10 transition-colors"
        @click="connectToConn(conn)"
      >
        <img :src="conn.icon" alt="" className="w-8 h-8" />
        {{ conn.label  }}
      </button>
  </div>
  </Modal>
</template>

<script setup>
  import { useModalState } from '@/composables';
  import Modal from '../ui/Modal.vue';
  import { modalStore } from '@/presale-gg/stores';
  import { getConfig } from '@/presale-gg/web3';
  import { connect } from '@wagmi/core';
  import { connections } from '@/presale-gg/web3';
  
  defineEmits(["close"])
  const modalState = useModalState()
  
  const connectToConn = async (conn) => {
    const { walletConnectModal, config } = await getConfig();
    if (conn.key === "walletconnect") {
      walletConnectModal.open();
    } else if (conn.onClick) {
      await conn.onClick();
    } else {
      connect(config, {
        connector:
          config.connectors[conn.connectorIndex],
      });
    }
    modalStore.hideConnectWalletModal();
  }
</script>