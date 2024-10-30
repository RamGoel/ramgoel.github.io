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

const font = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata = {
    title: 'Ramudio',
    description:
        'We are a team of experienced developers and designers who are passionate about building startups.',
}

const AgencyPage = () => {
    return (
        <div
            className={`scroll-smooth min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center ${font.className}`}
        >
            <Head>
                <title>{metadata.title} - MVP in 2 weeks</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <Header />
            <div className="h-[100vh] flex flex-col items-center justify-center pt-[100px]">
                <div className="flex flex-row text-white rounded-full bg-emerald-500/40 border-emerald-500 border-2 px-4 py-1 items-center">
                    <RiHeart3Line className="mr-2" /> Loved by 5+ founders
                </div>
                <h1 className="text-[120px] mb-[-25px] font-extrabold text-neutral-900 dark:text-neutral-100">
                    MVP in <span className="text-emerald-500">2 weeks</span>
                </h1>
                <p className="text-neutral-700 text-xl dark:text-neutral-300">
                    We are a team of experienced developers and designers who
                    are passionate about building startups.
                </p>

                <div className="flex flex-row gap-4 mt-5">
                    <button className="bg-emerald-600 min-w-[200px] hover:bg-emerald-700 text-white px-4 py-3 rounded-md">
                        Get Started
                    </button>
                    <button className=" min-w-[200px] bg-transparent border-[1px] border-neutral-500/40 text-white  hover:bg-neutral-500/40 px-4 py-3 transition-all duration-300 rounded-md flex flex-row items-center justify-center gap-2">
                        See our work <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="mt-10">
                    <Services />
                </div>
            </div>
            <div className="">
                <Companies />
            </div>

            <div
                id="whyUs"
                className="h-[70vh] flex items-center justify-center"
            >
                <WhyUsPage />
            </div>
            <div className="mt-10">
                <PricingSection />
            </div>
        </div>
    )
}

export default AgencyPage
