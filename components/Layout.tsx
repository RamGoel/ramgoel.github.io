'use client'
import { usePathname, useRouter } from 'next/navigation'

const sections = [
    { name: 'About', path: '/' },
    { name: 'Thoughts', path: '/thoughts' },
    { name: 'Projects', path: '/projects' },
] as const

function Nav() {
    const pathname = usePathname()
    const router = useRouter()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/'
        return pathname === path
    }

    const handleNavigation = (path: string) => {
        if (isActive(path)) return

        const doc = document as Document & { startViewTransition?: (callback: () => void) => void }
        if (doc.startViewTransition) {
            doc.startViewTransition(() => {
                router.push(path)
            })
        } else {
            router.push(path)
        }
    }

    return (
        <nav className="flex gap-1 font-display" style={{ viewTransitionName: 'nav' }}>
            {sections.map((section) => (
                <button
                    key={section.path}
                    onClick={() => handleNavigation(section.path)}
                    className={`
                        text-left px-3 py-2 rounded-lg text-[15px] tracking-tight
                        transition-colors duration-200
                        ${isActive(section.path)
                            ? 'text-neutral-900'
                            : 'text-neutral-400 hover:text-neutral-600'
                        }
                    `}
                >
                    {section.name}
                </button>
            ))}
        </nav>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full max-w-xl px-6 py-8 lg:py-16 space-y-8">
                <Nav />
                <main style={{ viewTransitionName: 'content' }}>
                    {children}
                </main>
            </div>
        </div>
    )
}
