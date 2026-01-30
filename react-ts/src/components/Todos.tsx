import type React from "react";
import TodoItem from "./TodoItem";
import style from './Todos.module.css';
import { useContext } from "react";
import { TodosContext } from "../store/todo-context";
// import type Todo from "../models/todo";

// const Todos: React.FC<{items: Todo[]; onRemoveTodo: (id: string) => void}> = (props) => {
//     const todosCtx = useContext(TodosContext);
//     return (
//         <ul className={style.todos}>
//             {todosCtx.items.map(item => <TodoItem key={item.id} id={item.id} text={item.text} onRemoveTodo={props.onRemoveTodo} />)}
//         </ul>
//     )
// }
// export default Todos;



// Using context
const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    return (
        <ul className={style.todos}>
            {todosCtx.items.map(item => (
                <TodoItem 
                    key={item.id} 
                    id={item.id} 
                    text={item.text} 
                    onRemoveTodo={() => todosCtx.removeTodo(item.id)} 
                />
            ))}
        </ul>
    )
}
export default Todos;