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
        {/* Begin Mieruca Embed Code */}
        <script type="text/javascript" id="mierucajs" dangerouslySetInnerHTML={{
          __html: `
            window.fid = window.fid || [];fid.push([873070815]);
            (function() {
              function mieruca(){if(typeof window.fjsld != "undefined") return; window.__fjsld = 1; var fjs = document.createElement('script'); fjs.type = 'text/javascript'; fjs.async = true; fjs.id = "fjssync"; var timestamp = new Date;fjs.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://hm.mieru-ca.com/service/js/mieruca-hm.js?v='+ timestamp.getTime(); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(fjs, x); };
              setTimeout(mieruca, 500); document.readyState != "complete" ? (window.attachEvent ? window.attachEvent("onload", mieruca) : window.addEventListener("load", mieruca, false)) : mieruca();
            })();
          `
        }} />
        {/* End Mieruca Embed Code */}
      </head>
      <body className={`${inter.className} ${notoSansJP.className}`}>{children}</body>
    </html>
  )
}