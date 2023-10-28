const express = require("express");
const {
  listProducts
} = require("../../controllers/products");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await listProducts();
    res.json(contacts);
  } catch (error) {
    console.error("Error en la ruta /:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
