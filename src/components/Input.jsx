

export default function Input({label, id, type="text", error, ...props}) {
    return (
        <div className="control no-margin">
          <label htmlFor={id}>{label}</label>
          <input id={id} type={type} {...props}  />
          {error && <div className="control-error"><p>{error}</p></div>}
        </div>
    )
}
