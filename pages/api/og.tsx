/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
    runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const title = searchParams.get('title') || 'Post'

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    backgroundImage:
                        'linear-gradient(to bottom right,rgb(39, 72, 179) 25%,rgb(14, 98, 255) 75%)',
                }}
            >
                <h1
                    style={{
                        fontSize: '130px',
                        fontWeight: 'bold',
                        fontFamily: 'Montserrat Bold, sans-serif',
                        background:
                            'linear-gradient(to bottom right,rgb(242, 242, 242) 21.66%,rgb(255, 255, 255) 86.47%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        textAlign: 'center',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {title}
                </h1>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
