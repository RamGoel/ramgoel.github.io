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
            className={`group relative border border-dashed border-neutral-300/50 rounded-lg bg-transparent transition-all duration-300 hover:border-neutral-400 hover:shadow-sm overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div className="w-full aspect-video">
                {image.endsWith('.gif') ? (
                    <img src={image} alt={title} className="w-full h-full object-cover transition-all duration-300" />
                ) : (
                    <Image src={image} alt={title} width={320} height={180} className="w-full h-full object-cover transition-all duration-300" />
                )}
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-sm font-semibold text-white leading-tight mb-0.5">{title}</h3>
                <p className="text-xs text-white/80 leading-relaxed line-clamp-2">{description}</p>
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
