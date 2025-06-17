

export default function Error({title = 'An Error Occurred!', message}) {
    return <div className="error">
        <h2>{title}</h2>
        <p>{message}</p>
    </div>
}