const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust path as needed
const config = require('./config'); // Create this file for your Google OAuth credentials

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || config.google.clientId,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || config.google.clientSecret,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        // Update tokens if user exists
        user.googleAccessToken = accessToken;
        user.googleRefreshToken = refreshToken || user.googleRefreshToken;
        await user.save();
        return done(null, user);
      }
      
      // Create new user if doesn't exist
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken
      });
      
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
};