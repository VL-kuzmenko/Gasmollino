import { useEffect, useState } from 'react'
import axios from 'axios'

interface PriceMap {
  [mint: string]: number
}

export function useUsdPrices() {
  const [pricesUSD, setPricesUSD] = useState<PriceMap>({})

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('https://public.jupiterapi.com/token-metas')
        const data = res.data as Array<{ address: string; priceUsd: string }>
        const map: PriceMap = {}
        data.forEach(t => {
          map[t.address] = parseFloat(t.priceUsd)
        })
        setPricesUSD(map)
      } catch (e) {
        console.error("Failed to fetch USD prices", e)
      }
    })()
  }, [])

  return { pricesUSD }
}
