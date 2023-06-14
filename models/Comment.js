const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    user_name:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true
    },
},
{timestamps:true}); 

module.exports = mongoose.model("Comments",Comment);