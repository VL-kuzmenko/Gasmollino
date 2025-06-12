import { NextResponse } from 'next/server'

interface JupToken {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
}

const WHITELIST = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  wETH: '7vfCXTtxYjibNKtSL4pHQpjjYkLFfG7bL6xEYFzvvsuS',
  USDT: 'Es9vMFrzaCERqPbyGBmRyJhdk9mMZkzp9djQBVAsJ9hA',
  ETH: '2vE2GVC8PgzQqt4T8iMfD7KJKXH31nVbCfqWR6iSkSvn',
  BTC: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
  BONK: 'DeZtY6aS9XcZkKz5T9FV2PYo6fGz8nEj3nT9nXw2ZCqY',
  JUP: 'JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB',
  PYTH: '8HYQWnaT7RzCdfP79gGyvX9jJxdXrQ5jJeGvC2Pwahsj',
  RAY: '4k3Dyjzvzp8eMkZGRzMtQGCJkoTxTGkscN4Dp8sFySzs',
}

export async function GET() {
  const res = await fetch('https://token.jup.ag/all')
  const allTokens = (await res.json()) as JupToken[]

  const whitelistAddresses = Object.values(WHITELIST)

  const filtered = allTokens.filter((token) =>
    whitelistAddresses.includes(token.address)
  )

  const result = filtered.map((token) => ({
    symbol: token.symbol,
    name: token.name,
    address: token.address,
    decimals: token.decimals,
    icon: token.logoURI,
  }))

  return NextResponse.json(result)
}