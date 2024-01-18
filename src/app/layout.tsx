import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIS FPL East & West',
  description: 'League standings information for East and West',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.background}>
          <div className={styles.bubble} />
          <div className={styles.bubble} />
          <div className={styles.bubble} />
          <div className={styles.bubble} />
          <div className={styles.bubble} />
          <div className={styles.bubble} />
          <div className={styles.bubble} />
        </div>
        {children}
      </body>
    </html>
  )
}
