'use client'

import { TOKENS } from '@/lib/tokens'
import styles from '@/styles/TokenSelect.module.css'

export function TokenSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (symbol: string) => void
}) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {TOKENS.map((token) => (
        <option key={token.symbol} value={token.symbol}>
          {token.symbol}
        </option>
      ))}
    </select>
  )
}