require ('dotenv').config();

//import express
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const UserRouter = require('./routers/UserRouter');
const authRoutes = require('./routers/auth');
const emailRoutes = require('./routers/email');
const cors = require('cors');

// initialize express
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true // Add this line to allow credentials
}));

// Initialize session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secure-fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Import Passport config
require('./config/passport');

app.use('/user',UserRouter);
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

//endpoint or rotue 
app.get('/', (req,res)=> {res.send('response from express') });

// add
app.get('/add', (req, res) => {res.send('response from add') });

app.listen( port,() => {
    console.log('server started');
})

