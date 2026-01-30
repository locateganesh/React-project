import React, { useState } from "react";
import type { ReactNode } from "react";
import Todo from "../models/todo";

type TodosContextObject = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void
};

const TodosContext = React.createContext<TodosContextObject>({
    items: [],
    addTodo: () => {},
    removeTodo: () => {}
});

interface TodosContextProviderProps {
    children: ReactNode;
}

const TodosContextProvider: React.FC<TodosContextProviderProps> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);
        setTodos(prev => prev.concat(newTodo));
    };

    const removeTodoHandler = (todoId: string) => {
        const filteredTodo = todos.filter(item => item.id !== todoId);
        setTodos(filteredTodo);
    };

    const contextValue: TodosContextObject = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    };

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    )
};

export { TodosContext, TodosContextProvider };
export default TodosContextProvider;