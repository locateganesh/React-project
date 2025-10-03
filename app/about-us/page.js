
// to create a new page just create folder (folder name becomes url E.g. about-us) inside folder create a files called as page.js

import Link from "next/link";

export default function AboutPage() {
    return (
        <main>
            <h1>About us</h1>
            <p><Link href='/'>Back</Link></p>
        </main>
    )
}