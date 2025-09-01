import * as React from 'react';
import { Todo } from '../types/Todo';
import { FaTrash } from 'react-icons/fa';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  key?: string; // Add key as optional prop
}

const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.title}
        <small className="todo-date">{new Date(todo.created_at).toLocaleDateString()}</small>
      </span>
      <button className="delete-button" onClick={handleDelete} title="Delete todo">
        <FaTrash />
      </button>
    </li>
  );
};

export default TodoItem;
