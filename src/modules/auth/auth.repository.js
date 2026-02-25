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