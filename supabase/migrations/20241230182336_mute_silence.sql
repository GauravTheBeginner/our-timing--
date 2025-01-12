/*
  # Fix Storage Bucket and Policies

  1. Storage Changes
    - Ensure avatars bucket exists
    - Update storage policies for proper access control
    - Fix file path handling

  2. Security
    - Add proper RLS policies for avatar uploads and reads
    - Handle existing policies safely
*/

-- Ensure the avatars bucket exists
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('avatars', 'avatars', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Safely recreate policies
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
    
    -- Create new policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can upload their own avatar'
    ) THEN
        CREATE POLICY "Users can upload their own avatar"
        ON storage.objects
        FOR INSERT
        TO authenticated
        WITH CHECK (
            bucket_id = 'avatars' AND
            (auth.uid())::text = (SPLIT_PART(name, '/', 2))::text
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can update their own avatar'
    ) THEN
        CREATE POLICY "Users can update their own avatar"
        ON storage.objects
        FOR UPDATE
        TO authenticated
        USING (
            bucket_id = 'avatars' AND
            (auth.uid())::text = (SPLIT_PART(name, '/', 2))::text
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can delete their own avatar'
    ) THEN
        CREATE POLICY "Users can delete their own avatar"
        ON storage.objects
        FOR DELETE
        TO authenticated
        USING (
            bucket_id = 'avatars' AND
            (auth.uid())::text = (SPLIT_PART(name, '/', 2))::text
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Anyone can view avatars'
    ) THEN
        CREATE POLICY "Anyone can view avatars"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'avatars');
    END IF;
END $$;