'use client'

import styles from '@/styles/TokenSelect.module.css'

interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  icon: string
}

export function TokenSelect({
  tokens,
  value,
  onChange,
}: {
  tokens: Token[]
  value: string | null
  onChange: (address: string) => void
}) {
  return (
    <select
      className={styles.select}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        Select token
      </option>
      {tokens.map((token) => (
        <option key={token.address} value={token.address}>
          {token.symbol}
        </option>
      ))}
    </select>
  )
}