import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <div className="h-[80vh] w-full pt-[110px]">
            <Image
                src={
                    'https://cdn.prod.website-files.com/6826235ef861ed9464b064c8/6826235ef861ed9464b06589_Main%20graphics.svg'
                }
                alt="hero"
                width={1000}
                className="w-full object-cover"
                height={1000}
            />
            <motion.div 
                id="hero-content"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                
                transition={{ 
                    duration: 0.8, 
                    ease: "easeOut",
                    delay: 1 
                }}
                className='flex flex-col gap-5 mt-[-50px]'
            >
                <h1 className="text-white text-[80px] leading-[90px] tracking-[-1.6px] font-medium max-w-[65%]">
                    The universal memory API for the AI era
                </h1>
                <div className=" flex items-center gap-10">
                    <Button size="lg" showShortCut={true} />
                    <div className="flex flex-col gap-2">
                        <p className="text-white text-[16px] leading-[28px] tracking-[-0.4px]">
                            Context engine for your app. Personalise LLMs for
                            your users.
                        </p>
                        <p className="text-white text-[16px] leading-[28px] tracking-[-0.4px]">
                            Built for developers who ship.{' '}
                            <span className="underline">
                                <Link
                                    href="https://docs.supermemory.ai"
                                    target="_blank"
                                >
                                    Start building
                                </Link>
                            </span>{' '}
                            <sup className="text-white text-[12px] leading-[28px] tracking-[-0.4px]">
                                DOCS
                            </sup>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
