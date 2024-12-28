/*
  # Add avatar_url to profiles table

  1. Changes
    - Add avatar_url column to profiles table
*/

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS avatar_url text;