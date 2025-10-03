

// [slug] talls the the blog has some dynamic path after blog. But we don't know yet, that's why slug is used.
export default function BlogPostPage({ params }) {
    return <main>
        <h1>The Blog Post</h1>
        { params.slug }
    </main>
}