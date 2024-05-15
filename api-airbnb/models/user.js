const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type:String
    },
    celphone: {
        type:String,
        unique:true,
    },
    password:{
        type:String,
    }
});

const ModelUser =  mongoose.model("user", UserSchema)
module.exports = ModelUser;