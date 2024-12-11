import { landingPages } from '@/data/landing-pages'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AllLandingPages = () => {
    return (
        <div className="h-screen w-screen py-[50px] bg-black">
            <div className="flex-grow flex items-center justify-center w-3/4 mx-auto">
                <div className="flex flex-col  w-full h-full gap-4">
                    <h1 className="text-white text-4xl">Landing Pages</h1>

                    <div className="w-full flex flex-col gap-3 h-full">
                        {landingPages.map((page, index) => (
                            <Link
                                href={`/landing/${page.slug}`}
                                key={page.slug}
                            >
                                <h1 className="text-white hover:underline flex items-center gap-2 font-serif text-xl">
                                    {index + 1}. {page.title} <ArrowUpRight />
                                </h1>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllLandingPages
