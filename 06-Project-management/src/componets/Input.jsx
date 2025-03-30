import { forwardRef } from "react";
const Input = forwardRef(({id, label, textarea, type, ...props}, ref) => {
    const inputClass = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500" htmlFor={id}>{label}</label>
            {textarea ? <textarea ref={ref} className={inputClass} {...props} /> : <input type={type ? type : 'text'} ref={ref} className={inputClass} id={id} {...props} />}
        </p>
    )
});

export default Input;