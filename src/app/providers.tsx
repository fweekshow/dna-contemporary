"use client"

import { ReactNode, useEffect } from "react"
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'viem/chains'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { sdk } from "@farcaster/miniapp-sdk"

const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'DNA Contemporary',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
})

export function Providers({ children }: { children: ReactNode }) {
  // Initialize Farcaster SDK and call ready
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Call ready to signal the app is ready
        sdk.actions.ready()
        console.log('Farcaster SDK initialized and ready')
      } catch (error) {
        console.error('Error initializing Farcaster SDK:', error)
      }
    }

    initializeFarcaster()
  }, [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: 'auto',
            theme: 'snake',
            name: 'DNA Contemporary',
            logo: '/placeholder.svg',
          },
        }}
      >
        {children}
      </MiniKitProvider>
    </WagmiProvider>
  )
} 