// initDb.js
const pool = require('./db');

const initializeDB = async() => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      ingredients JSONB NOT NULL,
      calories TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  

  try {
    await pool.query(createTableQuery);
  } catch (error) {
    console.log("Error creating table : ", error)
  }

}

module.exports = initializeDB


