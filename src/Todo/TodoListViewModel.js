import { makeAutoObservable, action } from "mobx";
import { v4 as uuidv4 } from 'uuid'

export class TodoItem {
  id = "";
  value = "";
  complete = false;

  constructor(value) {
    makeAutoObservable(this, {
      setStatus: action.bound
    });
    this.value = value;
    this.id = uuidv4();
  }

  setStatus(completed) {
    this.complete = completed;
  }

  get isActive() {
    return !this.complete;
  }
}

export const TodoType = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
})

export default class TodoListViewModel {
  todos = [];
  currentTodo = '';
  filter = TodoType.ACTIVE;

  constructor() {
    makeAutoObservable(this, {
      addTodoItem: action.bound,
      clearCompleted: action.bound,
      updateCurrentTodo: action.bound,
      setFilterType: action.bound,
      deleteTodo: action.bound
    });
  }

  addTodoItem() {
    this.todos.push(new TodoItem(this.currentTodo));
    this.currentTodo = '';
  }

  get activeTodos() {
    return this.todos.filter(item => item.isActive);
  }

  get completedTodos() {
    return this.todos.filter(item => item.complete);
  }

  deleteTodo(todo) {
    const updatedList = this.todos.filter(item => item !== todo);
    this.todos.replace(updatedList);
  }

  get currentTodos() {
    switch (this.filter) {
      case TodoType.ALL:
        return this.todos;
      case TodoType.ACTIVE:
        return this.activeTodos;
      case TodoType.COMPLETED:
        return this.completedTodos;
      default:
        return this.todos;
    }

  }

  clearCompleted() {
    const activeTodos = this.todos.filter(item => item.isActive);
    this.todos.replace(activeTodos);
    this.filter = TodoType.ACTIVE;
  }

  updateCurrentTodo(value) {
    this.currentTodo = value;
  }

  setFilterType(todoType) {
    this.filter = todoType;
  }
}
