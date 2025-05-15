
import { useState } from "react";

export function useInput(defaultValue, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    const handleInputChange = (event) => {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    const HandleInputBlur = () => {
        setDidEdit(true);
    }

    return {
        value: enteredValue,
        handleInputChange,
        HandleInputBlur,
        hasError: didEdit && !valueIsValid
    }

}