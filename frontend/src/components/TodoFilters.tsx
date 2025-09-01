import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFiltersProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  clearCompleted: () => Promise<void>;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  setFilter,
  activeCount,
  completedCount,
  clearCompleted
}) => {
  return (
    <>
      <div className="todo-stats">
        <span>{activeCount} items left</span>
        {completedCount > 0 && (
          <button className="clear-button" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>
      <div className="todo-filters">
        <button 
          className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-button ${currentFilter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-button ${currentFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
    </>
  );
};

export default TodoFilters;
