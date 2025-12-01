var kpiModel = require("../models/kpiModel");

function buscarMaximo(req, res){
    var idEmpresa = req.body.idEmpresaServer
  var mes = req.body.mesServer
kpiModel.buscarMaximo(idEmpresa,mes)
    .then(function (resultado) {
      //aqui precisa informar que o resultado vai voltar para o front em resposta JSON
      console.log("O controller recebeu o idEmpresa", idEmpresa);
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarMaximo
}
