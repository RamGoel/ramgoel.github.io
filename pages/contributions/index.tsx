import ContributionCard from '@/components/contribution-card'
import { contributions } from '@/data/data'
import MainLayout from '@/layouts/main'

const ContributionsPage = () => {
    return (
        <MainLayout>
            <div>
                <div className="flex items-center justify-center gap-3">
                    <div className="bg-[#604CC3] hidden md:visible w-[20px] rotate-[20deg] h-[20px]"></div>
                    <h1 className="text-3xl font-semibold">Contributions </h1>
                </div>
                <p className="text-center text-sm 2xl:text-md mt-4">
                    I contribute to open source projects once in a while
                </p>
                <div className="grid w-full md:w-1/2 mx-auto grid-cols-1 gap-[3rem] py-[50px]">
                    {contributions.map((item) => {
                        return (
                            <ContributionCard
                                key={item.name}
                                contribution={item}
                            />
                        )
                    })}
                </div>
            </div>
        </MainLayout>
    )
}

export default ContributionsPage
