import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HeimWerk Düsseldorf Altstadt — Schnitzel & Slow Food',
  description:
    'HeimWerk Düsseldorf Altstadt – Handwerkliche Schnitzel-Kunst seit 2019. Regionale Zutaten, vegane & vegetarische Variationen, Augustiner vom Fass. Hafenstraße 9, Düsseldorf.',
  keywords: ['Schnitzel', 'Düsseldorf', 'Altstadt', 'Restaurant', 'vegan', 'vegetarisch', 'HeimWerk'],
  openGraph: {
    title: 'HeimWerk Düsseldorf Altstadt',
    description: 'Handwerkliche Schnitzel-Kunst seit 2019 in der Düsseldorfer Altstadt.',
    url: 'https://www.heimwerk-restaurant.de/standorte/duesseldorf-altstadt',
    siteName: 'HeimWerk Restaurant',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HeimWerk Düsseldorf Altstadt',
    description: 'Handwerkliche Schnitzel-Kunst seit 2019.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-hblack text-ivory font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
