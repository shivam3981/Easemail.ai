const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport'); // Just require the file, don't call it
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

// Google OAuth routes
router.get('/google', passport.authenticate('google', { 
  session: false,
  scope: [
    'profile', 
    'email', 
    'https://www.googleapis.com/auth/gmail.send',
    'https://mail.google.com/'
  ],
  accessType: 'offline',
  prompt: 'consent'
}));

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: '/login' 
  }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/signup?token=${token}`);
  }
);

// Get current user
router.get('/me', authenticate, authController.getCurrentUser);

// Request re-authentication route
router.get('/reauth', authenticate, authController.requestReauth);

// Logout
router.get('/logout', authenticate, authController.logout);

module.exports = router;