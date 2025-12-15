import { computed, ref } from 'vue'
import { getWagmiConfig } from './blockchain'
import { useAccount as useOriginalAccount } from '@/presale-gg/web3'
import { disconnect as disconnectWagmi } from "@wagmi/core"

export function useAccount() {
  const accountData = useOriginalAccount()
  
  const disconnect = async () => {
    const config = await getWagmiConfig()
    await disconnectWagmi(config)
    // Have to disconnect twice sometimes
    setTimeout(() => disconnectWagmi(config), 100)
  }

  return {
    address: computed(() => accountData.value?.address ?? null),
    isConnected: computed(() => accountData.value?.isConnected ?? false),
    disconnect,
  }
}





