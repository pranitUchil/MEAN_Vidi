const mongoose = require('mongoose');

const userSchem = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique: true,
    },
    password:{
        type:String,
        require:true,
    },
});

const User = mongoose.model("User",userSchem);

module.exports = User;