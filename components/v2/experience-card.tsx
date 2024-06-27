import Image from 'next/image'
import { ExperienceProps } from '../portfolio/experience/experience.types'

const ExperienceCard = ({ experience }: { experience: ExperienceProps }) => {
    return (
        <div className=" border w-11/12 flex flex-col-reverse md:flex-row items-center justify-between  md:w-[800px] rounded-xl  mx-auto p-7">
            <div className="w-full md:w-[80%]">
                <h1 className="text-2xl text-violet-600 font-semibold">
                    {experience.role}
                </h1>
                <p className="text-md mt-2">
                    @{experience.company} ({experience.start} - {experience.end}
                    )
                </p>
                <div className="w-[200px] my-1 h-[3px] "></div>
                <p
                    className=""
                    dangerouslySetInnerHTML={{ __html: experience.description }}
                ></p>
            </div>
            <div>
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
    )
}

export default ExperienceCard
