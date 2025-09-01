import axios from 'axios';
import { Todo } from '../types/Todo';

const API_URL = 'http://localhost:8080/api';

export const TodoService = {
  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get<Todo[]>(`${API_URL}/todos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Get todo by id
  async getTodoById(id: string): Promise<Todo> {
    try {
      const response = await axios.get<Todo>(`${API_URL}/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      throw error;
    }
  },

  // Create new todo
  async createTodo(title: string): Promise<Todo> {
    try {
      const response = await axios.post<Todo>(`${API_URL}/todos`, { title });
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update todo
  async updateTodo(todo: Todo): Promise<Todo> {
    try {
      const response = await axios.put<Todo>(`${API_URL}/todos/${todo.id}`, todo);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${todo.id}:`, error);
      throw error;
    }
  },

  // Toggle todo status
  async toggleTodoStatus(id: string): Promise<Todo> {
    try {
      const response = await axios.patch<Todo>(`${API_URL}/todos/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling todo ${id}:`, error);
      throw error;
    }
  },

  // Delete todo
  async deleteTodo(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  }
};
