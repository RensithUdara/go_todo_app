import React from 'react';
import { Todo } from '../types/Todo';
import { FaTrash } from 'react-icons/fa';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
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
      </span>
      <button className="delete-button" onClick={handleDelete}>
        <FaTrash />
      </button>
    </li>
  );
};

export default TodoItem;
