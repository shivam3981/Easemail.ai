require('dotenv').config();

//import express
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const UserRouter = require('./routers/UserRouter');
const authRoutes = require('./routes/auth');
const emailRoutes = require('./routes/email');

// initialize express
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      
      process.env.CLIENT_URL,
      'http://localhost:3000'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(cookieParser());
app.use(express.json());

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

// Enable trust proxy since we're behind a proxy on Render
app.set('trust proxy', 1);

// Connect to MongoDB


app.use('/user', UserRouter);
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

// Health check endpoint
app.get('/', (req, res) => { 
  res.json({ status: 'ok', message: 'Server is running' }); 
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Server error', 
    error: err.message 
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

