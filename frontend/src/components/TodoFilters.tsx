import * as React from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFiltersProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  clearCompleted: () => Promise<void>;
}

const TodoFilters = ({
  currentFilter,
  setFilter,
  activeCount,
  completedCount,
  clearCompleted
}: TodoFiltersProps) => {
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          All
        </button>
        <button 
          className={`filter-button ${currentFilter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Active
        </button>
        <button 
          className={`filter-button ${currentFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Completed
        </button>
      </div>
    </>
  );
};

export default TodoFilters;
