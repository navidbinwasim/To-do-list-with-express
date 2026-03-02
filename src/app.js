const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ STATIC FIRST
app.use(express.static(path.join(__dirname, '../public')));

const todoRoutes = require('./modules/todo/todo.routes');
const authRoutes = require('./modules/auth/auth.routes');
const adminRoutes = require('./modules/admin/admin.routes');

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;