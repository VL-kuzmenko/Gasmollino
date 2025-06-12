'use client'

import React from 'react'
import styles from '@/styles/RouteDetails.module.css'


interface TokenInfo {
  symbol: string
  name: string
  address: string
  decimals: number
  icon?: string
}

type MarketInfo = {
  name: string
  amount: string
  mint: string
}

type RouteDetailsProps = {
  outAmount: string
  outDecimals: number
  marketInfos: MarketInfo[]
  priceImpactPct: string
  swapUsdValue: string
  tokens: TokenInfo[]
}

const RouteDetails: React.FC<RouteDetailsProps> = ({
  outAmount,
  outDecimals,
  marketInfos,
  priceImpactPct,
  swapUsdValue,
  tokens
}) => {
  const formatAmount = (amount: string, decimals: number) => {
    return (parseFloat(amount) / 10 ** decimals).toFixed(4)
  }

  const finalToken = tokens.find(
    (t) => t.address === marketInfos[marketInfos.length - 1]?.mint
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Route Breakdown</h3>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <strong>Total Output:</strong>{' '}
          {formatAmount(outAmount, outDecimals)} {finalToken?.symbol || 'Token'}
        </div>
        <div className={styles.row}>
          <strong>Estimated Value:</strong> ${parseFloat(swapUsdValue).toFixed(2)}
        </div>
        <div className={styles.row}>
          <strong>Price Impact:</strong> {parseFloat(priceImpactPct).toFixed(2)}%
        </div>
      </div>

      <div className={styles.markets}>
        <h4>Swap Route</h4>
        {marketInfos.length > 0 ? (
          <ul className={styles.marketList}>
            {marketInfos.map((market, index) => {
              const token = tokens.find((t) => t.address === market.mint)
              return (
                <li key={index} className={styles.marketItem}>
                  <div className={styles.marketName}>{market.name}</div>
                  <div className={styles.marketAmount}>
                    {formatAmount(market.amount, 6)} {token?.symbol || 'Token'}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No markets available for this route.</p>
        )}
      </div>
    </div>
  )
}

export default RouteDetails