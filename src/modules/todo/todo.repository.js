const pool = require('../../config/db');

exports.create = async (task, userId) => {
  const result = await pool.query(
    'INSERT INTO todos (task, user_id) VALUES ($1, $2) RETURNING *',
    [task, userId]
  );
  return result.rows[0];
};

exports.findAll = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM todos WHERE user_id = $1 ORDER BY id',
    [userId]
  );
  return result.rows;
};

exports.update = async (id, completed, userId) => {
  await pool.query(
    'UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3',
    [completed, id, userId]
  );
};

exports.remove = async (id, userId) => {
  await pool.query(
    'DELETE FROM todos WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
};