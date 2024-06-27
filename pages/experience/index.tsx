import { experiences } from '@/components/v2/data'
import ExperienceCard from '@/components/v2/experience-card'
import Transition from '@/layouts/transition'
import V2Layout from '@/layouts/v2'

const Experience = () => {
    return (
        <V2Layout>
            <Transition>
                <div className="flex items-center justify-center gap-3">
                    <div className="bg-[#604CC3] hidden md:visible w-[20px] rotate-[20deg] h-[20px]"></div>
                    <h1 className="text-3xl font-semibold">Experience</h1>
                </div>
                <div className="grid grid-cols-1 gap-[1rem] py-[50px]">
                    {experiences
                        .filter((item) => item.type === 'profession')
                        .map((item, index) => {
                            return (
                                <ExperienceCard experience={item} key={index} />
                            )
                        })}
                </div>
            </Transition>
        </V2Layout>
    )
}

export default Experience
