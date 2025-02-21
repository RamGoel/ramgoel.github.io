import CustomLink from '@/components/CustomLink'
import { CONTRIBUTIONS, projects } from '@/utils/data'
import Image from 'next/image'
import Link from 'next/link'

const WorkPage = () => {
    return (
        <div className="text-sm flex flex-col w-full lg:w-3/4 gap-4">
            <p className="text-neutral-500">
                During these years, I was grateful that I&apos;ve got a chance
                to work with amazing people and impactful projects, I also built
                some side projects.
            </p>

            <div className="flex flex-col gap-4">
                {projects.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col lg:flex-row lg:items-center gap-2"
                        >
                            <p className="text-neutral-500 hidden lg:block">
                                {index + 1}.{' '}
                            </p>
                            <CustomLink extraClassName="w-fit" href={item.url}>
                                {item.title}
                            </CustomLink>
                            <p className="text-neutral-500">{item.content}</p>
                        </div>
                    )
                })}
            </div>

            <hr className="opacity-10 my-5 w-1/3" />

            <p className="text-neutral-500">
                Like any other developer, I heavily rely on open source
                projects, and I&apos;ve contributed to some open source projects
                as well. <br />
                <span className="text-xs inline-block mt-3">
                    * hover PR numbers to see details
                </span>
            </p>

            <div className="flex flex-col gap-4">
                {CONTRIBUTIONS.map((item, index) => {
                    return (
                        <div key={item.name} className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <p className="text-neutral-500 hidden lg:block">
                                    {index + 1}.{' '}
                                </p>
                                <Image
                                    src={item.icon}
                                    width={20}
                                    height={20}
                                    alt="icon"
                                />
                                <p>{item.name}</p>
                                <div className="flex gap-2">
                                    {item.links.map((link, index) => {
                                        const linkTitle = link.link
                                            .split('/')
                                            .at(-1)
                                        return (
                                            <Link
                                                key={link.id}
                                                href={link.link}
                                                className={`border-b inline-flex items-center gap-1 border-neutral-800 border-dashed text-neutral-300 hover:text-yellow-200 transition-all`}
                                                data-tooltip-id="hover-tooltip"
                                                data-tooltip-content={
                                                    link.description
                                                }
                                            >
                                                {linkTitle?.startsWith('pulls')
                                                    ? 'View All PRs'
                                                    : '#' + linkTitle}
                                                {index !== item.links.length - 1
                                                    ? ','
                                                    : ''}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WorkPage
