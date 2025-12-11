import Link from 'next/link'
import React from 'react'

const CustomLink = ({
    children,
    href,
    extraClassName,
}: {
    children: React.ReactNode
    href: string
    extraClassName?: string
}) => {
    return (
        <Link
            href={href}
            className={`border-b inline-flex items-baseline gap-1 pb-px border-zinc-600 border-dashed text-zinc-400 hover:text-emerald-400 transition-all ${extraClassName}`}
        >
            {children}
        </Link>
    )
}

export default CustomLink
