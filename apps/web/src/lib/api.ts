import axios from 'axios';
import { Todo } from '@ai-todos/database';

// Define the base URL for the API
const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api/todos';

// Create axios instance with common configuration
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type for creating a new todo
export interface CreateTodoPayload {
  title: string;
  description?: string;
  completed?: boolean;
}

// Type for updating a todo
export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  completed?: boolean;
}

// API functions
export const TodoApi = {
  // Get all todos
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get('');
    return response.data;
  },

  // Get a single todo by ID
  getById: async (id: number): Promise<Todo> => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Create a new todo
  create: async (todo: CreateTodoPayload): Promise<Todo> => {
    const response = await api.post('', todo);
    return response.data;
  },

  // Update a todo
  update: async (id: number, todo: UpdateTodoPayload): Promise<Todo> => {
    const response = await api.patch(`/${id}`, todo);
    return response.data;
  },

  // Delete a todo
  delete: async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
