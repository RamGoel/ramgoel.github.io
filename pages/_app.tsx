import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

const font = localFont({
    src: '../public/fonts/nothing.ttf',
    weight: '400',
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={font.className}>
            <Component {...pageProps} />
            <Analytics />
        </main>
    )
}
