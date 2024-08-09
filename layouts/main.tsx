import Header from '@/components/header'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'

const font = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const MainLayout = ({ children }: { children: any }) => {
    return (
        <div
            className={`bg-white lowercase flex  flex-col w-full text-black ${font.className}`}
        >
            <title>About Ram | Engineer, Developer</title>

            <Header />
            <div className="h-[100px]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    )
}

export default MainLayout
