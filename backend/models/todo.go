package models

import (
	"time"

	"github.com/google/uuid"
)

// Todo represents a task to be completed
type Todo struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"created_at"`
}

// NewTodo creates a new Todo item with a unique ID
func NewTodo(title string) Todo {
	return Todo{
		ID:        uuid.New().String(),
		Title:     title,
		Completed: false,
		CreatedAt: time.Now(),
	}
}
