'use client'
import { Space_Grotesk } from 'next/font/google'
import Header from './components/Header'
import Hero from './components/Hero'
import TechSection from './components/TechSection'
import Product from './components/Product'
import Footer from './components/Footer'

const font = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export default function Supermemory() {
    return (
        <div
            className={` ${font.className}`}
        >
            <div className='bg-[#1c2027] min-h-screen px-7 py-6'>
                <Header />
                <div className="h-screen">
                    <Hero />
                </div>
                <TechSection />
                <Product />
            </div>
            <Footer />
        </div>
    )
}
