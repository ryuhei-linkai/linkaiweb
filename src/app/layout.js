import { Inter } from 'next/font/google'
import './globals.css'

// Noto Sans JPをインポート
import { Noto_Sans_JP } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Noto Sans JPのフォント設定
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata = {
  title: 'linkai official site',
  description: 'linkai official site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/ファビコン.png" />
      </head>
      <body className={`${inter.className} ${notoSansJP.className}`}>{children}</body>
    </html>
  )
}