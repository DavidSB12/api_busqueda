const express = require('express');
const router = express.Router();
const {getCentrosEducativos} = require("../controller/centrosController")


router.get("/centrosEducativos", getCentrosEducativos)

module.exports = router;