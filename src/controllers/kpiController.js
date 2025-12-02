var kpiModel = require("../models/kpiModel");



function buscarMaximo(req, res){
    var idEmpresa = req.body.idEmpresaServer

kpiModel.buscarMaximo(idEmpresa)
    .then(function (resultado) {
      //aqui precisa informar que o resultado vai voltar para o front em resposta JSON
      console.log("O maxController recebeu o idEmpresa", idEmpresa);
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedio(req, res){
    var idEmpresa = req.body.idEmpresaServer

kpiModel.buscarMedio(idEmpresa)
    .then(function (resultado) {
      //aqui precisa informar que o resultado vai voltar para o front em resposta JSON
      console.log("O medController recebeu o idEmpresa", idEmpresa);
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimo(req, res){
    var idEmpresa = req.body.idEmpresaServer

kpiModel.buscarUltimo(idEmpresa)
    .then(function (resultado) {
      //aqui precisa informar que o resultado vai voltar para o front em resposta JSON
      console.log("O ultController recebeu o idEmpresa", idEmpresa);
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarMaximo,
    buscarMedio,
    buscarUltimo
}
