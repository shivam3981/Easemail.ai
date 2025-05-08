const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

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

module.exports = router; 