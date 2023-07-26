import './globals.css'
import type { Metadata } from 'next'
import { Inter , Jost } from 'next/font/google'

const jost= Jost({subsets:["cyrillic"]})
export const metadata: Metadata = {
  title: 'Art Muse',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="pastel" style={{backgroundColor:"transparent"}} lang="en">
      <body className={`${jost.className} arrow`} >{children}</body>
    </html>
  )
}
