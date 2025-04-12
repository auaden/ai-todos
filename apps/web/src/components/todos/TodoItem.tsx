import { useState } from 'react';
import { Todo } from '@ai-todos/database';
import { formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, X, Check } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: { title?: string; description?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleToggleComplete = async () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    await onUpdate(todo.id, { completed: newCompletedState });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (title.trim() === '') return;
    
    await onUpdate(todo.id, {
      title,
      description: description || undefined,
    });
    
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await onDelete(todo.id);
    }
  };

  return (
    <Card className={`border-l-4 ${isCompleted ? 'border-l-green-500' : 'border-l-blue-500'}`}>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo title"
              className="font-medium"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="text-sm"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSaveEdit}>
                <Check className="h-4 w-4 mr-1" /> Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <Checkbox checked={isCompleted} onCheckedChange={handleToggleComplete} />
            </div>
            <div className="flex-1">
              <div className={`text-base font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                {todo.title}
              </div>
              {todo.description && (
                <div className={`mt-1 text-sm ${isCompleted ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                  {todo.description}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                Created: {formatDate(todo.createdAt)}
                {todo.createdAt !== todo.updatedAt && ` • Updated: ${formatDate(todo.updatedAt)}`}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
