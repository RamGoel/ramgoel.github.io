import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const faqData = [
    {
        question: 'How can I help you?',
        answer: 'I specialize in full-stack development and generative AI solutions. I can help with building web/mobile applications, implementing AI features, and providing technical consultation. Whether you need a complete product built or want to enhance your existing solution, I can assist.',
    },
    {
        question: 'What are my rates?',
        answer: "I typically charge $10-15/hour (700-1000 INR) depending on the project complexity and requirements. For fixed-scope projects, I provide detailed estimates after understanding your requirements. I'm open to different engagement models including hourly, project-based, or retainer arrangements.",
    },
    {
        question: 'When should you hire me?',
        answer: 'You should consider working with me if: \n• You need to build an MVP or full product\n• You want to add AI capabilities to your product\n• You need technical expertise for architecture decisions\n• Your existing development team needs reinforcement\n• You want to optimize your current solution',
    },
    {
        question: "What's my tech stack?",
        answer: 'I am not rigid about the tech stack. I am comfortable with any stack that is required for the project. I am also comfortable with learning new technologies. Mostly I use: \n- React, Next.js, Tailwind, Shadcn \n- Node.js, MongoDB, Vercel, and OpenAI.',
    },
]

const FaqItem = ({
    question,
    answer,
    defaultOpen,
}: {
    defaultOpen: string
    question: string
    answer: string
}) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (question === defaultOpen) {
            setIsOpen(true)
        }
    }, [defaultOpen, question])

    return (
        <motion.div className="border-b border-zinc-800" initial={false}>
            <motion.button
                className="flex justify-between items-center w-full py-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-zinc-400 whitespace-pre-line">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const Faq = () => {
    const [defaultOpen, setDefaultOpen] = useState(faqData[2])
    return (
        <motion.div
            className=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="space-y-2">
                {faqData.map((faq, index) => (
                    <FaqItem
                        defaultOpen={defaultOpen.question}
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default Faq
