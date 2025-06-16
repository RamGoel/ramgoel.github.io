import Link from 'next/link'
import Button from './Button'

export default function CornerCard({
    categoryText,
    title,
    description,
    code,
    buttonText,
}: {
    categoryText: string
    title: React.ReactNode
    description: React.ReactNode
    code: string
    buttonText: React.ReactNode
}) {
    return (
        <div>
            <div className="w-full h-[80vh] bg-gradient-to-b p-5 from-blue-500 via-blue-700/50 to transparent">
                <div className="rounded-3xl flex items-top gap-[4rem] bg-[#21252A] p-[6rem]">
                    <div className="flex flex-col gap-[3rem]">
                        <p className="text-[12px] uppercase text-[#4D4D4D]">
                            {categoryText}
                        </p>
                        <h1 className="text-[44px] text-white font-medium leading-[50px] tracking-[-0.88px]">
                            {title}
                        </h1>
                        <p className="text-[16px] text-[#DEDEDE] font-light">
                            {description}
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
                                {code}
                            </pre>
                        </div>

                        <div className="flex justify-center">
                            <Button className="px-[60px]" text={buttonText} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
