import { observer } from 'mobx-react';

const TodoItem = observer((props) => {
  const { model } = props;

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
        <button className="destroy"></button>
      </div>
      {/* <input className="edit" value={item.value}></input> */}
    </>
  )
})

export default TodoItem;
