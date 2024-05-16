const express = require('express');
const router = express.Router();
const parser = require('../config/multer');

router.post('/upload', parser.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      imageUrl: req.file.path
    });
  } else {
    res.status(400).json({
      error: 'No se pudo cargar la imagen'
    });
  }
});

module.exports = router;