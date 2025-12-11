import AnimatedWrapper from '@/components/AnimatedWrapper'
import CustomTooltip from '@/components/custom-tooltip'
import { ThemeProvider } from '@/contexts/ThemeContext'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { JetBrains_Mono } from 'next/font/google'
import { usePathname } from 'next/navigation'
import '@/pages/copies/growth-square/growth-square.css'

const font = JetBrains_Mono({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin'],
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
    ]
    const isPageRoute = pageRoutes.includes(pathname)
    return (
        <ThemeProvider>
            <main className={`${font.className} font-normal`}>
                <title>Ram Goel</title>
                {isPageRoute ? (
                    <Component {...pageProps} />
                ) : (
                    <>
                        <div className="flex flex-col lg:flex-row items-stretch bg-zinc-950 text-zinc-100 min-h-screen">
                            <div className="w-full h-[1px] lg:h-full lg:w-[1px] bg-gradient-to-r lg:bg-gradient-to-b from-zinc-800 to-transparent" />
                            <div className="h-[100vh] overflow-auto w-full">
                                <div className="p-5 lg:p-10 lg:w-[50%] mx-auto w-full">
                                    <Component {...pageProps} />
                                </div>
                            </div>
                        </div>
                        <CustomTooltip id="hover-tooltip" />
                        <Analytics />
                    </>
                )}
            </main>
        </ThemeProvider>
    )
}
