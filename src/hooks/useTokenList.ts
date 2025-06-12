import { useEffect, useState } from 'react'

export interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  icon: string
}

export function useTokenList() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch('/api/tokens')
        const data = await res.json()
        setTokens(data)
      } catch (err) {
        console.error('Failed to fetch tokens', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])

  return { tokens, loading }
}