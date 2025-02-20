import { Fira_Code } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'

const font = Fira_Code({
    weight: ['400'],
    subsets: ['latin'],
})

const LINKS = [
    {
        label: 'about',
        href: '/',
    },
    {
        label: 'work',
        href: '/work',
    },
    {
        label: 'writings',
        href: '/blog',
    },
]
const Sidebar = () => {
    const router = useRouter()
    const pathname = router.pathname
    return (
        <div className={`w-[10%] flex lg:flex-col gap-4 ${font.className}`}>
            {LINKS.map((item) => {
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`text-sm  hover:text-white ${pathname === item.href ? 'text-white' : 'text-neutral-400'}`}
                    >
                        {item.label}
                    </Link>
                )
            })}
        </div>
    )
}

export default Sidebar
