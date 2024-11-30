import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {
    const router = useRouter()
    return (
        <div>
            <div className="flex p-[20px] w-full justify-center md:justify-start items-center gap-2">
                <Link
                    href="/"
                    className={
                        router.pathname === '/'
                            ? 'text-white underline'
                            : 'text-neutral-400'
                    }
                >
                    Ram Goel
                </Link>
                {/* <span>•</span>
                <Link
                    href="/list100"
                    className={
                        router.pathname === '/list100'
                            ? 'text-white underline'
                            : 'text-neutral-400'
                    }
                >
                    List 100
                </Link> */}
                <span>•</span>
                <Link
                    href="/posts"
                    className={
                        router.pathname === '/posts'
                            ? 'text-white underline'
                            : 'text-neutral-400'
                    }
                >
                    Posts
                </Link>
            </div>
        </div>
    )
}

export default Navbar
