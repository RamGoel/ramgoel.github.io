import { ExperienceProps } from '../portfolio/experience/experience.types'

const ExperienceCard = ({ experience }: { experience: ExperienceProps }) => {
    return (
        <div>
            <h1>{experience.role}</h1>
        </div>
    )
}

export default ExperienceCard
