require ('dotenv').config();

//import express
const express = require('express');

const UserRouter = require('./routers/UserRouter');
const cors = require('cors');

// initialize express
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors(
    {
        origin: '*',
    }
))

app.use('/user',UserRouter);

//endpoint or rotue 
app.get('/', (req,res)=> {res.send('response from express') });

// add
app.get('/add', (req, res) => {res.send('response from add') });

app.listen( port,() => {
    console.log('server started');
})

