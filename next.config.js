/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/docschat',
                destination: 'https://crustdata-neon.vercel.app/',
                permanent: true,
            },
             {
        source: '/hackathon', // the page you want to redirect from
        destination: 'https://hackathon-tau-red.vercel.app/', // where you want to redirect to
        permanent: true, // true = 308 redirect (good for SEO if it's permanent)
          }
        ]
    },
}

module.exports = nextConfig
