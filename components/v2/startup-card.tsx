import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const StartupCard = ({ startup }: { startup: any }) => {
    return (
        <div className=" w-11/12 flex flex-col gap-4 md:flex-row items-center justify-between rounded-xl  mx-auto">
            <div className="flex items-center w-[50px] mr-auto justify-start md:justify-center">
                <div
                    onClick={() => window.open(startup.link, '_blank')}
                    className={`relative w-[50px] h-[50px] hover:scale-90 transition-all cursor-pointer flex items-center justify-center  rounded-full border-[5px]`}
                >
                    {startup.image ? (
                        <Image
                            src={startup.image}
                            width={100}
                            height={100}
                            alt="logo"
                            className="my-4 mr-auto rounded-full"
                        />
                    ) : null}
                    <div className="bg-violet-700 shadow-xl z-[500] bottom-[-15px] left-[35%] absolute rounded-full text-white w-[16px] h-[16px] flex items-center justify-center">
                        <ArrowUpRight size={12} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-md text-violet-600 font-semibold">
                        {startup.name}
                    </h1>

                    <p className="text-sm ">{startup.time}</p>
                </div>
                <p className="text-sm  mt-[-2px] opacity-75">
                    {startup.description}
                </p>
            </div>
        </div>
    )
}

export default StartupCard
