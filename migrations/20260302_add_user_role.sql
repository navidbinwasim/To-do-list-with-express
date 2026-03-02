-- Add role column to users with default 'user'
BEGIN;

ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Make sure at least one admin exists (change id as needed)
UPDATE users SET role = 'admin' WHERE id = 1;

COMMIT;
