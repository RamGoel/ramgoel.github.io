import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Bricolage_Grotesque } from 'next/font/google'

const font = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={font.className}>
            <Component {...pageProps} />
            <Analytics />
        </main>
    )
}
