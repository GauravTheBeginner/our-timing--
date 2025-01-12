import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NoteCard } from './NoteCard';
import { supabase } from '@/lib/supabase';

interface Note {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_email: string;
  user_name: string;
}

interface NotesListProps {
  timezone: string;
  newNote?: Note;
}

export function NotesList({ timezone, newNote }: NotesListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('notes')
          .select('*')
          .eq('timezone', timezone)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setNotes(data || []);
      } catch (err) {
        setError('Failed to load notes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();

    const channel = supabase
      .channel('notes_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'notes', filter: `timezone=eq.${timezone}` },
        () => {
          fetchNotes();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [timezone]);

  useEffect(() => {
    if (newNote) {
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }
  }, [newNote]);

  const handleDelete = async (noteId: string) => {
    try {
      // Delete the note from the database
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);
  
      if (error) {
        throw error; // If deletion fails, throw the error to be caught
      }
  
      // Update the local state if the deletion is successful
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error('Failed to delete note:', err);
      setError('Failed to delete the note. Please try again.');
    }
  };

  const handleUpdate = async (noteId: string, newContent: string) => {
    try {
      // Update the note in the database
      const { error } = await supabase
        .from('notes')
        .update({ content: newContent })
        .eq('id', noteId);
  
      if (error) {
        throw error; // If update fails, throw the error to be caught
      }
  
      // Update the local state if the update is successful
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, content: newContent } : note
        )
      );
    } catch (err) {
      console.error('Failed to update note:', err);
      setError('Failed to update the note. Please try again.');
    }
  };
  

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-secondary/20 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      {notes.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No notes yet. Be the first to add one!
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}