import Link from 'next/link'
import Button from './Button'
import CornerCard from './CornerCard'

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

            <CornerCard
                categoryText="solution • solution • solution"
                title={
                    <p>
                        Edit one line. <br /> Get longer threads, <br /> cost
                        savings <br /> memory.
                    </p>
                }
                description="Just add api.supermemory.ai/v3 to your OpenAI base URL — and get automatic long-term context across conversations."
                buttonText={
                    <p>
                        Start building
                        <sup className="text-[12px]">DOCS</sup>
                    </p>
                }
                code={`
import OpenAI from "openai"

const client = new OpenAI({  
  baseUrl: "https://api.supermemory.ai/v3/https://api.openai.com/v1/"
})
                            `}
            />
        </div>
    )
}
