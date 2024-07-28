import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

const ContributionCard = ({ contribution }: any) => {
    return (
        <div className=" w-11/12 flex flex-col gap-4 md:flex-row items-center justify-between rounded-xl  mx-auto">
            <div className="flex items-center w-fit mr-auto justify-start md:justify-center">
                <div
                    className={`relative w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] cursor-pointer flex items-center justify-center  rounded-full border-[5px]`}
                >
                    {contribution.icon ? (
                        <Image
                            src={contribution.icon}
                            width={100}
                            height={100}
                            alt="logo"
                            className="my-4 mr-auto  rounded-full"
                        />
                    ) : null}
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex mt-1 items-center flex-wrap justify-start gap-4">
                    {contribution?.links?.map(
                        (
                            item: { link: string; name: string },
                            index: number
                        ) => {
                            return (
                                <Link
                                    className="flex rounded-xl hover:underline text-xs items-center gap-1 justify-start"
                                    key={index}
                                    href={item.link}
                                >
                                    <FaGithub size={12} /> {contribution.name}/
                                    {item.name}
                                    {/* <ArrowUpRight size={12} /> */}
                                </Link>
                            )
                        }
                    )}
                </div>
                <div className="flex items-start justify-between">
                    <h1 className="text-md 2xl:text-lg text-violet-600 font-semibold">
                        {contribution.name}
                    </h1>
                </div>
                <p className="text-sm font-normal text-black inline ">
                    {contribution.description}
                </p>
            </div>
        </div>
    )
}

export default ContributionCard
