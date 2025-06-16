'use client'

import Script from 'next/script'


const SarvamPage = () => {
    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center">
            <div id="sarvam-voice-widget-container"></div>
            <Script
                key={`AngelOneAdv-948f712a-7122-${Date.now()}`}
                src="http://localhost:4000/integrate.js"
                id="sarvam-widget-script"
                data-app-id={'AngelOneAdv-948f712a-7122'}
                data-token={`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYXJ2YW1haS9yYW1Ac2FydmFtLmFpIiwiZXhwIjoxNzUwNTg4ODQ4LjcxNTk3OCwib3JnX2lkIjoic2FydmFtYWkiLCJ1c2VyX2lkIjoicmFtQHNhcnZhbS5haSIsIm5hbWUiOiJSYW0gR29lbCIsImVtYWlsIjoicmFtQHNhcnZhbS5haSIsInJvbGVzIjpbImF1dGhvciJdLCJjb19yb2xlcyI6W119.2j524V2qbvooBs5tKkjtNx0gKJ_1f7I-ofe_GuFyF7M`}
                data-org-name={`sarvamai`}
                data-app-version={`1`}
            />
        </div>
    )
}

export default SarvamPage
