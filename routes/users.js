const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


//  POST => REGISTER
//  /api/users
//  PUBLIC
router.post('/',[
    check('name', 'Please Provide a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more charecters').isLength({min: 6})
] , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({
                msg: 'Email Already Registered'
            });
        }
        user = new User({
            name,
            email,
            password
        });
        user.password = await bcrypt.hash(password, 10);
        user = await user.save();
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

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});



module.exports = router;