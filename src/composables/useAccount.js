import { ref } from 'vue'

// Mock account state - replace with actual wallet integration (e.g., wagmi, web3modal)
const address = ref(null)
const isConnected = ref(false)

export function useAccount() {
  // TODO: Replace with actual wallet connection logic
  const connect = async () => {
    // Mock connection
    address.value = '0x1234567890123456789012345678901234567890'
    isConnected.value = true
  }

  const disconnect = () => {
    address.value = null
    isConnected.value = false
  }

  return {
    address,
    isConnected,
    connect,
    disconnect,
  }
}


