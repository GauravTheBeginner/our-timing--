import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNotifications } from '@/lib/notifications';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

interface Note {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_email: string;
}
interface AddNoteProps {
  timezone: string;
  onNoteAdded: (newNote: Note) => void; // Callback that passes the new note to parent
}

export function AddNote({ timezone, onNoteAdded }: AddNoteProps) {
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
    const { data, error } = await supabase.from('notes').insert({
      content: content.trim(),
      timezone,
      user_id: user.id,
      user_email: user.email,
    }).select(); // Select the inserted data after insert operation

    setIsSubmitting(false);

    if (error) {
      addNotification('error', 'Failed to add note. Please try again.');
    } else {
      setContent('');
      addNotification('success', 'Note added successfully!');
      if (data) {
        // Passing the newly added note back to parent (for appending in the list)
        onNoteAdded(data[0]);
      }
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
