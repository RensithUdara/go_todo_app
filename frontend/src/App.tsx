import React, { useState, useEffect } from './react-adapter';
import { Todo } from './types/Todo';
import { TodoService } from './services/TodoService';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import { FilterType } from './index';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API on component mount
  React.useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedTodos = await TodoService.getAllTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError('Failed to load todos. Please try again later.');
        console.error('Error fetching todos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (title: string) => {
    try {
      const newTodo = await TodoService.createTodo(title);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  // Toggle todo completed status
  const toggleTodo = async (id: string) => {
    try {
      const updatedTodo = await TodoService.toggleTodoStatus(id);
      setTodos(
        todos.map((todo: Todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(todos.filter((todo: Todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  // Clear all completed todos
  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter((todo: Todo) => todo.completed);
      
      // Delete all completed todos in parallel
      await Promise.all(
        completedTodos.map((todo: Todo) => TodoService.deleteTodo(todo.id))
      );
      
      setTodos(todos.filter((todo: Todo) => !todo.completed));
    } catch (err) {
      setError('Failed to clear completed todos. Please try again.');
      console.error('Error clearing completed todos:', err);
    }
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  // Count active and completed todos
  const activeCount = todos.filter((todo: Todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="todo-app">
      <h1 className="app-title">Todo App</h1>
      <TodoForm addTodo={addTodo} />
      
      {error && <div className="todo-error">{error}</div>}
      
      {isLoading ? (
        <div className="todo-loading">Loading todos...</div>
      ) : (
        <>
          <TodoList
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
          
          {todos.length > 0 && (
            <TodoFilters
              currentFilter={filter}
              setFilter={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              clearCompleted={clearCompleted}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
