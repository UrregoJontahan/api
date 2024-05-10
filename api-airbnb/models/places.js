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
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        default: []
    },
    photos: {
        type: [String],
        default: []
    }
});

const ModelRoom = mongoose.model("Room", RoomSchema);
module.exports = ModelRoom;