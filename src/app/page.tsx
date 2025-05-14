import WalletGate from '@/components/WalletGate/WalletGate';
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <WalletGate>
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to <span className={styles.brand}>Gasmollino</span></h1>
        <p className={styles.subtitle}>
          Discover the most efficient and cost-effective token swap routes across Solana.
        </p>
        <Link href="/swap" className={styles.button}>
          Start Swapping
        </Link>
      </div>
    </main>
    </WalletGate>
  )
}