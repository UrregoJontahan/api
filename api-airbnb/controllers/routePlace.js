const ModelRoom = require("../models/places")
const axios = require("axios")

module.exports = function (app){
    app.get("/rooms", async (req, res) => {
        const rooms = await ModelRoom.find();
        res.json(rooms);  
    });

    app.get("/rooms/:id", async (req, res) => {
        const id  = req.params.id;
        const response = await ModelRoom.findById(id)
        res.json(response);
    });

    app.post("/rooms", async (req, res) => {
        const { title, description, price, city, location, capacity, amenities, photos, host  } = req.body;
    
        try {
          const response = await axios.get("http://localhost:2000/api/location/coordinates", {
            params: { address: location }
          });
    
          const coordinates = response.data;
    
          const newRoom = new ModelRoom({
            title,
            description,
            price,
            city,
            location,
            capacity,
            amenities: amenities.split(","),
            photos,
            coordinates,
            host
          });
    
          await newRoom.save();
          res.status(200).json(newRoom);
        } catch (error) {
          console.error('Error al guardar la habitación:', error);
          res.status(500).json({ error: 'Error al guardar la habitación' });
        }
    });
};