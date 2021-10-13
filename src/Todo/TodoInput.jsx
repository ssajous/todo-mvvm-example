import { observer } from 'mobx-react';

const TodoInput = observer((props) => {
  const { model } = props;

  const handleInputChange = (event) => {
    model.updateCurrentTodo(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    model.addTodoItem();
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={model.currentTodo}
          onChange={handleInputChange}
        />
      </form>
    </header>
  )
})

export default TodoInput;
