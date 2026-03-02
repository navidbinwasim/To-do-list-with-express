const pool = require('../../config/db');

exports.createUser = async(name,email,hashedpassword)=>{
    const result = await pool.query(
        'INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email',
        [name, email, hashedpassword]
    );
    return result.rows[0];
};

exports.findByEmail = async(email)=>{
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',[email]
    );
    return result.rows[0];
};

exports.findAll = async () => {
    const result = await pool.query(
        'SELECT id, name, email, role, disabled FROM users ORDER BY id'
    );
    return result.rows;
};

exports.deleteUser = async (userId) => {
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
};

exports.setDisabled = async (userId, disabled) => {
    await pool.query('UPDATE users SET disabled = $1 WHERE id = $2', [disabled, userId]);
};

exports.updatePassword = async (userId, hashedPassword) => {
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
};