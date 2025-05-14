'use client'

import { useState } from 'react'
import { TOKENS } from '@/lib/tokens'
import { TokenSelect } from '@/components/TokenSelect/TokenSelect'
import RouteDetails from '../RouteDetails/RouteDetails'
import styles from '@/styles/Swap.module.css'
import Link from 'next/link'

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
        setResult('No route found or insufficient liquidity.')
      }
    } catch (err) {
      console.error('Error while fetching quote:', err)
      setResult('Failed to fetch route.')
    } finally {
      setLoading(false)
    }
  }

  const toTokenObj = TOKENS.find((t) => t.symbol === toToken)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/" className={styles.homeLink}>
          To Home
        </Link>
        <h2 className={styles.heading}>Token Swap Calculator</h2>
        <p className={styles.subheading}>
          Get the most efficient route for swapping tokens across Solana DEXes.
        </p>

        <div className={styles.selects}>
          <div className={styles.selectGroup}>
            <label className={styles.label}>From</label>
            <TokenSelect value={fromToken} onChange={setFromToken} />
          </div>

          <div className={styles.selectGroup}>
            <label className={styles.label}>To</label>
            <TokenSelect value={toToken} onChange={setToToken} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Amount</label>
          <input
            type="number"
            className={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <button
          className={styles.button}
          onClick={handleCalculate}
          disabled={!amount || isNaN(Number(amount)) || loading}
        >
          {loading ? 'Calculating...' : 'Find Best Route'}
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
          <div className={styles.result}>No route found or insufficient liquidity.</div>
        )}
      </div>
    </div>
  )
}