import { motion } from 'framer-motion'
import { Bricolage_Grotesque } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Delay between each child
        },
    },
}
const font = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['400', '700'],
})

const list = [
    {
        id: 1,
        title: 'Learn to play the guitar',
        completed: false,
    },
    {
        id: 2,
        title: 'Work from a hill station for some days',
        completed: false,
    },
    {
        id: 3,
        title: 'Visit China (for Electronics Market)',
        completed: false,
    },
    {
        id: 3.5,
        title: 'Visit Japan (for Culture and its Tech)',
        completed: false,
    },
    {
        id: 4,
        title: 'Visit & Work from US (for atleast a week)',
        completed: false,
    },
    {
        id: 4,
        title: 'Visit these places, :Rishikesh:, :Mumbai:, Varanasi, Ladakh, Bengaluru, Kedarnath, Chandrashila',
        completed: false,
    },
    {
        id: 5,
        title: 'Work for a company based outside India',
        completed: true,
    },
    {
        id: 6,
        title: 'See these things, :Waterfall:, Ocean, Desert',
        completed: false,
    },
    {
        id: 7,
        title: 'Learn to drivem :Cycle:, :Scooter:, :Bike:, Car',
        completed: false,
    },
    {
        id: 8,
        title: 'Do Standup Comedy',
        completed: false,
    },
    {
        id: 9,
        title: 'Build/Buy a Home',
        completed: false,
    },
    {
        id: 10,
        title: 'Body Transformation (did that in 2021, but back to zero)',
        completed: false,
    },
    {
        id: 11,
        title: 'Earn my first dollar (Freelance Money)',
        completed: true,
    },
    {
        id: 12,
        title: 'Earn my first million (Sooo Proud)',
        completed: true,
    },
    {
        id: 13,
        title: 'Buy these things, :Monitor:, :Office Chair:, PS5, Height Adjustable Desk, Mac',
        completed: false,
    },
    {
        id: 14,
        title: 'Father of a girl child, and play PS5 with her',
        completed: false,
    },
    {
        id: 15,
        title: 'Take family to their first flight',
        completed: false,
    },
    {
        id: 16,
        title: 'Give a TED talk as a speaker',
        completed: false,
    },
    {
        id: 17,
        title: 'Learn and do proper Bhangra',
        completed: false,
    },
    {
        id: 18,
        title: 'Take my first flight (Thanks Raj)',
        completed: true,
    },
    {
        id: 19,
        title: 'Win a Hackathon',
        completed: false,
    },
    {
        id: 20,
        title: 'Be in news',
        completed: false,
    },
    {
        id: 21,
        title: 'Drink Chai on a mountain top',
        completed: false,
    },
    {
        id: 22,
        title: 'Get 1k users, and earn first dollar from my own product',
        completed: false,
    },
    {
        id: 23,
        title: 'Work from office for atleast for a month (Did for 3-4 days in 2024)',
        completed: false,
    },
]
const page = () => {
    return (
        <motion.section
            className={`bg-zinc-900 flex flex-col gap-2  text-white min-h-screen ${font.className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <title>List 100 • Ram Goel</title>
            <div className="flex p-[20px] items-center gap-2">
                <Link href="/">Ram Goel</Link>
                <span>•</span>
                <Link href="/list100">List 100</Link>
            </div>
            <div className="w-10/12 xl:w-1/2 my-[30px] mx-auto">
                <h1 className="text-4xl font-bold">List 100</h1>
                <p className="mt-2">
                    Things I want to do before I die. Please let me know if you
                    have any recommendation. Progress as of Nov 18, 2024: 5.3/25
                </p>

                <div className="flex mt-3 flex-col gap-4">
                    {list.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-2">
                            <p>
                                {index + 1}.{' '}
                                <span
                                    className={`${
                                        item.completed ? 'text-green-500' : ''
                                    }`}
                                >
                                    {item.completed ? '✓' : '✗'}{' '}
                                    {(() => {
                                        const parts = []
                                        let currentText = ''
                                        let inPhrase = false

                                        for (
                                            let i = 0;
                                            i < item.title.length;
                                            i++
                                        ) {
                                            const char = item.title[i]

                                            if (char === ':') {
                                                if (inPhrase) {
                                                    // End of phrase
                                                    parts.push(
                                                        <span
                                                            key={parts.length}
                                                            className="text-green-500"
                                                        >
                                                            {currentText.trim()}{' '}
                                                        </span>
                                                    )
                                                    currentText = ''
                                                    inPhrase = false
                                                } else {
                                                    // Start of phrase
                                                    if (currentText) {
                                                        parts.push(currentText)
                                                        currentText = ''
                                                    }
                                                    inPhrase = true
                                                }
                                            } else {
                                                currentText += char
                                            }
                                        }

                                        if (currentText) {
                                            parts.push(currentText)
                                        }

                                        return parts
                                    })()}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default page
