const express = require('express');
const router = express.Router();


// @route  get api/contacts
// @desc  Get all users contacts
// @access  Private
router.get('/', (req, res) => {
    res.send('get all contacts');
});

// @route  POST  api/contacts
// @desc    add new contacts
// @access  Private
router.post('/', (req, res) => {
    res.send('Add new Contact');
});

// @route  PUT  api/contacts/:id
// @desc    update a contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update Contact');
});

// @route   DELETE  api/contacts/:id
// @desc    delete a contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete a Contact');
});

module.exports = router;
