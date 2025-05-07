'use client'

import React from 'react'
import styles from '@/styles/RouteDetails.module.css'

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
  tokens: any[]
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Детали маршрута</h3>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <strong>Общая сумма:</strong> {formatAmount(outAmount, outDecimals)}{' '}
          {tokens.find((t) => t.address === marketInfos[marketInfos.length - 1]?.mint)?.symbol || 'Токен'}
        </div>
        <div className={styles.row}>
          <strong>Цена в USD:</strong> ${parseFloat(swapUsdValue).toFixed(2)}
        </div>
        <div className={styles.row}>
          <strong>Цена воздействия (Price Impact):</strong> {parseFloat(priceImpactPct).toFixed(2)}%
        </div>
      </div>

      <div className={styles.markets}>
        <h4>Маркет-мейкеры (AMM)</h4>
        {marketInfos.length > 0 ? (
          <ul className={styles.marketList}>
            {marketInfos.map((market, index) => (
              <li key={index} className={styles.marketItem}>
                <div className={styles.marketName}>{market.name}</div>
                <div className={styles.marketAmount}>
                  {formatAmount(market.amount, 6)} {tokens.find((t) => t.address === market.mint)?.symbol || 'Токен'}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет доступных маркетов для этого маршрута.</p>
        )}
      </div>
    </div>
  )
}

export default RouteDetails