const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos')


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/todos', todoRoutes);

app.listen(5000, ()=>{
    console.log("server is running");
});