var database = require("../database/config")

function buscarMaximo(idEmpresa){

    var instrucaoSql = `
        SELECT MAX(m.sensor_analogico) as max_sensor 
        FROM medida as m
        JOIN sensor as s ON m.pkSensor = s.idSensor
        JOIN quadrante as q ON s.idQuadrante = q.idQuadrante AND s.pkCamara = q.pkCamara
        JOIN camara as c ON s.pkCamara = c.idCamara
        JOIN empresa as e ON c.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa};
    `

    console.log(`executando função SQL`)
    return database.executar(instrucaoSql);
}

function buscarMedio(idEmpresa){

    var instrucaoSql = `
        SELECT ROUND(AVG(m.sensor_analogico),0 ) as med_sensor 
        FROM medida as m
        JOIN sensor as s ON m.pkSensor = s.idSensor
        JOIN quadrante as q ON s.idQuadrante = q.idQuadrante AND s.pkCamara = q.pkCamara
        JOIN camara as c ON s.pkCamara = c.idCamara
        JOIN empresa as e ON c.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa};
    `

    console.log(`executando função SQL`)
    return database.executar(instrucaoSql);
}

function buscarUltimo(idEmpresa){

    var instrucaoSql = `
        SELECT m.sensor_analogico as ultimo_sensor 
        FROM medida as m
        JOIN sensor as s ON m.pkSensor = s.idSensor
        JOIN quadrante as q ON s.idQuadrante = q.idQuadrante AND s.pkCamara = q.pkCamara
        JOIN camara as c ON s.pkCamara = c.idCamara
        JOIN empresa as e ON c.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa} ORDER BY m.sensor_analogico DESC LIMIT 1; 
    `

    console.log(`executando função SQL`)
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMaximo,
    buscarMedio,
    buscarUltimo
}