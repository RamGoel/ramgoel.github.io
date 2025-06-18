import Image from 'next/image'
import { RiGithubFill, RiGithubLine, RiProductHuntLine, RiTwitterLine } from 'react-icons/ri'
import flow from '../images/flow.png'
import medtech from '../images/medtech.png'
import mixus from '../images/mixus.png'

const ACHIEVEMENTS = [
    {
        icon: <RiProductHuntLine className="text-[#DEDEDE] w-[70px] h-[70px]" />,
        description: '#1 Product of the day at Product hunt',
    },
    {
        icon: <RiGithubFill className="text-[#DEDEDE] w-[70px] h-[70px]" />,
        description: 'Starred by over 9,000 users on Github',
    },
    {
        icon: <Image src={flow} alt="Flow" width={48} height={48} className='w-[70px] h-[70px] object-contain' />,
        description: 'Flow uses supermemory to build the cursor for writing',
    },
    {
        icon: <Image src={medtech} alt="Medtech" width={48} height={48} className='w-[70px] h-[70px] object-contain' />,
        description:'Medtech Vendors uses supermemory to search through 500k vendors'
    },
    {
        icon: <Image src={mixus} alt="Mixus" width={48} height={48} className='w-[70px] h-[70px] object-contain' />,
        description:'Mixus uses Supermemory to power co-intelligence Agentic platform'
    },
]

export default function Community() {
    return (
        <div className="flex min-h-[120vh] flex-col gap-10">
            <p className="text-center text-[24px] font-medium text-[#DEDEDE]">
                Trusted by Open Source, <br /> enterprise, and more than
            </p>
            <Image
                src="/community.svg"
                alt="Community"
                className="mx-auto"
                width={1100}
                height={100}
            />
            <p className="text-center text-[24px] font-medium text-[#DEDEDE]">
                of you
            </p>

            <div className="flex flex-wrap gap-10 max-w-4xl justify-center mx-auto">
                {ACHIEVEMENTS.map((achievement) => (
                    <div key={achievement.description} className="flex flex-col gap-4">
                        <div className='flex items-center justify-center'>{achievement.icon}</div>
                        <p className="text-[12px] max-w-[220px] text-center uppercase font-light text-[#DEDEDE]">
                            {achievement.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
