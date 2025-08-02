const pool = require('./db');

console.log("initDb.js loaded");

const initializeDB = async () => {
  console.log("Running initializeDB...");

  // Enable uuid-ossp extension (only needs to run once)
  const enableUuidExtension = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `;

  // Users table with UUID primary key
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Recipes table with user_id as UUID foreign key
  const createRecipesTable = `
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL,
      label VARCHAR(255) NOT NULL,
      ingredients JSONB NOT NULL,
      calories TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(enableUuidExtension);
    await pool.query(createUsersTable);
    await pool.query(createRecipesTable);
    console.log("Tables created successfully with UUIDs.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

module.exports = initializeDB;
