import Image from 'next/image'
import { RiExternalLinkLine } from 'react-icons/ri'

const StartupCard = ({ startup }: { startup: any }) => {
    return (
        <div className=" border w-11/12 flex flex-col-reverse md:flex-row items-center justify-between gap-[2rem]  md:w-[800px] rounded-xl  mx-auto p-7">
            <div className="flex flex-col gap-3 w-full md:w-[80%]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl text-violet-600 font-semibold">
                        {startup.name}
                    </h1>

                    <p className="font-semibold">{startup.time}</p>
                </div>
                <p
                    className=""
                    dangerouslySetInnerHTML={{ __html: startup.description }}
                ></p>
                {startup.link ? (
                    <div
                        onClick={() => window.open(startup.link, '_blank')}
                        className="flex bg-gray-200 cursor-pointer  h-[40px] w-[40px] rounded-full text-sm items-center justify-center"
                    >
                        <RiExternalLinkLine size={20} />
                    </div>
                ) : (
                    <p className="font-semibold text-violet-600 animate-pulse">
                        launching sooon!
                    </p>
                )}
            </div>
            <Image
                src={startup.image}
                width={100}
                height={100}
                alt="logo"
                className="my-4 mr-auto"
            />
        </div>
    )
}

export default StartupCard
