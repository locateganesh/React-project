'use client';
// error.js is a reserved name.
// it shows on any server or client side error occurs
// That's why it needs to use `use client`

export default function Error() {
    return <main className="error">
        <h1>An Error Occurred</h1>
        <p>Failed to fetch meal data. Please try again later.</p>
    </main>
}