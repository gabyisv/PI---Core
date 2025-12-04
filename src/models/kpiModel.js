var database = require("../database/config")

function buscarMaximo(idEmpresa,mes){

    var instrucaoSql = `
         SELECT MAX(m.sensor_analogico) as max_sensor,
			MIN(m.sensor_analogico) as min_sensor,
            AVG(m.sensor_analogico) as media_sensor
        FROM medida as m
        JOIN sensor as s ON m.pkSensor = s.idSensor
        JOIN quadrante as q ON s.idQuadrante = q.idQuadrante AND s.pkCamara = q.pkCamara
        JOIN camara as c ON s.pkCamara = c.idCamara
        JOIN empresa as e ON c.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = '${idEmpresa}' AND dataHora LIKE '%%%%-${mes}-%% %%:%%:%%';    `;

    console.log("teste  executando função SQL\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaximo_diario(idEmpresa)
{

    var instrucaoSql = `
         SELECT MAX(m.sensor_analogico) as max_sensor,
			MIN(m.sensor_analogico) as min_sensor,
            ROUND(AVG(m.sensor_analogico),0) as media_sensor
        FROM medida as m
        JOIN sensor as s ON m.pkSensor = s.idSensor
        JOIN quadrante as q ON s.idQuadrante = q.idQuadrante AND s.pkCamara = q.pkCamara
        JOIN camara as c ON s.pkCamara = c.idCamara
        JOIN empresa as e ON c.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = '${idEmpresa}';    `;

    console.log("teste  executando função SQL\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tempoResposta(idEmpresa){
    
    var instrucaoSql = `
  	SELECT time_format((sec_to_time(AVG(TIME_TO_SEC(    ))))),'%H:%i:%s') AS Media,
	COUNT(idUsuario) AS FuncAtivos,
            count(horaResposta) AS Incidentes
    FROM responsavel	
		JOIN usuario 
		ON fkUsuario = idUsuario
		JOIN empresa
		ON fkEmpresa = idEmpresa
	 WHERE idEmpresa = ${idEmpresa};;
    `;

    console.log("teste  executando função SQL\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mostrarAlerta(idEmpresa) {
    var instrucaoSql = `
select idSensor as sensor, numeroCamara as camara from sensor JOIN medida on pkSensor = idSensor 
JOIN camara ON pksensor = idsensor  join empresa on fkEmpresa = idEmpresa where fkempresa = ${idEmpresa} AND sensor_analogico > 25 
and dataHora = (select dataHora from medida order by dataHora desc limit 1) LIMIT 1;
    `;
    
    console.log("executando função SQL \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    buscarMaximo,
    buscarMaximo_diario,
    tempoResposta,
    mostrarAlerta
}