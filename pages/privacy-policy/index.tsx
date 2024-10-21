import React from 'react'
import { AlertCircle } from 'lucide-react'

const PrivacyPolicy = () => {
    return (
        <div className="max-w-3/4 mx-auto p-6 bg-white dark:bg-neutral-800 shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
                Privacy Policy
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    1. Information We Collect
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    Our Chrome extension for voice typing on ChatGPT collects
                    only the necessary information to provide you with a
                    seamless voice typing experience:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300">
                    <li>
                        Voice input data (temporarily processed for
                        transcription)
                    </li>
                    <li>Usage statistics (anonymized and aggregated)</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    2. How We Use Your Information
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    We use the collected information solely for the purpose of:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300">
                    <li>Providing and improving our voice typing service</li>
                    <li>
                        Customizing your experience based on language
                        preferences
                    </li>
                    <li>
                        Analyzing usage patterns to enhance performance and
                        features
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    3. Data Security
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                    We implement industry-standard security measures to protect
                    your data. Voice input is processed in real-time and is not
                    stored on our servers. All data transmissions are encrypted
                    using SSL/TLS protocols.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    4. Third-Party Services
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                    Our extension interacts with ChatGPT, which has its own
                    privacy policy. We recommend reviewing ChatGPT's privacy
                    policy to understand how they handle your data.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    5. Your Rights
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                    You have the right to access, correct, or delete your
                    personal information. To exercise these rights, please
                    contact us at privacy@voicetypingextension.com.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                    6. Updates to This Policy
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                    We may update this privacy policy from time to time. We will
                    notify you of any changes by posting the new privacy policy
                    on this page and updating the &quot;Last updated&quot; date.
                </p>
            </section>

            <footer className="text-sm text-neutral-600 dark:text-neutral-400">
                <p>Last updated: October 21, 2024</p>
                <p>
                    If you have any questions about this privacy policy, please
                    contact us at rgoel766@gmail.com.
                </p>
            </footer>
        </div>
    )
}

export default PrivacyPolicy
