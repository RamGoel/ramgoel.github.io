import Header from './components/Header'
import Footer from './components/Footer'
import HeavyChart from './components/HeavyChart'
import BlogPostList from './components/BlogPostList'

export default function Home() {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to my blog!</h1>
                <BlogPostList />
                {/* HeavyChart is loaded even if not displayed */}
                <HeavyChart />
            </main>
            <Footer />
        </div>
    )
}
