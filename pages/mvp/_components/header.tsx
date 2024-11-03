import { redirectToCal } from '@/utils/redirect'
import Link from 'next/link'
import { RiCalendar2Line } from 'react-icons/ri'

const Header = () => {
    return (
        <div className="flex text-white flex-row items-center justify-center fixed top-0 left-0 w-full h-24 bg-neutral-900 z-50">
            <div className="flex flex-row items-center justify-between w-11/12 md:w-1/2">
                <Link href={'#hero'}>
                    <h1 className="text-2xl font-bold">rammlabs</h1>
                </Link>

                {/* <div className="flex flex-row gap-6">
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
                        href={'#work'}
                    >
                        Work
                    </Link>
                </div> */}

                <button
                    onClick={redirectToCal}
                    className="bg-emerald-600 px-4 py-2 w-[150px] hover:bg-emerald-700 rounded-md flex flex-row items-center justify-center gap-2"
                >
                    Book a call <RiCalendar2Line className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default Header
