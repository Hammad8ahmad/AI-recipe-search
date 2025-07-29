const pool = require('./db');

console.log("initDb.js loaded");
const initializeDB = async () => {
  console.log("Running initializeDB...");

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
    await pool.query(createUsersTable);
    console.log("Tables created successfully.");
  } catch (error) {
    console.log("Error creating tables:", error);
  }
};

module.exports = initializeDB;
