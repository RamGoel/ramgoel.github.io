import CustomTooltip from '@/components/custom-tooltip'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Inter, JetBrains_Mono, Syne } from 'next/font/google'
import { usePathname } from 'next/navigation'
import '@/pages/copies/growth-square/growth-square.css'

// Primary font for body text - clean and readable
const inter = Inter({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    variable: '--font-inter',
})

// Secondary font for code/accents
const mono = JetBrains_Mono({
    weight: ['400', '500'],
    subsets: ['latin'],
    variable: '--font-mono',
})

// Display font for navigation - stylish, artistic
const syne = Syne({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    variable: '--font-display',
})

export default function App({ Component, pageProps }: AppProps) {
    const pathname = usePathname()
    const pageRoutes = [
        '/copies/supermemory',
        '/copies/sarvam',
        '/copies/whatsapp',
        '/widget',
        '/copies/growth-square',
        '/applicant-reviewer',
        '/copies/sarvam-v2',
        '/copies/sarvam-team',
    ]
    const isPageRoute = pageRoutes.includes(pathname)
    return (
        <main className={`${inter.variable} ${mono.variable} ${syne.variable} font-sans`}>
            <title>Ram Goel</title>
            {isPageRoute ? (
                <Component {...pageProps} />
            ) : (
                <>
                    <div className="min-h-screen bg-white text-neutral-900">
                        <Component {...pageProps} />
                    </div>
                    <CustomTooltip id="hover-tooltip" />
                    <Analytics />
                </>
            )}
        </main>
    )
}
