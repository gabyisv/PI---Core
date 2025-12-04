var camaraModel = require("../models/camaraModel");

function listar_vazamento (req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("ID da empresa não fornecido.");
        return;
    }

   console.log("O controller recebeu o idEmpresa", idEmpresa);


    camaraModel.listar_vazamento(idEmpresa)
        .then(function (resultado) {
            console.log("O controller recebeu o idCamara", idCamara);
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarMedidas (req, res) {

    cc

    if (idCamara == undefined) {
        res.status(400).send("ID da Câmara não fornecido.");
        return;
    }
    camaraModel.buscarMedidas(idCamara)
        .then(function (resultado) {
           
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma medição de PPM encontrada para esta câmara.");
            }
        })
        .catch(function (erro) {
            console.error("ERRO no Controller (buscarMedidasPPM):", erro);
            res.status(500).json(erro.sqlMessage || "Erro interno do servidor.");
        });
}



function colocarDadosdePPM(req, res) {
    const idEmpresa = req.body.idEmpresaServer;
    const mes = req.body.mesServer;

    if (!idEmpresa || !mes) {
        return res.status(400).send("Dados insuficientes.");
    }

    camaraModel.colocarDadosdePPM(idEmpresa, mes)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar_vazamento,
    buscarMedidas,
    colocarDadosdePPM
}