export default function Section({title, children, ...props}) { // Forwarding props to wrapped elements
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}