package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/yourusername/go_todo_app/backend/handlers"
	"github.com/yourusername/go_todo_app/backend/repositories"
)

func main() {
	// Create a new Gin router
	router := gin.Default()

	// Set up CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Allow requests from React app
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type"}
	router.Use(cors.New(config))

	// Create repository and handler
	todoRepo := repositories.NewMemoryTodoRepository()
	todoHandler := handlers.NewTodoHandler(todoRepo)

	// Set up API routes
	api := router.Group("/api")
	{
		todos := api.Group("/todos")
		{
			todos.GET("", todoHandler.GetTodos)
			todos.GET("/:id", todoHandler.GetTodo)
			todos.POST("", todoHandler.CreateTodo)
			todos.PUT("/:id", todoHandler.UpdateTodo)
			todos.PATCH("/:id/toggle", todoHandler.ToggleTodoStatus)
			todos.DELETE("/:id", todoHandler.DeleteTodo)
		}
	}

	// Start server on port 8080
	log.Println("Server starting on http://localhost:8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
