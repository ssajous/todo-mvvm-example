import { observer } from 'mobx-react'
import { TodoType } from './TodoListViewModel'


const TodoFooter = observer((props) => {
  const { model } = props;

  const getClass = (filter) => model.filter === filter ? "selected" : ""

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{model.activeTodos.length}</strong>
        <span> items left</span>
      </span>
      <ul className="filters">
        <li ><a href="/#" className={getClass(TodoType.ALL)} onClick={() => model.setFilterType(TodoType.ALL)}>All</a></li>
        <li><a href="/#/active" className={getClass(TodoType.ACTIVE)} onClick={() => model.setFilterType(TodoType.ACTIVE)}>Active</a></li>
        <li><a href="/#/complete" className={getClass(TodoType.COMPLETED)} onClick={() => model.setFilterType(TodoType.COMPLETED)}>Completed</a></li>
      </ul>
      <button className="clear-completed" onClick={model.clearCompleted}>Clear completed</button></footer>
  )
})

export default TodoFooter
