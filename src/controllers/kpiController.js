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


function buscarMaximo_diario(req, res){
    var idEmpresa = req.body.idEmpresaServer
    kpiModel.buscarMaximo_diario(idEmpresa)
    .then(function (resultado) {
      //aqui precisa informar que o resultado vai voltar para o front em resposta JSON
      console.log("O controller recebeu o idEmpresa", idEmpresa);
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function tempoResposta(req, res){
  var idEmpresa = req.body.idEmpresaServer
  kpiModel.tempoResposta(idEmpresa)
  .then(function (resultado){

    console.log("O controller recebeu o idEmpresa", idEmpresa);
    res.status(200).json(resultado);
  }) 
  .catch(function (erro){
    res.status(500).json(erro.sqlMessage);
  });
}

function mostrarAlerta(req, res) {
  var idEmpresa = req.body.idEmpresaServer
  kpiModel.mostrarAlerta(idEmpresa)
  .then(function (resultado) {
    console.log("O controller recebeu o idEmpresa", idEmpresa);
    res.status(200).json(resultado);
  })
  .catch(function(erro) {
    res.status(500).json(erro.sqlMessage);
  })
}

function historicoSensor(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    if (idEmpresa == undefined) {
console.log("ID da Empresa recebido no Controller:", idEmpresa);
        console.log("ERRO: ID da Empresa não recebido na requisição.");
        res.status(400).send("O ID da Empresa está indefinido!");
        return; }

         kpiModel.historicoSensor(idEmpresa)
        .then(function (resultado) {           
            console.log("O controller recebeu o idEmpresa", idEmpresa);
            if (resultado.length == 0) {
                res.status(204).send("Nenhuma leitura de sensor encontrada para esta empresa.");
            } else {
                res.status(200).json(resultado);
            }
        })
        .catch(function (erro) {
            console.log("Houve um erro no Controller ao buscar o histórico:", erro);
     res.status(500).json(erro.sqlMessage || "Erro interno do servidor ao processar o SQL.");
        });
}


module.exports = {
    buscarMaximo,
    buscarMaximo_diario,
    tempoResposta,
    mostrarAlerta,
    historicoSensor
  }


