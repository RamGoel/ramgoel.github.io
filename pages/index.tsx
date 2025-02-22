import CustomLink from '@/components/CustomLink'
import { SKILLS } from '@/utils/data'
import Link from 'next/link'
import { FaGoogleDrive } from 'react-icons/fa'

export default function Home() {
    return (
        <div className="flex flex-col gap-2 w-full min-[1800px]:w-[65%]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">Ram Goel</h1>
                <Link
                    target="_blank"
                    href={
                        'https://drive.google.com/file/d/1VwbJvVsIM1LS0DYq5353ZwiZMhd28nOX/view?usp=drive_link'
                    }
                >
                    <button className="flex gap-2 border hover:border-neutral-500 transition-all hover:scale-105 px-3 py-1 border-neutral-600 rounded-full text-sm items-center">
                        <FaGoogleDrive size={15} />
                        <p>View Resume</p>
                    </button>
                </Link>
            </div>
            <div className="flex flex-col text-justify  text-md leading-loose tracking-wide gap-5">
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
                    ,{'  '}
                    <CustomLink href="https://github.com/RamGoel">
                        Github
                    </CustomLink>
                    ,{'  '}
                    <CustomLink href="https://x.com/theRamGoel">
                        Twitter
                    </CustomLink>{' '}
                    or{'  '}
                    <CustomLink href="https://youtube.com/@theRamGoel">
                        Youtube
                    </CustomLink>
                </p>
            </div>

            <div className="flex items-center mt-5 gap-3 flex-wrap">
                {SKILLS.map((item) => {
                    return (
                        <div
                            key={item.name}
                            className="flex items-center text-sm hover:scale-[1.05] rounded-full transition-all cursor-pointer gap-2 px-3 py-1 border border-neutral-600"
                        >
                            {item.icon ? <item.icon size={18} /> : null}
                            <p>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
