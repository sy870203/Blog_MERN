const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
                return res.status(404).json({
                    msg: "Email already exists"
                })
            } else {

                const user = new userModel({
                    name, email, password
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

    const { email, password } = req.body;
    // email 유무체크 => 패스워드 체크 => return jwt(jsonWebToken)

    userModel
        .findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    msg: "User not found"
                })
            } else {
                // // password 체크 
                // bcrypt.compare(password, user.password, (err, isMatch) => {
                //     if (err || isMatch === false) {
                //         return res.status(400).json({
                //             msg: "Password incorrected"
                //         });
                //     } else {
                //         res.status(200).json({
                //             msg: "successful logged in",
                //             userInfo: user
                //         });
                //     }
                // })

                user.comparePassword(password, (err, isMatch) => {
                    if (err || isMatch === false) throw err;
                    res.status(200).json({
                        success: isMatch
                    })
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })

})

// @route GET http://localhost:5000/user/current
// @desc Return current user
// @access Private
router.get('/current', (req, res) => {

})

module.exports = router;