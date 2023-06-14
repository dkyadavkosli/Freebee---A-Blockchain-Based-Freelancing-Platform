const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:25
    },
    email:{
        type:String,
        require:true,
        unique:true
    }, 
    phone:{
        type:String,
        require:true, 
        unique:true
    }, 
    address:{
        type:String,  
        require:true,
    }, 
    password:{
        type:String,
        require:true,
        min:3
    }
},
{timestamps:true});  

module.exports = mongoose.model("User",UserSchema);