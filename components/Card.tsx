import Image from 'next/image'

type CardProps = {
    image: string
    title: string
    description: string
    href?: string
    onClick?: () => void
}

export default function Card({ image, title, description, href, onClick }: CardProps) {
    const content = (
        <div
            onClick={onClick}
            className={`group flex flex-col gap-2 border border-dashed border-neutral-300/50 rounded-lg p-3 bg-transparent transition-all duration-300 hover:border-neutral-400 hover:shadow-sm ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div className="w-full aspect-video rounded-md overflow-hidden shrink-0">
                {image.endsWith('.gif') ? (
                    <img src={image} alt={title} className="w-full h-full object-cover transition-all duration-300" />
                ) : (
                    <Image src={image} alt={title} width={320} height={180} className="w-full h-full object-cover transition-all duration-300" />
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
            </div>
        </div>
    )

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                {content}
            </a>
        )
    }

    return content
}
