import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { useState } from 'react'
import Script from 'next/script'

const cn = (...classes: any[]) => {
    return twMerge(clsx(classes))
}

export default function Talks() {
    return (
        <script src="https://agent-widget-xi.vercel.app/api/65f42d31-78cb-47ed-9f2e-f8260440f63f/embed?env=staging"></script>
    )
}
