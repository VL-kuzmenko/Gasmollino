'use client'

import { useState } from 'react'
import { TOKENS } from '@/lib/tokens'
import { TokenSelect } from '@/components/TokenSelect/TokenSelect'
import RouteDetails from '../RouteDetails/RouteDetails'
import styles from '@/styles/Swap.module.css'

export default function Swap() {
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('USDC')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [quoteData, setQuoteData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async () => {
    const from = TOKENS.find((t) => t.symbol === fromToken)
    const to = TOKENS.find((t) => t.symbol === toToken)
    if (!from || !to || !amount) return

    const uiAmount = parseFloat(amount)
    const baseAmount = Math.floor(uiAmount * 10 ** from.decimals)

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${from.address}&outputMint=${to.address}&amount=${baseAmount}&slippageBps=50`
      )
      const data = await res.json()
      console.log(data)

      if (data && data.outAmount) {
        setQuoteData(data)
        const received = (parseFloat(data.outAmount) / 10 ** to.decimals).toFixed(4)
        setResult(`${amount} ${fromToken} ≈ ${received} ${toToken}`)
      } else {
        setQuoteData(null)
        setResult('Маршрут не найден или недостаточная ликвидность.')
      }
    } catch (err) {
      console.error('Ошибка при получении маршрута:', err)
      setResult('Ошибка при получении маршрута.')
    } finally {
      setLoading(false)
    }
  }

  const fromTokenObj = TOKENS.find((t) => t.symbol === fromToken)
  const toTokenObj = TOKENS.find((t) => t.symbol === toToken)

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Калькулятор обмена</h2>

      <div className={styles.selects}>
        <div className={styles.selectGroup}>
          <label className={styles.label}>Из</label>
          <TokenSelect value={fromToken} onChange={setFromToken} />
        </div>

        <div className={styles.selectGroup}>
          <label className={styles.label}>В</label>
          <TokenSelect value={toToken} onChange={setToToken} />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Сумма</label>
        <input
          type="number"
          className={styles.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Введите количество"
        />
      </div>

      <button
        className={styles.button}
        onClick={handleCalculate}
        disabled={!amount || isNaN(Number(amount)) || loading}
      >
        {loading ? 'Загрузка...' : 'Рассчитать маршрут'}
      </button>

      {result && <div className={styles.result}>{result}</div>}

      {quoteData && toTokenObj && (
        <div className={styles.routeDetails}>
          <RouteDetails
            outAmount={quoteData.outAmount}
            outDecimals={toTokenObj.decimals || 6} 
            marketInfos={quoteData.routePlan.map((step) => ({
              name: step.swapInfo.label,
              amount: step.swapInfo.outAmount,
              mint: step.swapInfo.outputMint,
            }))}
            priceImpactPct={quoteData.priceImpactPct}
            swapUsdValue={quoteData.swapUsdValue} 
            tokens={TOKENS}
          />
        </div>
      )}

      {quoteData && quoteData.routes && quoteData.routes.length === 0 && (
        <div className={styles.result}>Маршрут не найден или недостаточная ликвидность.</div>
      )}
    </div>
  )
}