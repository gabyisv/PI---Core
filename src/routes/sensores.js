var express = require("express");
var router = express.Router();

var sensoresController = require("../controllers/sensoresController");

router.post("/sens", function (req, res) {
  sensoresController.buscarSensores(req, res);
})

router.post("/grafPPM:idEmpresa", function (req, res) {
  sensoresController.buscarGrafPPM(req, res);
})

router.post("/incidentes", function(req, res){
  sensoresController.buscarIncidentes(req, res)
})

router.get("/medidas-ppm/:idCamara", function(req,res) {
    sensoresController.buscarMedidas(req,res)
})

router.post("/historico-sensor" ,function(req, res ) {
  sensoresController.historicoSensor(req, res);
})


module.exports = router;