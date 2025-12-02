var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.post("/maximo", function (req, res) {
  kpiController.buscarMaximo(req, res);
})

router.post("/medio", function (req, res) {
  kpiController.buscarMedio(req, res);
})

router.post("/ultimo", function (req, res) {
  kpiController.buscarUltimo(req, res);
})

module.exports = router;