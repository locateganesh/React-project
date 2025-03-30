export default function Tab({children, buttons}) {
    return (
        <>
            {buttons} {/* This is called slots */}
            {children}
        </>
    )
}