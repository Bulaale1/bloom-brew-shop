const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');

const login = async (username, password) => {
  const { rows } = await pool.query(
    'SELECT * FROM admin_users WHERE username = $1',
    [username]
  );
  if (!rows.length) return null;

  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) return null;

  const token = jwt.sign(
    { id: rows[0].id, username: rows[0].username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  return token;
};

module.exports = { login };
