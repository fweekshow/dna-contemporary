"use client"

import { ReactNode } from "react"
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'viem/chains'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'

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