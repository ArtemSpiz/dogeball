"use client";

import { connections } from "../../../presale-gg/web3/config";
import Modal from "./Modal";
import Image from "next/image";
import { wagmiAdapter } from "../../../config";
import { connect } from "@wagmi/core";
import { hideConnectWalletModal, useModalState } from "../../../presale-gg/stores";
import { useAppKit } from "@reown/appkit/react";

const ConnectWalletModal = () => {
  const modalState = useModalState();
  const { open: openWalletConnectModal } = useAppKit();

  return (
    <Modal
      open={modalState.connectWalletModalOpen}
      onClose={hideConnectWalletModal}
      title="Connect your Wallet"
    >
      <div className="flex flex-col gap-2">
        {connections.map((conn) => (
          <button
            className="flex items-center justify-start gap-4 p-2 rounded-md hover:bg-[#000]/10 transition-colors"
            key={conn.key}
            onClick={async () => {
              if (conn.key === "walletconnect") {
                openWalletConnectModal();
              } else if (conn.onClick) {
                await conn.onClick();
              } else {
                if (!wagmiAdapter) return;
                connect(wagmiAdapter.wagmiConfig, {
                  connector:
                    wagmiAdapter.wagmiConfig.connectors[conn.connectorIndex],
                });
              }
              hideConnectWalletModal();
            }}
          >
            <Image src={conn.icon} alt="" className="w-8 h-8" />
            {conn.label}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
