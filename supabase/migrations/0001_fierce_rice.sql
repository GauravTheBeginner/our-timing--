/*
  # Create notes table and policies

  1. New Tables
    - `notes`
      - `id` (uuid, primary key)
      - `content` (text, note content)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `timezone` (text, reference to which timezone card)

  2. Security
    - Enable RLS on `notes` table
    - Add policies for CRUD operations
*/

-- Add user_email column to the notes table
ALTER TABLE notes ADD COLUMN user_email text;

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  timezone text NOT NULL
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Allow users to read all notes
CREATE POLICY "Anyone can read notes"
  ON notes
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to create their own notes
CREATE POLICY "Users can create their own notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own notes
CREATE POLICY "Users can update their own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM notes WHERE user_email IS NOT NULL
  ) THEN
    UPDATE notes
    SET user_email = (
      SELECT email FROM auth.users WHERE id = notes.user_id
    );
  END IF;
END $$;