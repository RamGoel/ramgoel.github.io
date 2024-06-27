import { experiences } from '@/components/v2/data'
import ExperienceCard from '@/components/v2/experience-card'
import V2Layout from '@/layouts/v2'

const Experience = () => {
    return (
        <V2Layout>
            <div>
                {experiences.map((item, index) => {
                    return <ExperienceCard experience={item} key={index} />
                })}
            </div>
        </V2Layout>
    )
}

export default Experience
