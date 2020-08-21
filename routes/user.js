const express = require ('express');
const router = express.Router();




// @route POST http://localhost:5000/user/register
// @desc Register account
// @access PUBLIC
router.post('/register', (req, res) => {

})

// @route POST http://localhost:5000/user/login
// @desc log in user / returning token
// @access Public
router.post('/login', (req, res) => {

})

// @route GET http://localhost:5000/user/current
// @desc Return current user
// @access Private
router.get('/current', (req, res) => {
    
})

module.exports = router;