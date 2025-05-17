const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Email = require('../models/emailmodel');

router.get('/stats', async (req, res) => {
    // Example: Replace with real aggregation logic
    const userGrowth = [12, 19, 3, 5, 2]; // Replace with real data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const totalUsers = await User.countDocuments();
    const totalEmails = await Email.countDocuments();
    res.json({ userGrowth, labels, totalUsers, totalEmails });
});

module.exports = router;