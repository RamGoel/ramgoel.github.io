import Link from 'next/link'
import Button from './Button'

export default function Product() {
    return (
        <div className="min-h-screen flex flex-col items-center gap-[2rem] py-[5rem]">
            <h1 className="text-[12px] uppercase text-[#4D4D4D]">
                solution • solution • solution
            </h1>
            <h1 className="text-[16px] text-[#DEDEDE] font-light">
                We’ve seen what it’s like to build memory infrastructure the{' '}
                <br />
                hard way — so we built supermemory to make it disappear.
            </h1>

            <div className="w-full h-[80vh] bg-gradient-to-b p-5 from-blue-500 via-blue-700/50 to transparent">
                <div className="rounded-3xl flex items-top gap-[4rem] bg-[#21252A] p-[6rem]">
                    <div className="flex flex-col gap-[3rem]">
                        <p className="text-[12px] uppercase text-[#4D4D4D]">
                            product • product • product
                        </p>
                        <h1 className="text-[44px] text-white font-medium leading-[50px] tracking-[-0.88px]">
                            Edit one line. <br /> Get longer threads, <br />{' '}
                            cost savings <br /> memory.
                        </h1>
                        <p className="text-[16px] text-[#DEDEDE] font-light">
                            Just add{' '}
                            <Link
                                href="https://api.supermemory.ai/v3"
                                className="text-white underline bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
                            >
                                api.supermemory.ai/v3
                            </Link>{' '}
                            to your OpenAI base URL — and <br /> get automatic
                            long-term context across conversations.
                        </p>
                    </div>

                    <div className="flex w-1/2 flex-col gap-[2rem]">
                        <div
                            style={{
                                boxShadow:
                                    'inset 0 0 0 6px #06060640,inset 0 6px 3px #54545440',
                            }}
                            className="rounded-3xl h-fit bg-[#1c2026] p-[2rem] border border-white/20"
                        >
                            <pre className="text-[16px] whitespace-pre-wrap text-[#DEDEDE] font-light">
                                {`
import OpenAI from "openai"

const client = new OpenAI({  
  baseUrl: "https://api.supermemory.ai/v3/https://api.openai.com/v1/"
})
                            `}
                            </pre>
                        </div>

                        <div className='flex justify-center'>
                        <Button
                            className='px-[60px]'
                            text={
                                <p>
                                    Start building <sup className="text-[12px]">DOCS</sup>
                                </p>
                            }
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
