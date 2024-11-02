import { ArrowRight, Clock8, GroupIcon } from 'lucide-react'
import { Bricolage_Grotesque } from 'next/font/google'
import React from 'react'
import { RiCalendar2Line, RiClockwise2Line, RiHeart3Line } from 'react-icons/ri'
import Services from './_components/services'
import Head from 'next/head'
import Header from './_components/header'
import Companies from './_components/companies'
import WhyUsPage from './_components/why'
import PricingSection from './_components/pricing'
import CustomTooltip from '@/components/custom-tooltip'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Footer from './_components/footer'
import StackSlider from './_components/stack'
import Work from './_components/work'
import FounderSection from './_components/founder'
import { redirectToCal } from '@/utils/redirect'

const font = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
})

const AgencyPage = () => {
    return (
        <div
            id="agencyPage"
            className={`px-4 md:px-0 pt-[100px] text-white bg-neutral-900 ${font.className}`}
        >
            <Head>
                <title>Ram Goel - MVP in 3 weeks</title>
                <meta
                    name="description"
                    content={
                        'Get first draft in 1 week, ready for launch in 2 weeks'
                    }
                />
            </Head>
            <Header />
            <CustomTooltip
                id="hover-tooltip"
                background="black"
                color="white"
            />

            <div
                id="hero"
                className="h-fit mt-10 md:mt-0 md:h-[80vh] flex flex-col items-center justify-center"
            >
                <div className="flex flex-row text-white rounded-full bg-emerald-500/40 border-emerald-500 border-2 px-4 py-1 items-center">
                    <Clock8 size={16} className="mr-2" /> 4 slots left for
                    november
                </div>
                <h1 className="text-[70px] text-center leading-[70px] my-5 md:text-[120px] md:leading-[120px] font-extrabold text-neutral-100">
                    MVP in <span className="text-emerald-500">3 weeks</span>
                </h1>
                <p className="text-md md:text-xl text-center text-neutral-500">
                    Turning ideas into reality, fast. IDEA to MVP in just a few
                    weeks.
                    <br /> Get first draft in 1 week, Regular Updates, ready for
                    launch in 2-3 weeks
                </p>

                <div className="flex flex-col md:flex-row gap-4 mt-5">
                    <button
                        className="bg-emerald-600 flex flex-row items-center justify-center gap-2 min-w-[200px] hover:bg-emerald-700 text-white px-4 py-3 rounded-md"
                        onClick={redirectToCal}
                    >
                        Book a Call <RiCalendar2Line className="w-4 h-4" />
                    </button>
                    <button
                        data-tally-open="m6QrzY"
                        data-tally-emoji-text="🚀"
                        data-tally-emoji-animation="wave"
                        data-tooltip-id="hover-tooltip"
                        data-tooltip-content="A Form will open in bottom right"
                        className=" min-w-[200px] bg-transparent border-[1px] border-neutral-500/40 text-white  hover:bg-neutral-500/40 px-4 py-3 transition-all duration-300 rounded-md flex flex-row items-center justify-center gap-2"
                    >
                        Submit Requirements
                    </button>
                </div>

                <div className="mt-10">
                    <Services />
                </div>
            </div>

            <div
                id="reviews"
                className="pt-[150px] flex flex-col items-center justify-center"
            >
                <h2 className="text-4xl text-center font-semibold mb-2">
                    What people say about me
                </h2>
                <p className="text-neutral-500 text-center">
                    People love my work, and I&apos;m sure you will too
                </p>
                <div className="my-5 flex flex-col gap-2">
                    <Image
                        src={require('@/public/appreciate.png')}
                        width={1200}
                        className=""
                        height={1200}
                        alt="appreciate"
                    />
                </div>
            </div>

            <div id="work" className="">
                <Work />
            </div>

            <div id="pricing" className="pt-10">
                <PricingSection />
            </div>

            <div id="stack" className="pt-10">
                <StackSlider />
            </div>

            <div id="founder" className="">
                <FounderSection />
            </div>

            <Footer />
        </div>
    )
}

export default AgencyPage
