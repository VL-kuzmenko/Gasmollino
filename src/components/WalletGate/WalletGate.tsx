'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import styles from '@/styles/WalletGate.module.css'

export default function WalletGate({ children }: { children: React.ReactNode }) {
  const { connected, connect, connecting, wallets, select } = useWallet()

  const handleConnect = async () => {
    if (!wallets || wallets.length === 0) {
      alert('No wallets available.')
      return
    }

    if (!wallets.find(w => w.readyState === 'Installed')) {
      alert('No wallet installed. Please install a wallet extension.')
      return
    }

    try {
      await select(wallets[0].adapter.name)
      await connect()
    } catch (err) {
      console.error('Connection error:', err)
    }
  }

  if (!connected) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.wallet}>
          <h2 className={styles.heading}>Connect your Wallet</h2>
          <button className={styles.connectButton} onClick={handleConnect} disabled={connecting}>
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}