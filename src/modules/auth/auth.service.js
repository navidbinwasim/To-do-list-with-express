const bcrypt = require('bcrypt');
const authRepository = require('./auth.repository');
const jwt = require('jsonwebtoken');

exports.register = async (name, email, password) => {
  const existingUser = await authRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  return await authRepository.createUser(name, email, hashedPassword);
};

exports.login = async (email, password) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  // Prevent login for disabled users
  if (user.disabled) throw new Error('User is disabled');

  // Generate JWT token (include role)
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};