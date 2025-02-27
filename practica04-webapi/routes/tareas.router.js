const express = require("express");
const TareasService = require("../services/TareasService")

const router = express.Router();

router.get("/", async (req, res) => {
    const tareasService = new TareasService();
    res.json(await tareasService.obtenerTodas());
});

module.exports = router;