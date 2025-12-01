var database = require("../database/config")

function buscarMaximo(idEmpresa){

    var instrucaoSql = `
         SELECT MAX(m.sensor_analogico) as max_sensor,
			MIN(m.sensor_analogico) as min_sensor,
            AVG(m.sensor_analogico) as media_sensor
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

module.exports = {
    buscarMaximo
}