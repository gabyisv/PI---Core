var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.post("/maximo", function (req, res) {
  kpiController.buscarMaximo(req, res);
})

router.post("/maximo_diario", function (req, res) {
  kpiController.buscarMaximo_diario(req, res);
})

router.post("/tempoResposta", function (req, res) {
  kpiController.tempoResposta(req, res);
})

router.post("/alerta" ,function(req, res ) {
  kpiController.mostrarAlerta(req, res);
})

router.post("/historico-sensor" ,function(req, res ) {
  kpiController.historicoSensor(req, res);
})
module.exports = router;