import { EB_Garamond } from 'next/font/google'
import Image from 'next/image'

const font = EB_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

export default function Hero() {
    return (
        <div className="h-[120vh] bg-[#CB5434] overflow-hidden rounded-[60px] w-full">
            <div className="h-[80%] bg-[#1A1A1A] text-center p-10 rounded-[60px]">
                <h1
                    className={`${font.className} text-white leading-[110px] text-[120px]`}
                >
                    Full Stack AI for a <br /> Billion Voices <Image src={'https://em-content.zobj.net/source/apple/118/flag-for-india_1f1ee-1f1f3.png'} className='inline' alt='india' width={150} height={150} />
                </h1>
            </div>
        </div>
    )
}
