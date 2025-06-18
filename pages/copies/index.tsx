import Link from 'next/link'

const copies = [
    {
        name: 'Sarvam',
        link: '/copies/sarvam',
    },
    {
        name: 'WhatsApp',
        link: '/copies/whatsapp',
    },
    {
        name: 'Supermemory',
        link: '/copies/supermemory',
    },
]

export default function Copies() {
    return (
        <div className="flex flex-col gap-4">
            <h1>Site Designs I&apos;ve Made</h1>
            <hr className="border-zinc-700" />
            {copies.map((copy, index) => (
                <Link
                    href={copy.link}
                    className="text-zinc-400 hover:text-zinc-300"
                    key={index}
                >
                    {index + 1}. {copy.name}
                </Link>
            ))}
        </div>
    )
}
