import TodoFooter from './TodoFooter';
import TodoInput from './TodoInput';
import TodoItems from './TodoItems';
import TodoListViewModel from './TodoListViewModel';

const TodoList = (props) => {
  const todoModel = new TodoListViewModel();

  return (
    <>
      <TodoInput model={todoModel}></TodoInput>
      <button id="download" className="download-button" onClick={todoModel.downloadTodos}>Download Example</button>
      <TodoItems model={todoModel}></TodoItems>
      <TodoFooter model={todoModel}></TodoFooter>
    </>
  )
}

export default TodoList;
