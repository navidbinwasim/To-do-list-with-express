-- Add disabled column to users (default false)
BEGIN;

ALTER TABLE users ADD COLUMN IF NOT EXISTS disabled BOOLEAN DEFAULT FALSE;

-- Optionally disable a user by id (example)
-- UPDATE users SET disabled = TRUE WHERE id = 2;

COMMIT;
