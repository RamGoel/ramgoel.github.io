import { CheckIcon } from 'lucide-react'
import React from 'react'

const PRICING_ITEMS = [
    {
        id: 1,
        title: 'Figma to Website (<5 pages)',
        description: "We'll convert your figma design to beautiful website",
        price: '$800',
        features: [
            'Pixel perfect conversion',
            'Responsive design',
            'Optimized for performance',
            'Cross browser compatibility',
            'Normally 1 week turnaround',
        ],
    },
    {
        id: 1,
        title: 'Figma to WebApps (>5 pages)',
        description:
            "We'll convert your figma design to fully functional applications",
        price: '$1500',
        features: [
            'All features of the website plan',
            'Normally 2 week turnaround',
            'Personal Communication Channel',
        ],
    },
]

const PricingSection = () => {
    return (
        <div
            id="pricing"
            className="flex flex-col mb-[50px] text-white items-center justify-center"
        >
            <h1 className="text-4xl font-bold">Pricing</h1>

            <div className="flex flex-row mt-10 gap-10">
                {PRICING_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        className="border-2 max-w-[400px] flex flex-col rounded-lg border-neutral-800 p-6"
                    >
                        <h1 className="text-5xl font-bold mb-2">
                            {item.price}
                        </h1>
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
                                    {feature}
                                </p>
                            ))}
                        </div>

                        <button className="bg-emerald-600 hover:bg-emerald-700 h-12 text-white px-4 py-2 rounded-md mt-4">
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingSection
