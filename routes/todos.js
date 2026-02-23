const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/',async(req,res)=>{
    const{task} = req.body;
    const newTodo = await pool.query('INSERT INTO todos (task) VALUES($1) RETURNING *', [task]);
    res.json(newTodo.rows[0]);
});

router.get('/', async(req,res)=>{
    const allTodo = await pool.query(
        'SELECT * FROM todos ORDER by id'
    );
    res.json(allTodo.rows);
});

router.put('/:id', async(req,res)=>{
    const{id} = req.params;
    const{completed} = req.body;
    await pool.query('UPDATE todos SET completed = $1 WHERE id =$2',
        [completed,id]
    );
    res.json("Todo Updated");
});

router.delete('/:id', async(req,res)=>{
    const{id} = req.params;
    await pool.query('DELETE FROM todos WHERE id =$1',
        [id]
    );
    res.json('Todo Deleted');
});

module.exports = router;