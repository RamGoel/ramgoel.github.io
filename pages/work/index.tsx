import CustomLink from '@/components/CustomLink'
import { projects } from '@/utils/data'
import { Globe2 } from 'lucide-react'
import { SiGithub } from 'react-icons/si'

const WorkPage = () => {
    return (
        <div className="text-md leading-loose flex flex-col gap-4">
            <div className="flex flex-col w-3/4 gap-6">
                {projects.map((item, index) => {
                    return (
                        <div key={item.id} className="flex gap-2 flex-col">
                            <h3 className="text-md">
                                {item.title}{' '}
                                {item.users
                                    ? `(${item.users}+ users)`
                                    : item.stars
                                      ? `(${item.stars} stars)`
                                      : ''}
                            </h3>
                            <p className="text-sm mt-[-7px] text-neutral-400">
                                {item.content}
                            </p>

                            <div className="flex gap-4 items-center">
                                {item.type === 'oss' ? (
                                    <CustomLink href={item.url}>
                                        <SiGithub size={15} />{' '}
                                        <p className="text-sm">
                                            #{item.url.split('/').at(-1)}
                                        </p>
                                    </CustomLink>
                                ) : null}
                                {item.github ? (
                                    <CustomLink href={item.github}>
                                        <SiGithub size={15} />{' '}
                                        <p className="text-sm">View Repo</p>
                                    </CustomLink>
                                ) : null}
                                {item.url && item.type !== 'oss' ? (
                                    <CustomLink
                                        href={
                                            Array.isArray(item.url)
                                                ? item.url[0]
                                                : item.url
                                        }
                                    >
                                        <Globe2 size={15} />{' '}
                                        <p className="text-sm">Website</p>
                                    </CustomLink>
                                ) : null}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WorkPage
