import { useState } from "react";
import Output from "./Output";

const Greeting = () => {
    const [changeText, setChangeText] = useState(false);
    return (
        <div>
            <h1>Hello, World!</h1>
            {!changeText ? <Output>Welcome to our application.</Output> : <Output>Have a great day!</Output>}
            <button onClick={() => setChangeText(true)}>Change Text</button>
        </div>
    )
};

export default Greeting;