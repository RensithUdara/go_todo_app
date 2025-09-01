package repositories

import (
	"sync"

	"github.com/yourusername/go_todo_app/backend/models"
)

// TodoRepository defines the interface for todo storage
type TodoRepository interface {
	FindAll() []models.Todo
	FindByID(id string) (models.Todo, bool)
	Save(todo models.Todo) models.Todo
	Update(todo models.Todo) (models.Todo, bool)
	Delete(id string) bool
}

// MemoryTodoRepository is an in-memory implementation of TodoRepository
type MemoryTodoRepository struct {
	todos map[string]models.Todo
	mutex sync.RWMutex
}

// NewMemoryTodoRepository creates a new in-memory repository for todos
func NewMemoryTodoRepository() *MemoryTodoRepository {
	return &MemoryTodoRepository{
		todos: make(map[string]models.Todo),
	}
}

// FindAll returns all todos
func (r *MemoryTodoRepository) FindAll() []models.Todo {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	todos := make([]models.Todo, 0, len(r.todos))
	for _, todo := range r.todos {
		todos = append(todos, todo)
	}
	return todos
}

// FindByID finds a todo by its ID
func (r *MemoryTodoRepository) FindByID(id string) (models.Todo, bool) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	todo, found := r.todos[id]
	return todo, found
}

// Save stores a new todo
func (r *MemoryTodoRepository) Save(todo models.Todo) models.Todo {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	r.todos[todo.ID] = todo
	return todo
}

// Update modifies an existing todo
func (r *MemoryTodoRepository) Update(todo models.Todo) (models.Todo, bool) {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	if _, found := r.todos[todo.ID]; !found {
		return models.Todo{}, false
	}

	r.todos[todo.ID] = todo
	return todo, true
}

// Delete removes a todo by ID
func (r *MemoryTodoRepository) Delete(id string) bool {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	if _, found := r.todos[id]; !found {
		return false
	}

	delete(r.todos, id)
	return true
}
