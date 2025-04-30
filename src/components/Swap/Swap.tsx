'use client'

import { useState } from 'react'
import { TokenSelect } from '../TokenSelect/TokenSelect'
import styles from '@/styles/Swap.module.css'

export default function SwapCalculator() {
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('USDC')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const handleCalculate = () => {
    const mockRate = 22.37
    const route = (parseFloat(amount) * mockRate).toFixed(2)
    setResult(`${amount} ${fromToken} ≈ ${route} ${toToken}`)
  }

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
        disabled={!amount || isNaN(Number(amount))}
      >
        Рассчитать маршрут
      </button>

      {result && <div className={styles.result}>{result}</div>}
    </div>
  )
}