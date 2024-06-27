import { startups } from '@/components/v2/data'
import StartupCard from '@/components/v2/startup-card'
import Transition from '@/layouts/transition'
import V2Layout from '@/layouts/v2'

const Startups = () => {
    return (
        <V2Layout>
            <Transition>
                <div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="bg-[#604CC3] hidden md:visible w-[20px] rotate-[20deg] h-[20px]"></div>
                        <h1 className="text-3xl font-semibold">Startups </h1>
                    </div>
                    <p className="text-center mt-4">
                        Whatever I build, I call them startups :)
                    </p>
                    <div className="grid grid-cols-1 gap-[1rem] py-[50px]">
                        {startups.map((item: any, index: number) => {
                            return <StartupCard startup={item} key={index} />
                        })}
                    </div>
                </div>
            </Transition>
        </V2Layout>
    )
}

export default Startups
