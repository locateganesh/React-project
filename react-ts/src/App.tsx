// import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import TodosContextProvider from './store/todo-context';
// import Todo from './models/todo';

function App() {
  // const todos: Todo[] = [
  //   new Todo("Learn React"),
  //   new Todo("Learn Typescript"),
  // ];
  

  return (
    <TodosContextProvider>
      {/* <NewTodo onAddTodo={addTodoHandler} /> */}
      <NewTodo />
      {/* <Todos items={todos} onRemoveTodo={removeTodoHandler} /> */}
      <Todos />
    </TodosContextProvider>
  )
}
export default App
