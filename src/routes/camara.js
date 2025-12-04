var express = require("express");
var router = express.Router();

var camaraController = require("../controllers/camaraController");


router.post("/buscar",function(req,res) {
    camaraController.buscarCamara(req, res)
})
router.get("/vazamento/:idEmpresa", function(req, res) {
    camaraController.listar_vazamento(req, res);
})
router.get("/medidas-ppm/:idCamara", function(req,res) {
    camaraController.buscarMedidas(req,res)
})
router.post ("/medidas-ppm", function(req,res){
    camaraController.colocarDadosdePPM(req,res)
})


module.exports = router;