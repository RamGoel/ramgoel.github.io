import { CheckIcon, Clock10, InfoIcon } from 'lucide-react'
import React from 'react'

const PRICING_ITEMS = [
    {
        id: 1,
        title: 'Ready to Launch MVP',
        description:
            'You tell me what you want, share any samples you have, and I will build it for you',
        price: '$2500',
        features: [
            'Clean + Scalable Code',
            'Regular Updates',
            'Assistance with Launch',
            'NextJS + MongoDB + Express Stack',
            'Unlimited Revisions',
            'Design + Development:: I can build without designs, so you can get a fully functional MVP in 3 weeks',
            'Optimized for Performance & SEO',
        ],
    },
]

const PricingSection = () => {
    return (
        <div className="flex flex-col mb-[50px] text-white items-center justify-center">
            <h1 className="text-4xl font-bold">Our Pricing</h1>
            <p className="text-neutral-500 text-center text-lg mt-2">
                Simple pricing to{' '}
                <span className="text-emerald-500">
                    fasten up your decision, instead of delays.
                </span>{' '}
                No hidden costs
            </p>

            <div className="flex flex-row mt-10 gap-10">
                {PRICING_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        className="border-2 relative max-w-[400px] flex flex-col rounded-lg border-neutral-800 p-6"
                    >
                        <h1 className="text-5xl font-bold mb-2">
                            {item.price}
                        </h1>
                        <div className="flex absolute top-3 right-3 flex-row w-fit text-white rounded-xl bg-emerald-500/40 border-emerald-500 border-2 text-sm px-3 py-1 items-center">
                            <Clock10 className="mr-1" size={15} /> Limited Time
                            Offer
                        </div>
                        <h1 className="text-2xl font-bold">{item.title}</h1>
                        <p className="opacity-60 w-full mt-2">
                            {item.description}
                        </p>

                        <div className="flex gap-2 flex-col mt-4">
                            {item.features.map((feature) => (
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
                            data-tally-open="m6QrzY"
                            data-tally-emoji-text="🚀"
                            data-tally-emoji-animation="wave"
                            data-tooltip-id="hover-tooltip"
                            data-tooltip-content="A Form will open in bottom right"
                            className="bg-emerald-600 hover:bg-emerald-700 h-12 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingSection
