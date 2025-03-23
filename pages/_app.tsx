import AnimatedWrapper from '@/components/AnimatedWrapper'
import CustomTooltip from '@/components/custom-tooltip'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { DM_Sans } from 'next/font/google'

const font = DM_Sans({
    weight: ['300', '400', '500'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={`${font.className} font-normal`}>
            <title>Ram Goel</title>
            <div className="flex flex-col lg:flex-row items-stretch bg-zinc-900 text-white min-h-screen">
                <div className="w-full h-[1px] lg:h-full lg:w-[1px] bg-gradient-to-r lg:bg-gradient-to-b from-neutral-800 to-neutral-950" />
                <div className="h-[100vh] overflow-auto  w-full">
                    <div className="p-5 lg:p-10 lg:w-[50%] mx-auto w-full">
                        <AnimatedWrapper time={0}>
                            <Component {...pageProps} />
                        </AnimatedWrapper>
                    </div>
                </div>
            </div>
            <CustomTooltip id="hover-tooltip" />
            <Analytics />
        </main>
    )
}
