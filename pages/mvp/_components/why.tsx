import { ArrowUpRight, CheckCircleIcon, RocketIcon } from 'lucide-react'
import React from 'react'

const items = [
    {
        id: 1,
        icon: (
            <ArrowUpRight className="w-10 h-10 group-hover:scale-[1.2] group-hover:text-emerald-600 transition-all duration-300" />
        ),
        title: 'Experience',
        description: 'We have years of experience in the industry.',
    },
    {
        id: 2,
        icon: (
            <RocketIcon className="w-8 h-8 group-hover:scale-[1.2] group-hover:text-emerald-600 transition-all duration-300" />
        ),
        title: 'Speed',
        description:
            "You'll have the draft in 1 week, and the final in 2 weeks.",
    },
    {
        id: 3,
        icon: (
            <CheckCircleIcon className="w-8 h-8 group-hover:scale-[1.2] group-hover:text-emerald-600 transition-all duration-300" />
        ),
        title: 'Quality',
        description: 'We are committed to delivering high-quality work.',
    },
]
const WhyUsPage = () => {
    return (
        <div className="flex flex-col text-white items-center justify-center">
            <h1 className="text-4xl font-bold">Why Us</h1>

            <div className="flex gap-10 mt-10 items-center justify-center">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex text-white group hover:scale-95 cursor-pointer transition-all duration-300 px-4 py-6 rounded-2xl bg-transparent border-2 border-neutral-500/20 max-w-[300px] gap-2 text-center flex-col items-start justify-center "
                    >
                        {item.icon}
                        <h1 className="text-2xl font-bold text-left">
                            {item.title}
                        </h1>
                        <p className="text-sm text-left opacity-60">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WhyUsPage
