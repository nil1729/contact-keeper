const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken');

// GET  All Contacts Of a User 
// /api/contacts
// PRIVATE 
router.get('/',authenticateToken , async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({createdAt: -1});
        res.json(contacts);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

// POST  ADD CONTACT Of a User 
// /api/contacts
// PRIVATE 
router.post('/',[ 
    authenticateToken,
    check('name', 'Please Provide a name').not().isEmpty(),
    check('phone', 'Please Enter a valid Phone Number').isMobilePhone()
 ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, phone, type} = req.body;
    try {
        const  newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const contact = await newContact.save();
        res.json(contact);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});


// PUT  Update a Contact
// /api/contacts/:id
// PRIVATE 
router.put('/:id',[ 
    authenticateToken,
    check('name', 'Please Provide a name').not().isEmpty(),
    check('phone', 'Please Enter a valid Phone Number').isMobilePhone()
 ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, phone, type} = req.body;
    try {
        const contact = {
            name,
            email,
            phone,
            type,
            user: req.user.id
        };
        let updatedContact = await Contact.findByIdAndUpdate(req.params.id, contact);
        await updatedContact.save();
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});
// DELETE  delete a Contact 
// /api/contacts/:id
// PRIVATE 
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

module.exports = router;