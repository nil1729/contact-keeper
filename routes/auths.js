const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const authenticateToken = require('../middleware/authenticateToken');
// GET => get Logged in User
//  /api/auth
// PRIVATE

router.get('/', authenticateToken , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
    
});

// POST => login a User
//  /api/auth
// PUBLIC

router.post('/',[
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charecters').isLength({min: 6})
] , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password} = req.body;
    try {
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                msg: 'Authentication Error'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                msg: 'Authentication Error'
            });
        }else{
            const payload = {
                user: {
                    id: user._id
                }
            };
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (err, token)=>{
                if(err){
                    return res.status(500).json({
                        msg: 'Internal Server Error'
                    });
                }
                res.json(token);
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});



module.exports = router;