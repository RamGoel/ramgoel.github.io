import CustomLink from '@/components/CustomLink'
import { CONTRIBUTIONS, projects } from '@/utils/data'
import Image from 'next/image'

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
                as well.
            </p>

            <div className="flex flex-col gap-4">
                {CONTRIBUTIONS.map((item, index) => {
                    return (
                        <div
                            key={item.name}
                            className="flex flex-col lg:flex-row lg:items-center gap-2"
                        >
                            <p className="text-neutral-500 hidden lg:block">
                                {index + 1}.{' '}
                            </p>
                            <Image
                                src={item.icon}
                                width={20}
                                height={20}
                                alt="icon"
                            />
                            <CustomLink
                                extraClassName="w-fit"
                                href={item.links[0].link}
                            >
                                {item.name}
                            </CustomLink>
                            <p className="text-neutral-500">
                                {item.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WorkPage
