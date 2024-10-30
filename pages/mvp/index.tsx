import { ArrowRight, GroupIcon } from 'lucide-react'
import { Bricolage_Grotesque } from 'next/font/google'
import React from 'react'
import { RiHeart3Line } from 'react-icons/ri'
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

const font = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
})

const AgencyPage = () => {
    return (
        <div
            id="agencyPage"
            className={` bg-neutral-100 text-white dark:bg-neutral-900 ${font.className}`}
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

            <div className="h-[80vh] flex flex-col items-center justify-center">
                <div className="flex flex-row text-white rounded-full bg-emerald-500/40 border-emerald-500 border-2 px-4 py-1 items-center">
                    <RiHeart3Line className="mr-2" /> Loved by 5+ founders
                </div>
                <h1 className="text-[120px] mb-[-25px] font-extrabold text-neutral-900 dark:text-neutral-100">
                    SaaS in <span className="text-emerald-500">3 weeks</span>
                </h1>
                <p className="text-neutral-700 text-xl dark:text-neutral-300">
                    Get first draft in 1 week, Regular Updates, ready for launch
                    in 3 weeks
                </p>

                <div className="flex flex-row gap-4 mt-5">
                    <button
                        data-tally-open="m6QrzY"
                        data-tally-emoji-text="🚀"
                        data-tally-emoji-animation="wave"
                        data-tooltip-id="hover-tooltip"
                        data-tooltip-content="A Form will open in bottom right"
                        className="bg-emerald-600 min-w-[200px] hover:bg-emerald-700 text-white px-4 py-3 rounded-md"
                    >
                        Get Started
                    </button>
                    <Link href="#pricing">
                        <button className=" min-w-[200px] bg-transparent border-[1px] border-neutral-500/40 text-white  hover:bg-neutral-500/40 px-4 py-3 transition-all duration-300 rounded-md flex flex-row items-center justify-center gap-2">
                            Jump to Pricing <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>

                <div className="mt-10">
                    <Services />
                </div>
            </div>

            <div
                id="reviews"
                className="pt-10 flex flex-col items-center justify-center"
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
                        width={1500}
                        className=""
                        height={1500}
                        alt="appreciate"
                    />
                </div>
            </div>

            <div id="companies" className="pt-10">
                <Companies />
            </div>

            <div id="pricing" className="pt-10">
                <PricingSection />
            </div>

            <div id="stack" className="pt-10">
                <StackSlider />
            </div>

            <Footer />
        </div>
    )
}

export default AgencyPage
