const pool = require('./db');

console.log("initDb.js loaded");

const initializeDB = async () => {
  console.log("Running initializeDB...");

  // Create recipes table (initial definition)
  const createRecipesTable = `
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      ingredients JSONB NOT NULL,
      calories TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Add user_id column to recipes if it's missing
  const ensureUserIdColumn = `
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='recipes' AND column_name='user_id'
      ) THEN
        ALTER TABLE recipes ADD COLUMN user_id INTEGER NOT NULL DEFAULT 1;
      END IF;
    END$$;
  `;

  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createRecipesTable);
    await pool.query(ensureUserIdColumn);
    await pool.query(createUsersTable);
    console.log("Tables created or updated successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = initializeDB;
