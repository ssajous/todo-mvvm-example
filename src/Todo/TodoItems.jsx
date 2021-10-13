import { observer } from 'mobx-react';
import TodoItem from "./TodoItem"

const TodoItems = observer((props) => {
    const { model } = props;

    return (
        <ul className='todo-list'>
            {model.currentTodos.map(todo => <li key={todo.id}><TodoItem model={todo}></TodoItem></li>)}
        </ul>
    )
})

export default TodoItems;