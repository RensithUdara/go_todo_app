import * as React from 'react';

interface TodoFormProps {
  addTodo: (title: string) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = React.useState('');

    const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    try {
      await addTodo(title);
      setTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit" className="add-button">Add</button>
    </form>
  );
};

export default TodoForm;
