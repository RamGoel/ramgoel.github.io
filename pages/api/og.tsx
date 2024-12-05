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
                        'linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #CFFAFE 75%)',
                }}
            >
                {/* <p style={{ fontSize: '20px', fontFamily: 'SF Pro' }}>
                        Ram Goel
                    </p> */}

                <h1
                    style={{
                        fontSize: '100px',
                        fontFamily: 'SF Pro',
                        background:
                            'linear-gradient(to bottom right, #000000 21.66%, #78716c 86.47%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        textAlign: 'center',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {title}
                </h1>
                <p style={{ fontSize: '28px', fontFamily: 'SF Pro' }}>
                    Ram Goel
                </p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
