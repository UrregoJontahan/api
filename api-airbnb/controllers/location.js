const express = require("express");
const router = express.Router();
const mapboxSdk = require("@mapbox/mapbox-sdk");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapboxClient = mapboxSdk({ accessToken: process.env.MAPBOX_ACCESS_TOKEN });
const geocodingClient = mbxGeocoding(mapboxClient);

router.get("/autocomplete", async (req, res) => {
  const { address } = req.query;

  try {
      const response = await geocodingClient
          .forwardGeocode({
              query: address,
              limit: 5,
          })
          .send();

      const suggestions = response.body.features.map((feature) => feature.place_name);
      res.json(suggestions);
  } catch (error) {
      console.error("Error al obtener sugerencias de direcciones:", error);
      res.status(500).json({ error: "Error al obtener sugerencias de direcciones" });
  }
});

router.get("/coordinates", async (req, res) => {
  const { address } = req.query;

  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send();

    if (response.body.features.length > 0) {
      const coordinates = response.body.features[0].geometry.coordinates;
      console.log(coordinates, "coordenadas");
      res.json({ lat: coordinates[1], lng: coordinates[0] });
    } else {
      res.status(404).json({ error: "No se encontraron coordenadas para la dirección proporcionada." });
    }
  } catch (error) {
    console.error("Error al obtener coordenadas:", error);
    res.status(500).json({ error: "Error al obtener coordenadas" });
  }
});

module.exports = router;


