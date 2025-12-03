var express = require("express");
var router = express.Router();

var sensoresController = require("../controllers/sensoresController");

router.post("/sens", function (req, res) {
  sensoresController.buscarSensores(req, res);
})

router.post("/grafPPM:idEmpresa", function (req, res) {
  sensoresController.buscarGrafPPM(req, res);
})



module.exports = router;