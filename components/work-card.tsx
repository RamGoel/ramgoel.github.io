import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const childVariants = {
    hidden: {
        opacity: 0,
        y: 50, // Start below
    },
    visible: {
        opacity: 1,
        y: 0, // Slide up to original position
        transition: {
            duration: 1, // Animation duration for each child
        },
    },
}
const WorkCard = ({
    image,
    title,
    link,
    description,
}: {
    image: string
    title: string
    link: string
    description: string
}) => {
    const router = useRouter()
    return (
        <motion.div
            onClick={() => router.push(link)}
            variants={childVariants}
            className="text-lg w-full md:max-w-[300px] bg-neutral-800 p-2 border-[2px] rounded-tl-none border-neutral-700 relative cursor-pointer rounded-lg "
        >
            <div className="w-full md:w-[280px] h-[160px] overflow-hidden rounded-lg rounded-tl-none">
                <Image
                    src={image}
                    width={1500}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[2.5] origin-top-left"
                    height={1500}
                    alt={title}
                />
            </div>
            <div className="flex items-center justify-between">
                <p className="text-lg my-2">{title}</p>
                <Link
                    href={link}
                    className="animate-pulse hover:animate-none h-[20px] rounded-full w-[20px] hover:scale-110 transition-all flex items-center justify-center text-xs underline bg-[#f5f5f5] text-black"
                >
                    <ArrowUpRight size={13} className="mt-[1px]" />
                </Link>
            </div>
            <p className="text-sm text-neutral-500">{description}</p>
        </motion.div>
    )
}

export default WorkCard
