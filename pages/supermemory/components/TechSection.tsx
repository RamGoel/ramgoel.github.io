import Image from 'next/image'
import { motion } from 'framer-motion'

const techCardsData = [
    {
        title: 'init vector_database',
        listItems: [
            'WAY TOO EXPENSIVE. TIME TO SWITCH.',
            "PAINFULLY SLOW. LET'S TRY ANOTHER.",
            "WON'T SCALE. BACK TO SQUARE ONE.",
            'MAINTENANCE NIGHTMARE. NEED ALTERNATIVES.',
        ],
        lineSymbol: '❌',
    },
    {
        title: 'choose embedding_model',
        listItems: [
            'WHICH MODEL FITS YOUR USE CASE?',
            'CONFUSING PERFORMANCE TRADEOFFS',
            "CAN'T KEEP UP WITH NEW RELEASES",
        ],
        lineSymbol: '⚠️',
    },
    {
        title: 'handle format_parsing',
        listItems: [
            'MARKDOWN: TABLES BREAK EVERYTHING',
            'HTML: SCRIPTS AND STYLES INTERFERE',
            'PDF: LAYOUT RUINS EXTRACTION',
            'WORD DOCS: UNPREDICTABLE FORMATTING',
        ],
        lineSymbol: '❌',
    },
    {
        title: 'calculate scaling_costs',
        listItems: [
            'COSTS EXPLODE AT PRODUCTION SCALE',
            'PERFORMANCE DEGRADES AS DATA GROWS',
            'ENGINEERING HOURS PILE UP FAST',
        ],
        lineSymbol: '⚠️',
    },
    {
        title: 'setup connection_sync',
        listItems: [
            'SYNC FAILURES BETWEEN DATA SOURCES',
            'API RATE LIMITS DURING LARGE SYNCS',
            'IMAGES: NEED VISION MODELS NOW?',
            'AUDIO/VIDEO: TRANSCRIPTION COSTS SOAR',
        ],
        lineSymbol: '❌',
    },
]

export default function TechSection() {
    // Duplicate the array for infinite scroll effect
    const duplicatedCards = [...techCardsData, ...techCardsData]

    return (
        <div className="min-h-[150vh] flex items-center justify-center">
            <div className="flex flex-col gap-10">
                <Image
                    src={
                        'https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b0658a_gradient-ish-symbol.svg'
                    }
                    alt="tech"
                    width={120}
                    height={120}
                    className="mx-auto"
                />
                <h1 className="text-white text-[80px] text-center leading-[90px] tracking-[-1.6px] font-medium">
                    Context <br></br> is everything
                </h1>
                <p className="text-white text-[16px] font-light leading-[28px] tracking-[-0.4px] text-center">
                    Without it, even the smartest AI <br></br> is just an
                    expensive chatbot
                </p>

                <Image
                    src={
                        'https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b06596_HorizontalBorder.png'
                    }
                    alt="tech"
                    width={900}
                    className="mt-10 mx-auto"
                    height={50}
                />

                {/* Carousel Container */}
                <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#1c2027] via-[#1c2027]/80 to-transparent z-10 pointer-events-none" />
                    
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#1c2027] via-[#1c2027]/80 to-transparent z-10 pointer-events-none" />
                    
                    {/* Sliding Cards */}
                    <motion.div
                        className="flex gap-6 items-top"
                        animate={{
                            x: [0, -1200], // Adjust based on card width + gap
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedCards.map((item, index) => (
                            <div key={index} className="flex-shrink-0">
                                <TechCard {...item} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const TechCard = ({
    title,
    listItems,
    lineSymbol,
}: {
    title: string
    listItems: string[]
    lineSymbol: string
}) => {
    return (
        <div
            style={{
                boxShadow:
                    '0 2px 20px #00000040,inset 0 0 0 4px #06060640,inset 0 4px 2px #54545440',
            }}
            className="flex flex-col gap-5 p-5 rounded-3xl bg-[#21252A] h-fit"
        >
            <h1 className="text-white text-[16px] leading-[32px] tracking-[-0.48px]">
               $ {title}
            </h1>
            <div className="flex flex-col">
                {listItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span className="text-white text-[12px] font-light leading-[28px] tracking-[-0.4px]">
                            {lineSymbol}
                        </span>
                        <span className="text-[#7A7A7A] text-[12px] font-light leading-[28px] tracking-[-0.4px]">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
