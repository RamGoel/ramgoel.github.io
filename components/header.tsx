import Link from 'next/link'

const Header = () => {
    return (
        <div className="flex w-full items-center p-[40px] !justify-between">
            <div className="flex items-center justify-start gap-2">
                <div className="bg-[#604CC3] w-[20px] h-[20px]"></div>
                <h1 className="text-2xl hidden md:block font-semibold">
                    Ram Goel
                </h1>
            </div>

            <div className="flex items-center gap-3 2xl:text-md text-sm justify-end">
                <Link href={'/'}>About</Link>
                <Link href={'/experience'}>Experience</Link>
                <Link href={'/projects'}>Projects</Link>
                <Link href={'/contributions'}>contributions</Link>
            </div>
        </div>
    )
}

export default Header
