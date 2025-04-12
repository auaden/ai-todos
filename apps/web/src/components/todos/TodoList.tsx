import { useState, useEffect } from 'react';
import { Todo } from '@ai-todos/database';
import { TodoApi } from '@/lib/api';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await TodoApi.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (newTodo: { title: string; description?: string }) => {
    try {
      const createdTodo = await TodoApi.create(newTodo);
      setTodos([...todos, createdTodo]);
    } catch (err) {
      console.error('Error creating todo:', err);
      setError('Failed to create todo. Please try again.');
    }
  };

  const handleUpdate = async (id: number, updates: { title?: string; description?: string; completed?: boolean }) => {
    try {
      const updatedTodo = await TodoApi.update(id, updates);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TodoApi.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">AI Todos</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoForm onSubmit={handleCreate} />
        
        {error && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md my-4">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center text-muted-foreground my-8">
            No todos yet. Create one above!
          </div>
        ) : (
          <div className="space-y-3 mt-6">
            {todos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onUpdate={handleUpdate} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
