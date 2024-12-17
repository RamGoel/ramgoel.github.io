import { landingPages } from '@/data/landing-pages'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'

const colorsByType = {
    'landing-page': 'bg-blue-500/30 border border-blue-500 rounded-full',
    'inner-page': 'bg-green-500/30 border border-green-500 rounded-full',
    'react-native': 'bg-yellow-500/30 border border-yellow-500 rounded-full',
}

const AllLandingPages = () => {
    return (
        <div className="h-screen w-screen py-[50px] bg-neutral-900">
            <div className="flex-grow  flex items-center justify-center w-1/2 mx-auto">
                <div className="flex flex-col  w-full h-full gap-4">
                    <div>
                        <Link href="/" className="hover:opacity-50">
                            <div className="flex items-center text-white gap-2">
                                <RiArrowLeftLine />
                                Back to Home
                            </div>
                        </Link>
                    </div>
                    <h1 className="text-white text-2xl">Some more projects</h1>

                    <div className="w-full flex flex-col gap-4 h-full">
                        {landingPages.map((page, index) => (
                            <Link
                                href={page.link}
                                key={page.slug}
                                className="flex items-center justify-between gap-2"
                            >
                                <h1 className="text-white hover:underline flex items-center gap-2 text-md">
                                    {index + 1}. {page.title} <ArrowUpRight />
                                </h1>

                                <p
                                    className={`text-white ${colorsByType[page.type as keyof typeof colorsByType]} px-2 rounded-full text-sm`}
                                >
                                    {page.type}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllLandingPages
