/*
  # Add user_name to notes table and update storage policies

  1. Schema Changes
    - Add user_name column to notes table
    - Update storage policies for avatar uploads
*/

-- Add user_name column to notes table
ALTER TABLE notes 
ADD COLUMN IF NOT EXISTS user_name text NOT NULL DEFAULT '';

-- Update storage policies
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  SPLIT_PART(name, '.', 1) = CONCAT('avatars/', auth.uid()::text)
);

-- Update existing notes with user names
UPDATE notes
SET user_name = profiles.name
FROM profiles
WHERE notes.user_id = profiles.id;