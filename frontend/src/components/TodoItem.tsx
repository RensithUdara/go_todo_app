import React, { useState, useEffect } from '../react-adapter';
import { Todo } from '../types/Todo';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import ConfirmDialog from './ConfirmDialog';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  key?: string; // Add key as optional prop
}

const TodoItem = ({ todo, toggleTodo, deleteTodo, updateTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Create a ref manually since useRef isn't available
  const inputRef = { current: null as HTMLInputElement | null };

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTodo(todo.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editValue.trim() !== "") {
      try {
        await updateTodo({
          ...todo,
          title: editValue.trim()
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    } else {
      // Revert to original title if empty
      setEditValue(todo.title);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
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
      {isEditing ? (
        <div className="todo-edit-container">
          <input
            ref={(el) => { inputRef.current = el; }}
            type="text"
            className="todo-edit-input"
            value={editValue}
            onChange={(e: any) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="todo-edit-actions">
            <button className="edit-action-button save" onClick={handleSave} title="Save">
              <FaSave />
            </button>
            <button className="edit-action-button cancel" onClick={handleCancel} title="Cancel">
              <FaTimes />
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
            <small className="todo-date">{new Date(todo.created_at).toLocaleDateString()}</small>
          </span>
          <div className="todo-actions">
            <button className="edit-button" onClick={handleEdit} title="Edit todo">
              <FaEdit />
            </button>
            <button className="delete-button" onClick={handleDelete} title="Delete todo">
              <FaTrash />
            </button>
          </div>
        </>
      )}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </li>
  );
};

export default TodoItem;
