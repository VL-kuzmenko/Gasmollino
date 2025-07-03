import { useEffect, useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

interface TokenBalances {
  [mint: string]: number
}

export function useWalletBalance() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [solBalance, setSolBalance] = useState(0)
  const [tokenBalances, setTokenBalances] = useState<TokenBalances>({})

  useEffect(() => {
    if (!publicKey) return

    ;(async () => {
      try {
        const balance = await connection.getBalance(publicKey)
        setSolBalance(balance / LAMPORTS_PER_SOL)

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: new PublicKey("Tokenkeg...") })
        const balances: TokenBalances = {}
        for (const { account } of tokenAccounts.value) {
          const info = account.data.parsed.info
          balances[info.mint] = parseInt(info.tokenAmount.amount) / 10 ** info.tokenAmount.decimals
        }
        setTokenBalances(balances)
      } catch (e) {
        console.error("Failed to load balances", e)
      }
    })()
  }, [publicKey, connection])

  return { solBalance, tokenBalances }
}
