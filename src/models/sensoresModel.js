var database = require("../database/config")

function buscarSensores(idEmpresa){

    var instrucaoSql = `
        SELECT
    SUM(CASE WHEN s.atividade = 1 THEN 1 ELSE 0 END) AS ativos,
    SUM(CASE WHEN s.atividade = 0 THEN 1 ELSE 0 END) AS inativos,
    SUM(CASE WHEN s.taxaVazamento > 5 THEN 1 ELSE 0 END) AS emAlerta
FROM 
    sensor s
JOIN 
    quadrante q ON s.idQuadrante = q.idQuadrante
JOIN 
    camara c ON q.pkCamara = c.idCamara
JOIN 
    empresa e ON c.fkEmpresa = e.idEmpresa
WHERE 
    e.idEmpresa = ${idEmpresa};
    `

    console.log(`executando função SQL`)
    return database.executar(instrucaoSql);
}

function buscarGrafPPM(idEmpresa, idSensor){

    var instrucaoSql = `
     SELECT sensor_analogico, dataHora
FROM 
    medida m
    JOIN sensor s ON m.idCaptura = s.idSensor
JOIN 
    quadrante q ON s.idQuadrante = q.idQuadrante
JOIN 
    camara c ON q.pkCamara = c.idCamara
JOIN 
    empresa e ON c.fkEmpresa = e.idEmpresa
    WHERE idEmpresa = ${idEmpresa} AND idSensor = ${idSensor} AND dataHora - current_date;
    `

    console.log(`executando função SQL`)
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarSensores,
    buscarGrafPPM
}