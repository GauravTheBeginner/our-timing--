/*
  # Create Storage Bucket for Avatars

  1. New Storage Bucket
    - Create avatars bucket for user profile images
    - Enable public access for avatar images
    - Set security policies for upload and viewing
*/

-- Create the storage bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Allow authenticated users to upload avatars
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = SUBSTRING(name FROM 'avatars/([^/]+)')
);

-- Allow public access to read avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');