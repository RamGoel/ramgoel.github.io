import Hero from '@/components/v2/hero'
import Transition from '@/layouts/transition'
import V2Layout from '@/layouts/v2'

export default function Home() {
    return (
        <V2Layout>
            <Transition>
                <Hero />
            </Transition>
        </V2Layout>
    )
}
