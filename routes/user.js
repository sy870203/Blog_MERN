const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const userModel = require('../models/user');


// @route POST http://localhost:5000/user/register
// @desc Register account
// @access PUBLIC
router.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    //패스워드 암호화
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(400).json({
                msg: err.message
            });
        } else {
            const user = new userModel({
                name, email, 
                password: hash
            });
        
            user
                .save()
                .then(user => {
                    res.status(200).json({
                        msg: "saved User",
                        userInfo: user
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                });
        }
    })

    
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