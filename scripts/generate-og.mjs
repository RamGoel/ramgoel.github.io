/**
 * Pre-renders static OG PNGs into public/og/ for GitHub Pages
 * (API routes are unavailable with `output: 'export'`).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createElement as h } from 'react'
import { unstable_createNodejsStream } from '@vercel/og'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const blogsDir = path.join(root, 'blogs')
const outDir = path.join(root, 'public', 'og')

const SITE_HOST = 'ramgoel.github.io'
const DEFAULT_SUBTITLE = 'Frontend platform · Design systems · Voice agents'

function ogLayout(title, subtitle = DEFAULT_SUBTITLE) {
    const fontSize =
        title.length > 80 ? 44 : title.length > 50 ? 52 : title.length > 28 ? 64 : 76

    return h(
        'div',
        {
            style: {
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#0a0a0a',
                backgroundImage:
                    'radial-gradient(ellipse at 0% 0%, #1a1a1a 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, #141414 0%, transparent 50%)',
                padding: '56px 72px 48px',
            },
        },
        h(
            'div',
            {
                style: {
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    maxWidth: 1040,
                },
            },
            h(
                'h1',
                {
                    style: {
                        fontSize,
                        fontWeight: 600,
                        color: '#fafafa',
                        letterSpacing: '-0.035em',
                        lineHeight: 1.12,
                        margin: 0,
                    },
                },
                title
            )
        ),
        h(
            'div',
            {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #262626',
                    paddingTop: 28,
                    marginTop: 40,
                },
            },
            h(
                'span',
                {
                    style: {
                        fontSize: 18,
                        color: '#a3a3a3',
                        letterSpacing: '0.01em',
                    },
                },
                SITE_HOST
            ),
            h('span', { style: { fontSize: 16, color: '#737373' } }, subtitle)
        )
    )
}

async function writePng(filename, title, subtitle) {
    const stream = await unstable_createNodejsStream(ogLayout(title, subtitle), {
        width: 1200,
        height: 630,
    })

    const chunks = []
    for await (const chunk of stream) {
        chunks.push(chunk)
    }

    const filePath = path.join(outDir, filename)
    fs.writeFileSync(filePath, Buffer.concat(chunks))
    console.log(`  ✓ ${filename}`)
}

function listBlogs() {
    return fs
        .readdirSync(blogsDir)
        .filter((f) => f.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.md$/, '')
            const { data } = matter(fs.readFileSync(path.join(blogsDir, file), 'utf8'))
            return {
                slug,
                title: typeof data.title === 'string' ? data.title : slug,
            }
        })
}

async function main() {
    fs.mkdirSync(outDir, { recursive: true })
    // Clear previous generated images so renamed/deleted blogs don't leave orphans
    for (const file of fs.readdirSync(outDir)) {
        if (file.endsWith('.png')) fs.unlinkSync(path.join(outDir, file))
    }

    console.log('Generating OG images → public/og/')

    await writePng(
        'default.png',
        "Hey, I'm Ram",
        DEFAULT_SUBTITLE
    )

    const experiments = [
        {
            slug: 'on-device-voice',
            title: 'On-device voice',
            subtitle: 'Experiment',
        },
        {
            slug: 'on-device-models',
            title: 'On-device chat',
            subtitle: 'Experiment',
        },
    ]

    for (const experiment of experiments) {
        await writePng(`${experiment.slug}.png`, experiment.title, experiment.subtitle)
    }

    for (const blog of listBlogs()) {
        await writePng(`${blog.slug}.png`, blog.title, 'Blog')
    }

    console.log('Done.')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
