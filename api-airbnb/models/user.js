const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: {
        type:String,
        unique:true,
        required:true
    },
    celphone:{
        type:Number,
        unique:true,
        required:true
    }
});

const ModelUser =  mongoose.model("user", UserSchema)
module.exports = ModelUser;