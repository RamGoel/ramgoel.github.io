import Image from 'next/image'

const ExperienceCard = ({ experience }: { experience: any }) => {
    return (
        <div className=" relative w-11/12 flex gap-4 flex-col md:flex-row items-stretch justify-between py-1 px-[5%]">
            <div className="flex  items-top justify-start md:justify-center">
                <div
                    onClick={() => {
                        window.open(experience.url, '_blank')
                    }}
                    className={`w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] hover:scale-90 transition-all cursor-pointer ${experience.company.toLowerCase() !== 'surplus' ? 'p-1' : ''} flex items-center justify-center overflow-hidden rounded-full border-[5px]`}
                >
                    {experience.icon ? (
                        <Image
                            src={experience.icon}
                            width={100}
                            height={100}
                            alt="logo"
                            className="my-4 mr-auto"
                        />
                    ) : null}
                </div>
            </div>
            <div className="w-full flex flex-col gap-1">
                <h1 className="text-lg font-semibold ">{experience.company}</h1>
                <div className="flex text-md  gap-2 flex-wrap items-center flex-col-reverse md:flex-row justify-start md:justify-between">
                    <p className="w-full md:w-auto">{experience.role}</p>
                    <p className="w-full md:w-auto">
                        {experience.start} — {experience.end}
                    </p>
                </div>
                <div
                    className="opacity-75 tracking-wide text-[14px]"
                    dangerouslySetInnerHTML={{ __html: experience.description }}
                ></div>
            </div>
        </div>
    )
}

export default ExperienceCard
