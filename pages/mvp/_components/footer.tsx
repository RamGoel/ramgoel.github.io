import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="w-full py-8 px-4 text-left  md:text-center text-white">
            <p className="text-sm">
                Need custom work? or any assistance{' '}
                <Link
                    href="mailto:rgoel766@gmail.com"
                    className="text-emerald-500 hover:text-emerald-400 underline transition-colors"
                >
                    Send me an email
                </Link>
            </p>
        </footer>
    )
}

export default Footer
