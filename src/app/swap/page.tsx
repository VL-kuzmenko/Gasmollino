'use client'

import React from 'react'
import SwapCalculator from '@/components/Swap/Swap'
import styles from '@/styles/Swap.module.css'

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <SwapCalculator />
    </div>
  )
}