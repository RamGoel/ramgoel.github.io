import { ArrowUpRight, CheckCircleIcon, RocketIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const items = [
    {
        id: 0,
        path: '/devtools.png',
        title: 'AI Tools Directory for Developers',
        link: 'https://devtools-ai.vercel.app/',
    },
    {
        id: 1,
        path: '/shadmore.png',
        title: 'Shadcn based UI Components',
        link: 'https://prelyst.vercel.app/',
    },
    {
        id: 2,
        path: '/dumbel.png',
        title: 'Find Tech Partners for Hackathons/Events',
        link: 'https://dumbel.vercel.app/',
    },
    {
        id: 3,
        path: '/lemma.png',
        title: 'Convert JSON to Frontend Code (GenAI)',
        link: 'https://lemma-ui.vercel.app/',
    },
    {
        id: 4,
        path: '/micnote.png',
        title: 'Take notes using voice',
        link: 'https://micnote-app.vercel.app/',
    },
]
const WhyUsPage = () => {
    return (
        <div className="flex py-10 flex-col text-white items-center justify-center">
            <h1 className="text-4xl text-center font-bold">
                A glimpse of my work
            </h1>
            <p className="text-neutral-500 text-center text-lg">
                Here are some of the projects I have worked on
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 items-center justify-center">
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
        <div className="text-lg relative rounded-lg mx-auto md:mx-0 bg-neutral-800/40 p-2 border-[2px] border-neutral-800 w-11/12 md:w-fit ">
            <Image
                src={src}
                width={500}
                className="w-full md:w-[500px] object-cover rounded-lg h-[300px]"
                height={500}
                alt={title}
            />
            <div className="flex items-center mt-2 justify-between">
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
