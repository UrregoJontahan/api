const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    coordinates: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,  
        }
    },
    amenities: {
        type: [String],
        default: []
    },
    photos: {
        type: [String],
        default: []
    },
    host: {
        type: String,
        required: true
    }
});

const ModelRoom = mongoose.model("Room", RoomSchema);
module.exports = ModelRoom;