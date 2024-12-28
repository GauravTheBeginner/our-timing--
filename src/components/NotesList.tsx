import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabase';

interface Note {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_email: string;
}

interface NotesListProps {
  timezone: string;
  notesUpdated: boolean;
}

export function NotesList({ timezone, notesUpdated }: NotesListProps) {
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

    // Subscribe to real-time changes for the notes
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
  }, [timezone, notesUpdated]); // Listen for notesUpdated changes

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
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
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      {notes.length === 0 ? (
        <p className="text-center text-muted-foreground">No notes yet. Be the first to add one!</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id} className="bg-secondary/30">
              <CardContent className="p-3">
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                <div className="flex justify-between items-center">
                  <time className="text-xs text-muted-foreground block mt-2">
                    {new Date(note.created_at).toLocaleString()}
                  </time>
                  <p className="text-xs text-muted-foreground block mt-2">
                    {note.user_email?.split('@')[0]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
