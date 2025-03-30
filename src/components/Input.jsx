
export default function Input({type, text, value, onInputChange}) {
    let createId = null;
    if (text) {
        const createIdFirst = text.charAt(0).toLowerCase();
        createId = createIdFirst + text.replace(' ', '').slice(1);
    }

    const inputChangeHandler = (e) => {
        onInputChange(e.target.name, e.target.value);
    };
    
    return <div className="input-group">
        <label htmlFor={createId}>{text}</label>
        <input type={type} name={createId} id={createId} value={value} onChange={inputChangeHandler} required />
    </div>
}