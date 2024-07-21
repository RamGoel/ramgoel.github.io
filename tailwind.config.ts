import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                slide: 'slide 3.5s linear infinite',
            },
            fontSize: {
                sm: '0.8rem',
                md: '1rem',
                lg: '1.2rem',
                xl: '1.5rem',
                '2xl': '1.8rem',
                '3xl': '2.2rem',
                '4xl': '2.5rem',
                '5xl': '3rem',
                '6xl': '4rem',
                '7xl': '5rem',
            },
            keyframes: {
                slide: {
                    '0%': { transform: 'translateY(100%)', opacity: '0.1' },
                    '15%': { transform: 'translateY(0)', opacity: '1' },
                    '30%': { transform: 'translateY(0)', opacity: ' 1 ' },
                    '45%': { transform: 'translateY(-100%)', opacity: '1' },
                    '100%': { transform: 'translateY(-100%)', opacity: '0.1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
export default config
