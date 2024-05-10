const ModelRoom = require("../models/places")

module.exports = function (app){
    app.get("/rooms", async (req, res) => {
        const rooms = await ModelRoom.find();
        res.json(rooms);  
    });

    app.get("/rooms/:id", async (req, res) => {
        const { id } = req.params;
        const room = await ModelRoom.findById(id);
        res.json(room);
    });

    app.post("/rooms", async (req, res) => {
        const roomData = req.body;
        const newRoom = await ModelRoom.create(roomData);
        res.status(200).json(newRoom);
});

}