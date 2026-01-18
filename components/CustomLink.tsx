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
            target="_blank"
            rel="noopener noreferrer"
            className={`
                relative inline-flex items-baseline gap-1
                text-zinc-300 hover:text-emerald-400
                transition-colors duration-200
                group
                ${extraClassName}
            `}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-full h-px bg-zinc-600 origin-left" />
            <span className="absolute bottom-0 left-0 w-0 h-px bg-emerald-400 origin-left transition-all duration-300 group-hover:w-full" />
        </Link>
    )
}

export default CustomLink
