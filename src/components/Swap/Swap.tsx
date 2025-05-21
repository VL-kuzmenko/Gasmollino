'use client'

import { useEffect, useState } from 'react'
import { TokenSelect } from '@/components/TokenSelect/TokenSelect'
import RouteDetails from '../RouteDetails/RouteDetails'
import styles from '@/styles/Swap.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useTokenList } from '@/hooks/useTokenList'

export default function Swap() {
  const { tokens: tokenList, loading } = useTokenList()
  const [fromToken, setFromToken] = useState<string | null>(null)
  const [toToken, setToToken] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [quoteData, setQuoteData] = useState<any | null>(null)

  useEffect(() => {
    console.log(tokenList);
    
  if (!fromToken && !toToken && tokenList.length > 0) {
    const sol = tokenList.find(t => t.symbol === 'SOL')
    const usdc = tokenList.find(t => t.symbol === 'USDC')
    if (sol && usdc) {
      setFromToken(sol.address)
      setToToken(usdc.address)
    }
  }
  }, [tokenList])

  const handleCalculate = async () => {
    const from = tokenList.find((t) => t.address === fromToken)
    const to = tokenList.find((t) => t.address === toToken)
    if (!from || !to || !amount) return

    const uiAmount = parseFloat(amount)
    const baseAmount = Math.floor(uiAmount * 10 ** from.decimals)

    setResult(null)

    try {
      const res = await axios.get('https://public.jupiterapi.com/quote', {
        params: {
          inputMint: from.address,
          outputMint: to.address,
          amount: baseAmount,
          slippageBps: 50,
        },
      })

      const data = res.data
      console.log(data)

      if (data && data.outAmount) {
        setQuoteData(data)
        const received = (parseFloat(data.outAmount) / 10 ** to.decimals).toFixed(4)
        setResult(`${amount} ${from.symbol} ≈ ${received} ${to.symbol}`)
      } else {
        setQuoteData(null)
        setResult('No route found or insufficient liquidity.')
      }
    } catch (err) {
      console.error('Error while fetching quote:', err)
      setResult('Failed to fetch route.')
    }
  }

  const toTokenObj = tokenList.find((t) => t.address === toToken)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/" className={styles.homeLink}>To Home</Link>
        <h2 className={styles.heading}>Token Swap Calculator</h2>
        <p className={styles.subheading}>
          Get the most efficient route for swapping tokens across Solana DEXes.
        </p>

        <div className={styles.selects}>
          <div className={styles.selectGroup}>
            <label className={styles.label}>From</label>
            <TokenSelect tokens={tokenList} value={fromToken} onChange={setFromToken} />
          </div>

          <div className={styles.selectGroup}>
            <label className={styles.label}>To</label>
            <TokenSelect tokens={tokenList} value={toToken} onChange={setToToken} />
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
              tokens={tokenList}
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