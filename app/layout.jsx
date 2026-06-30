import { Playfair_Display, Inter, League_Spartan } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import ClarityProvider from './components/ClarityProvider'
import './globals.css'
import Script from 'next/script'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'Mogward',
  description: 'Secure authentication portal',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${leagueSpartan.variable}`}
    >
      <body className="font-sans antialiased bg-background">
        <ClarityProvider />

        {children}

        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>

      <GoogleAnalytics gaId="G-39GFVE56J6" />
    </html>
  )
}