'use client'
import { usePathname, useRouter } from 'next/navigation'

const sections = [
    { name: 'About', path: '/' },
    { name: 'Thoughts', path: '/thoughts' },
    { name: 'Projects', path: '/projects' },
] as const

function Sidebar() {
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
        <aside className="w-full lg:w-[160px] p-6 lg:p-8 lg:pt-12 lg:h-screen lg:sticky lg:top-0 flex lg:flex-col">
            <nav className="flex lg:flex-col gap-1 font-display">
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
        </aside>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Vertical Divider */}
            <div className="hidden lg:block pt-12">
                <div className="w-px h-[70vh] bg-neutral-100" />
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-12 lg:pl-16 lg:max-w-2xl">
                {children}
            </main>

            {/* Last Updated */}
            <div className="fixed bottom-4 left-4 text-xs text-neutral-400 hidden lg:block font-display">
                Last updated: April 2026
            </div>
        </div>
    )
}
