import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Inter, JetBrains_Mono, Syne } from 'next/font/google'
import { usePathname } from 'next/navigation'
import '@/pages/work/growth-square/growth-square.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'

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
        '/work/supermemory',
        '/work/whatsapp',
        '/widget',
        '/work/growth-square',
        '/applicant-reviewer',
    ]
    const isPageRoute = pageRoutes.includes(pathname)

    return (
        <ThemeProvider>
            <main className={`${inter.variable} ${mono.variable} ${syne.variable} font-sans`}>
                {isPageRoute ? (
                    <Component {...pageProps} />
                ) : (
                    <>
                        <div className="min-h-screen bg-white text-neutral-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-neutral-100">
                            <div className="fixed top-4 right-4 z-40 sm:top-5 sm:right-5">
                                <ThemeToggle />
                            </div>
                            <Component {...pageProps} />
                        </div>
                        <Analytics />
                    </>
                )}
            </main>
        </ThemeProvider>
    )
}
