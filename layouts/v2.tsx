import Header from '@/components/v2/header'
import { Poppins } from 'next/font/google'

const font = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const V2Layout = ({ children }: { children: any }) => {
    return (
        <div
            className={`bg-white lowercase flex  flex-col w-full text-black ${font.className}`}
        >
            <title>About Ram | Founder, Engineer</title>

            <Header />
            <div className="h-[100px]">{children}</div>
        </div>
    )
}

export default V2Layout
