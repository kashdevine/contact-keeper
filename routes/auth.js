const express = require('express');
const router = express.Router();

// @route  POST api/auth
// @desc   Auth User and get token
// @access Public
router.post('/', (req, res)=>{
    res.send('Logged in user');
});

// @route  GET api/auth
// @desc   Get Logged in User
// @access Private
router.get('/', (req, res)=>{
    res.send('Get logged in User');
});

module.exports = router;