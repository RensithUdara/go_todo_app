package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yourusername/go_todo_app/backend/models"
	"github.com/yourusername/go_todo_app/backend/repositories"
)

// TodoHandler handles HTTP requests for todos
type TodoHandler struct {
	repository repositories.TodoRepository
}

// NewTodoHandler creates a new TodoHandler instance
func NewTodoHandler(repository repositories.TodoRepository) *TodoHandler {
	return &TodoHandler{
		repository: repository,
	}
}

// GetTodos returns all todos
func (h *TodoHandler) GetTodos(c *gin.Context) {
	todos := h.repository.FindAll()
	c.JSON(http.StatusOK, todos)
}

// GetTodo returns a specific todo by ID
func (h *TodoHandler) GetTodo(c *gin.Context) {
	id := c.Param("id")
	todo, found := h.repository.FindByID(id)
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}
	c.JSON(http.StatusOK, todo)
}

// CreateTodo creates a new todo
func (h *TodoHandler) CreateTodo(c *gin.Context) {
	var todoRequest struct {
		Title string `json:"title" binding:"required"`
	}

	if err := c.ShouldBindJSON(&todoRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo := models.NewTodo(todoRequest.Title)
	savedTodo := h.repository.Save(todo)
	c.JSON(http.StatusCreated, savedTodo)
}

// UpdateTodo updates an existing todo
func (h *TodoHandler) UpdateTodo(c *gin.Context) {
	id := c.Param("id")
	var todoRequest models.Todo

	if err := c.ShouldBindJSON(&todoRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Ensure the ID in the path matches the ID in the request body
	todoRequest.ID = id

	updatedTodo, found := h.repository.Update(todoRequest)
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	c.JSON(http.StatusOK, updatedTodo)
}

// ToggleTodoStatus toggles the completed status of a todo
func (h *TodoHandler) ToggleTodoStatus(c *gin.Context) {
	id := c.Param("id")
	todo, found := h.repository.FindByID(id)
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	todo.Completed = !todo.Completed
	updatedTodo, _ := h.repository.Update(todo)
	c.JSON(http.StatusOK, updatedTodo)
}

// DeleteTodo deletes a todo
func (h *TodoHandler) DeleteTodo(c *gin.Context) {
	id := c.Param("id")
	if deleted := h.repository.Delete(id); !deleted {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
