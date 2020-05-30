const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);