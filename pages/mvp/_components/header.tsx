import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className="flex text-white flex-row items-center justify-center w-full h-24 bg-neutral-100 dark:bg-neutral-900 z-50">
            <div className="flex flex-row items-center justify-between w-1/2">
                <h1 className="text-2xl font-bold">Ram Goel.</h1>

                <div className="flex flex-row gap-6">
                    <Link
                        className="hover:text-emerald-500 transition-all duration-300"
                        href={'#reviews'}
                    >
                        Reviews
                    </Link>

                    <Link
                        className="hover:text-emerald-500 transition-all duration-300"
                        href={'#companies'}
                    >
                        Clients
                    </Link>
                    <Link
                        className="hover:text-emerald-500 transition-all duration-300"
                        href={'#pricing'}
                    >
                        Pricing
                    </Link>
                    <Link
                        className="hover:text-emerald-500 transition-all duration-300"
                        href={'#stack'}
                    >
                        Tech Stack
                    </Link>
                </div>

                <button
                    data-tally-open="m6QrzY"
                    data-tally-emoji-text="🚀"
                    data-tally-emoji-animation="wave"
                    data-tooltip-id="hover-tooltip"
                    data-tooltip-content="A Form will open in bottom right"
                    className="bg-emerald-600 px-4 py-1 rounded-md"
                >
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Header
