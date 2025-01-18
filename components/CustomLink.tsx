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
            className={`border-b inline-flex items-center gap-1 border-neutral-800 border-dashed text-neutral-300 hover:text-yellow-200 transition-all ${extraClassName}`}
        >
            {children}
        </Link>
    )
}

export default CustomLink
