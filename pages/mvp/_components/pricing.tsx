import { ArrowUpRight, CheckIcon, Clock10, InfoIcon } from 'lucide-react'
import React from 'react'

const FEATURES = [
    'Clean + Scalable Code',
    'Regular Updates',
    'Assistance with Launch',
    'NextJS + MongoDB + Express Stack',
    'Unlimited Revisions',
    'Design + Development:: I can build without designs, so you can get a fully functional MVP in 3 weeks',
    'Optimized for Performance & SEO',
]

const PricingSection = () => {
    return (
        <div className="flex flex-col mb-[50px] text-white items-center justify-center">
            <h1 className="text-4xl font-bold">Our Pricing</h1>
            <p className="text-neutral-500 w-3/4 md:w-full text-center text-lg mt-2">
                Simple pricing to{' '}
                <span className="text-emerald-500">
                    speed up your decision, instead of delays.
                </span>{' '}
                No hidden costs
            </p>

            <div className="flex flex-row mt-10 gap-10">
                <div
                    key={1}
                    className="border-2 relative max-w-[400px] flex flex-col rounded-lg border-neutral-800 p-6"
                >
                    <h1 className="text-2xl font-bold">Custom Pricing</h1>
                    <p className="opacity-60 w-full mt-2">
                        Book a call with me and we can discuss your project in
                        detail
                    </p>

                    <div className="flex gap-2 flex-col mt-4">
                        {FEATURES.map((feature) => (
                            <p
                                key={feature}
                                className=" flex flex-row items-center gap-2"
                            >
                                <CheckIcon className="w-4 h-4 text-emerald-500" />
                                {feature.split('::')[0]}

                                {feature.includes('::') ? (
                                    <span className="text-neutral-300 cursor-pointer">
                                        <InfoIcon
                                            data-tooltip-id="hover-tooltip"
                                            data-tooltip-content={
                                                feature.split('::')[1]
                                            }
                                            className="w-4 h-4"
                                        />
                                    </span>
                                ) : null}
                            </p>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            window.open(
                                'https://cal.com/ram-goel/15min',
                                '_blank'
                            )
                        }}
                        className="bg-emerald-600 flex flex-row items-center justify-center gap-2 hover:bg-emerald-700 h-12 text-white px-4 py-2 rounded-md mt-4"
                    >
                        Book a Call <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PricingSection
