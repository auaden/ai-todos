import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (data: { title: string; description?: string }) => Promise<void>;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '') return;
    
    try {
      setIsSubmitting(true);
      await onSubmit({
        title,
        description: description.trim() ? description : undefined,
      });
      
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleTitleFocus}
          className="border-2 focus:border-primary"
          disabled={isSubmitting}
        />
      </div>
      
      {isExpanded && (
        <div>
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm resize-none"
            disabled={isSubmitting}
          />
        </div>
      )}
      
      <div className="flex justify-end">
        <Button type="submit" disabled={!title.trim() || isSubmitting}>
          <Plus className="h-4 w-4 mr-1" /> Add Todo
        </Button>
      </div>
    </form>
  );
}
