import style from './TodoItem.module.css';
import type React from "react";

const TodoItem: React.FC<{ text: string; id: string; onRemoveTodo: (id: string) => void }> = (props) => {
    return <li className={style.item} onClick={() => props.onRemoveTodo(props.id)}>{props.text}</li>
}
export default TodoItem;
