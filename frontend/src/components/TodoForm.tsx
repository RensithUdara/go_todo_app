import * as React from 'react';

interface TodoFormProps {
  addTodo: (title: string) => Promise<void>;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
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
        onChange={(e: any) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
            <button className="add-button" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span style={{ marginLeft: '6px' }}>Add Task</span>
      </button>
    </form>
  );
};

export default TodoForm;
