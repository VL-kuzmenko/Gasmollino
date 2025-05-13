import SwapCalculator from '@/components/Swap/Swap'
import WalletGate from '@/components/WalletGate/WalletGate'

export default function Home() {
  return (
    <WalletGate>
      <main >
        <h1 >Добро пожаловать в Gasmollino</h1>
        <p >Теперь ты можешь найти самые выгодные маршруты обмена!</p>
        <SwapCalculator />
      </main>
    </WalletGate>
  )
}