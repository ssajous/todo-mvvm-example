import { observer } from 'mobx-react';

const TodoItem = observer((props) => {
  const { model, deleteTodo } = props;

  const handleToggle = (event) => {
    model.setStatus(event.target.checked);
  }

  return (
    <>
      <div className="view">
        <input className="toggle"
          type="checkbox"
          checked={model.complete}
          onChange={handleToggle}></input>
        <label>{model.value}</label>
        <button className="destroy" onClick={() => deleteTodo(model)}></button>
      </div>
    </>
  )
})

export default TodoItem;
