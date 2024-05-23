const express = require('express');
const router = express.Router();
const parser = require('../config/multer');
const ModelRoom = require("../models/places");

router.post('/upload', parser.array('images', 10), (req, res) => {
  if (req.files && req.files.length > 0) {
    const imageUrls = req.files.map(file => file.path);
    console.log(imageUrls)
    res.send({ imageUrls });
  } else {
    res.status(400).json({ error: 'No se pudieron cargar las imágenes' });
  }
});

router.post('/rooms', async (req, res) => {
  const { title, description, price, location, capacity, amenities, photos } = req.body;

  const newRoom = new ModelRoom({
    title,
    description,
    price,
    location,
    capacity,
    amenities: amenities.split(',').map(item => item.trim()),
    photos
  });

  try {
    const savedRoom = await newRoom.save();
    res.json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la habitación' });
  }
});

module.exports = router;