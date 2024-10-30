import { ArrowUpRight, CheckCircleIcon, RocketIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const items = [
    {
        id: 1,
        path: '/shadmore.png',
        title: 'Component Library',
        link: 'https://prelyst.vercel.app/',
    },
    {
        id: 2,
        path: '/dumbel.png',
        title: 'Find Tech Partners',
        link: 'https://dumbel.vercel.app/',
    },
    {
        id: 3,
        path: '/lemma.png',
        title: 'JSON to UI Code (GenAI)',
        link: 'https://lemma-ui.vercel.app/',
    },
]
const WhyUsPage = () => {
    return (
        <div className="flex h-[80vh] flex-col text-white items-center justify-center">
            <h1 className="text-4xl font-bold">Work I did</h1>
            <p className="text-neutral-500 text-center text-lg">
                Here are some of the projects I have worked on
            </p>

            <div className="flex gap-10 mt-10 items-center justify-center">
                {items.map((item) => (
                    <WorkCard
                        key={item.id}
                        src={item.path}
                        title={item.title}
                        link={item.link}
                    />
                ))}
            </div>
        </div>
    )
}

const WorkCard = ({
    src,
    title,
    link,
}: {
    src: string
    title: string
    link: string
}) => {
    return (
        <div className="text-lg relative rounded-lg w-fit ">
            <Image
                src={src}
                width={1500}
                className="w-[300px] object-cover rounded-lg h-[170px]"
                height={1500}
                alt={title}
            />
            <div className="flex items-center justify-between">
                <p className="text-sm my-2 ml-1">{title}</p>
                <Link
                    href={link}
                    className="animate-pulse hover:animate-none h-[20px] rounded-full w-[20px] hover:scale-110 transition-all flex items-center justify-center text-xs underline bg-[#f5f5f5] text-black"
                >
                    <ArrowUpRight size={13} className="mt-[1px]" />
                </Link>
            </div>
        </div>
    )
}

export default WhyUsPage
