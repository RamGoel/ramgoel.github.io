import Link from 'next/link'

const Header = () => {
    return (
        <div className="flex w-full items-center p-[40px] !justify-between">
            <div className="flex items-center justify-start gap-2">
                <div className="bg-[#604CC3] w-[20px] h-[20px]"></div>
                <h1 className="text-2xl hidden md:block font-semibold">
                    Ram Goel
                </h1>

                <p className="opacity-70 hidden md:block text-sm font-medium">
                    /founder /engineer
                </p>
            </div>

            <div className="flex items-center gap-3 justify-end">
                <Link href={'/'} className="text-sm">
                    Me
                </Link>
                <Link href={'/experience'} className="text-sm">
                    Experience
                </Link>
                <Link href={'/startups'} className="text-sm">
                    Startups
                </Link>
            </div>
        </div>
    )
}

export default Header
