const express = require("express");
const bcrypt = require("bcrypt");
const RegistrarUsuario = require("../services/Registrar");
const router = express.Router();

router.get("/", async (req, res) => {
    const nUser = new RegistrarUsuario();
    res.json(await nUser.obtenerUsuarios());
});

router.post("/", async (req, res) => {
    const nUser = new RegistrarUsuario();
    const user = req.body;
    try {
        const idUser = await nUser.guardarUsuario(user);
        res.status(201).json({ message: "Usuario creado exitosamente", idUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;