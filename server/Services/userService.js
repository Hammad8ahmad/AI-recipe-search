const pool = require('../Model/db');

async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}

async function createUser(email,hashedPassword) {

      const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
      const values  = [email,hashedPassword]
      const { rows } = await pool.query(query, values);
      return rows[0]
    
}


module.exports = {
    findUserByEmail,
    createUser
}