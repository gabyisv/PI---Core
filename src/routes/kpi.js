var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.post("/maximo", function (req, res) {
  kpiController.buscarMaximo(req, res);
})

module.exports = router;