import TodoFooter from './Todo/TodoFooter';
import TodoInput from './Todo/TodoInput';
import TodoItems from './Todo/TodoItems';
import TodoListViewModel from './Todo/TodoListViewModel';

function App() {
  const todoModel = new TodoListViewModel();

  return (
    <div className="App">
      <TodoInput model={todoModel}></TodoInput>
      <TodoItems model={todoModel}></TodoItems>
      <TodoFooter model={todoModel}></TodoFooter>
    </div>
  );
}

export default App;
