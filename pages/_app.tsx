import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Inter, Fira_Mono } from 'next/font/google'

const font = Fira_Mono({
    weight: ['400'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={`${font.className} lowercase`}>
            <Component {...pageProps} />
            <Analytics />
        </main>
    )
}
