'use client'
import { Space_Grotesk } from 'next/font/google'
import Header from './components/Header'
import Hero from './components/Hero'
import TechSection from './components/TechSection'
import Product from './components/Product'
import Footer from './components/Footer'
import CornerCard from './components/CornerCard'
import Community from './components/Community'

const font = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export default function Supermemory() {
    return (
        <div className={` ${font.className}`}>
            <div className="bg-[#1c2027] min-h-screen px-7 py-6">
                <Header />
                <div className="h-screen">
                    <Hero />
                </div>
                <TechSection />
                <Product />

                <Community />
                {/* <CornerCard
                    categoryText="product • product • product"
                    title={
                        <p>
                            Add context to your <br />
                            agentic apps with few <br /> lines of code
                        </p>
                    }
                    description={
                        <p>
                            Supermemory provides SDKs to make integration as
                            simple as <br /> possible
                        </p>
                    }
                    buttonText={
                        <p>
                            Start building
                            <sup className="text-[12px]">DOCS</sup>
                        </p>
                    }
                    code={`npm install 'supermemory'`}
                /> */}
            </div>
            <Footer />
        </div>
    )
}
