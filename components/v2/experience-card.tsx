import Image from 'next/image'
import { ExperienceProps } from '../portfolio/experience/experience.types'

const ExperienceCard = ({ experience }: { experience: ExperienceProps }) => {
    return (
        <div className=" relative w-11/12 flex gap-4 flex-col md:flex-row items-center justify-between py-1 px-[5%]">
            <div className="flex items-center justify-start md:justify-center">
                <div
                    onClick={() => {
                        window.open(experience.url, '_blank')
                    }}
                    className={`w-[50px] h-[50px] hover:scale-90 transition-all cursor-pointer ${experience.company.toLowerCase() !== 'surplus' ? 'p-1' : ''} flex items-center justify-center overflow-hidden rounded-full border-[5px]`}
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
                <h1 className="text-md font-semibold ">{experience.company}</h1>
                <div className="flex text-sm opacity-75 flex-wrap items-center justify-between">
                    <p>{experience.role}</p>
                    <p>
                        {experience.start} — {experience.end}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard
