const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { 
    session: false,
    scope: [
      'profile', 
      'email', 
      'https://www.googleapis.com/auth/gmail.send',
      'https://mail.google.com/'
    ],
    accessType: 'offline',
    prompt: 'select_account'
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: '/login' 
  }),
  authController.googleCallback
);

// Get current user
router.get('/me', authenticate, authController.getCurrentUser);

// Request re-authentication route
router.get('/reauth', authenticate, authController.requestReauth);

// Logout
router.get('/logout', authenticate, authController.logout);

// User login
router.post('/user/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'user' });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret');
  res.json({ token, user: { email: user.email, role: user.role } });
});

// Admin login
router.post('/admin/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email, role: 'admin' });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id, role: admin.role }, 'your_jwt_secret');
  res.json({ token, user: { email: admin.email, role: admin.role } });
});

module.exports = router;