import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className="flex text-white flex-row items-center justify-center fixed top-0 left-0 w-full h-24 bg-neutral-100 dark:bg-neutral-900 z-50">
            <div className="flex flex-row items-center justify-between w-1/2">
                <h1 className="text-2xl font-bold">
                    Ramudio
                    <span className="text-emerald-500 rotate-[90deg] ml-1">
                        :]
                    </span>
                </h1>

                <div className="flex flex-row gap-6">
                    <Link
                        className="hover:text-emerald-500 transition-all duration-300"
                        href={'#companies'}
                    >
                        Customers
                    </Link>
                    <Link
                        className="hover:text-emerald-500 transition-all duration-300"
                        href={'#whyUs'}
                    >
                        Why us?
                    </Link>
                    <Link
                        className="hover:text-emerald-500 transition-all duration-300"
                        href={'#about'}
                    >
                        Pricing
                    </Link>
                </div>

                <button className="bg-emerald-600 px-4 py-1 rounded-md">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Header
