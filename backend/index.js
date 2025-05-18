require('dotenv').config();

//import express
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const UserRouter = require('./routers/UserRouter');
const authRouter = require('./routers/auth');
const emailRouter = require('./routers/email');

// initialize express
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'https://easemail-ai-1n8q.vercel.app'
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
mongoose.connect(process.env.MONGO_URI || process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

app.use('/user', UserRouter);
app.use('/api/auth', authRouter);
app.use('/api/email', emailRouter);

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

