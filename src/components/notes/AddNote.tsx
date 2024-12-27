import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNotifications } from '@/lib/notifications';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

interface AddNoteProps {
  timezone: string;
}

export function AddNote({ timezone }: AddNoteProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!user) {
      addNotification('error', 'Please sign in to add notes');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('notes').insert({
      content: content.trim(),
      timezone,
      user_id: user.id,
      user_email:user.email,      
    });

    setIsSubmitting(false);

    if (error) {
      addNotification('error', 'Failed to add note. Please try again.');
    } else {
      setContent('');
      addNotification('success', 'Note added successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Write a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting || !content.trim()}
        className="w-full"
      >
        {isSubmitting ? 'Adding...' : 'Add Note'}
      </Button>
    </form>
  );
}