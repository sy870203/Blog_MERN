const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userModel = require('../models/user');


// @route POST http://localhost:5000/user/register
// @desc Register account
// @access PUBLIC
router.post('/register', (req, res) => {

    // email 유무체크 => 패스워드 암호화 => 아바타 생성 => 회원가입

    const { name, email, password } = req.body;

    userModel
        .findOne({ email })
        .then(user => {
            if (user) {
                return res.status(494).json({
                    msg: "Email already exists"
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(400).json({
                            msg: err.message
                        });
                    } else {
                        //패스워드 암호화
                        const avatar = gravatar.url(email, {
                            s: '200', // size
                            r: 'pg',  // png
                            d: 'mm'   // Default
                        })
            
                        const user = new userModel({
                            name, email, avatar, 
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
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
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