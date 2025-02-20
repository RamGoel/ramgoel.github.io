import CustomLink from '@/components/CustomLink'

export default function Home() {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">Ram Goel</h1>
            <div className="flex flex-col text-sm leading-relaxed tracking-wide gap-5">
                <p className="text-neutral-400">
                    I&apos;m a developer based in India. My interests lies
                    around GenAI, web development and solving actual problems
                    using code. I&apos;ve built{' '}
                    <CustomLink href="https://noterr.ramgoel.com">
                        Noterr
                    </CustomLink>{' '}
                    to help people collect information super easily from
                    internet.
                </p>

                <p className="text-neutral-400">
                    I wrote my first line of code in 2019. I&apos;ve spent my
                    college doing internships, freelance projects, and
                    attending/organizing developer events. In 2024, I graduated
                    from a computer science degree from India, and joined as a
                    software engineer at{' '}
                    <CustomLink href="https://getconch.ai/">ConchAI</CustomLink>
                </p>

                <p className="text-neutral-400">
                    you can find me on{' '}
                    <CustomLink href="https://linkedin.com/in/ramgoel/">
                        Linkedin
                    </CustomLink>
                    ,{' '}
                    <CustomLink href="https://github.com/RamGoel">
                        Github
                    </CustomLink>
                    ,{' '}
                    <CustomLink href="https://x.com/theRamGoel">
                        Twitter
                    </CustomLink>{' '}
                    or{' '}
                    <CustomLink href="https://youtube.com/@theRamGoel">
                        Youtube
                    </CustomLink>
                </p>
            </div>
        </div>
    )
}
