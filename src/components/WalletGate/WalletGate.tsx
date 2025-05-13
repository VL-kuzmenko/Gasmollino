'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function WalletGate({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet()

  if (!connected) {
    return (
      <div>
        <h2>Connect your Wallet</h2>
        <WalletMultiButton />
      </div>
    )
  }

  return <>{children}</>
}