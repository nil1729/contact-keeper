const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        default: 'personal'
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Contact", contactSchema);