const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    celphone: {
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
});

const ModelUser =  mongoose.model("user", UserSchema)
module.exports = ModelUser;