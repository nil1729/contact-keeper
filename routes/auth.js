const express = require('express');
const router = express.Router();


// @route  get api/auth
// @desc  Get Logged in  user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get logged in User');
});

// @route  POST  api/auth
// @desc  auth User and Get Token
// @access  Public
router.post('/', (req, res) => {
    res.send('Log in a User');
});


module.exports = router;
