import * as React from 'react';

interface TodoFormProps {
  addTodo: (title: string) => Promise<void>;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [title, setTitle] = React.useState('');
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    setIsAnimating(true);
    
    try {
      await addTodo(title);
      setTitle('');
      setTimeout(() => setIsAnimating(false), 600);
    } catch (error) {
      console.error('Error adding todo:', error);
      setIsAnimating(false);
    }
  };

  return (
    <form className={`todo-form ${isAnimating ? 'submit-animation' : ''}`} onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
        aria-label="New todo title"
      />
      <button className="add-button" type="submit" disabled={isAnimating}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isAnimating ? 'spin' : ''}>
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span style={{ marginLeft: '6px' }}>Add Task</span>
      </button>
    </form>
  );
};

export default TodoForm;
