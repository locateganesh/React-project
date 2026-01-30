import React, { useContext, useRef } from 'react';
import style from './NewTodo.module.css';
import { TodosContext } from '../store/todo-context';

// const NewTodo: React.FC<{onAddTodo: (text: string) => void }> = (props) => {
//     const todoTextInput = useRef<HTMLInputElement>(null);

//     const submitHandler = (event: React.FormEvent) => {
//         event.preventDefault();
//         const enteredText = todoTextInput.current?.value || "";
//         if (enteredText?.trim()?.length === 0) {
//             return;
//         }
//         props.onAddTodo(enteredText);
//     };

//     return <form onSubmit={submitHandler} className={style.form}>
//         <label htmlFor="todo">Todo Text</label>
//         <input type="text" name="todo" id="todo" ref={todoTextInput} />
//         <button type="submit">Add Todo</button>
//     </form>
// }
// export default NewTodo;


// Using React
const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const todoTextInput = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = todoTextInput.current?.value || "";
        if (enteredText?.trim()?.length === 0) {
            return;
        }
        todosCtx.addTodo(enteredText);
    };

    return <form onSubmit={submitHandler} className={style.form}>
        <label htmlFor="todo">Todo Text</label>
        <input type="text" name="todo" id="todo" ref={todoTextInput} />
        <button type="submit">Add Todo</button>
    </form>
}

export default NewTodo;