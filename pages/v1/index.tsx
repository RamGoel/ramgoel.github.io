import About from '@/components/portfolio/about/main'
import Scrollable from '@/components/portfolio/scrollable/scrollable.main'
import { motion } from 'framer-motion'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import Freelance from '../freelance'

const inter = Inter({
    weight: ['200', '400', '600'],
    subsets: ['latin'],
})

export default function Home() {
    const { type } = useRouter().query

    if (type && type === 'freelance') {
        return <Freelance />
    }
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [null, 0.85, 1], opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
                ease: 'easeIn',
                duration: 0.6,
            }}
        >
            <div
                className={`md:flex items-center justify-around bg-gradient-to-tr from-black to-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 ${inter.className} `}
            >
                <title>{`Hey, I'm Ram Goel`}</title>

                <About />
                <Scrollable />
            </div>
        </motion.div>
    )
}
