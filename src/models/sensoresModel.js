var database = require("../database/config")

function buscarSensores(idEmpresa){

    var instrucaoSql = `
        SELECT 
SUM(CASE WHEN s.atividade = 1 THEN 1 ELSE 0 END) AS ativos,
SUM(CASE WHEN s.atividade = 0 THEN 1 ELSE 0 END) AS inativos,
SUM(CASE WHEN s.atividade > 5 THEN 1 ELSE 0 END) AS emAlertas
FROM sensor s
JOIN quadrante q ON s.idQuadrante = q.idQuadrante
JOIN camara c ON q.pkCamara = c.idCamara
JOIN empresa e ON c.fkEmpresa = e.idEmpresa
WHERE fkEmpresa = ${idEmpresa};
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

function buscarIncidentes(idEmpresa, idSensor){

    var instrucaoSql = `
    SELECT
SUM(CASE WHEN m.sensor_analogico > 30.00 THEN 1 ELSE 0 END) AS TotalCritico,
SUM(CASE WHEN m.sensor_analogico BETWEEN 15.01 AND 30.00 THEN 1 ELSE 0 END) AS TotalAlerta,
SUM(CASE WHEN m.sensor_analogico <= 2.00 THEN 1 ELSE 0 END) AS TotalNormal
FROM
medida m
JOIN sensor s ON m.pkSensor = s.idSensor
JOIN quadrante q ON s.idQuadrante = q.idQuadrante AND s.pkCamara = q.pkCamara
JOIN camara c ON q.pkCamara = c.idCamara
JOIN empresa e ON c.fkEmpresa = e.idEmpresa
WHERE
e.idEmpresa = ${idEmpresa}
AND
m.dataHora >= '2025-12-01 00:00:00' 
AND pkSensor = ${idSensor};
    `

    console.log('Executando BuscarINcidente sno model')
    return database.executar(instrucaoSql)
}


function buscarMedidas(idCamara, idSensor, periodo) {
    console.log("Acessando Model para buscar medidas PPM da câmara: ", idCamara);
    
    let filtroData = "";

    // 2. Lógica para definir o filtro de Data/Hora com base no 'periodo'
    if (periodo === '24h') {
        // Filtra os últimos 24 horas
        filtroData = `AND m.dataHora >= DATE_SUB(NOW(), INTERVAL 24 HOUR)`;
    } else if (periodo === '7d') {
        // Filtra os últimos 7 dias
        filtroData = `AND m.dataHora >= DATE_SUB(NOW(), INTERVAL 7 DAY)`;
    } else if (periodo === 'mes-atual') {
        // Filtra do início do mês atual até agora
        filtroData = `AND YEAR(m.dataHora) = YEAR(NOW()) AND MONTH(m.dataHora) = MONTH(NOW())`;
    } else if (periodo === 'mes-anterior') {
        // Filtra o mês anterior completo (exige lógica um pouco mais complexa)
        filtroData = `AND m.dataHora >= DATE_SUB(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH) 
                      AND m.dataHora < DATE_FORMAT(NOW(), '%Y-%m-01')`;
    }


    var instrucaoSql = `
        SELECT 
            m.sensor_analogico,
            DATE_FORMAT(m.dataHora, '%H:%i:%s') AS momento_grafico
        FROM medida m 
    
        JOIN sensor s ON m.pkSensor = s.idSensor
        JOIN camara c ON s.pkCamara = c.idCamara
       
        WHERE c.idCamara = ${idCamara} 
        AND m.pkSensor = ${idSensor}  /* <-- FILTRO DE SENSOR ADICIONADO */
        ${filtroData} 
        
        ORDER BY m.dataHora DESC 
        LIMIT 30 
    `;

    console.log("Instrução SQL para PPM: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoSensor(idEmpresa) {
    var instrucaoSql = `
        SELECT
            m.sensor_analogico AS ppm,
            DATE_FORMAT(m.dataHora, '%d/%m/%Y %H:%i:%s') AS tempo_leitura, 
            s.idSensor AS id_sensor,
            c.numeroCamara AS numero_camara,
            CASE 
                WHEN s.atividade = 0 THEN 'Desligado'
            ELSE 'Ligado'
            END Atividade,
            CASE
        WHEN m.sensor_analogico > 30.00 THEN 'CRÍTICO'
        WHEN m.sensor_analogico BETWEEN 15.01 AND 30.00 THEN 'ALERTA'
        ELSE 'NORMAL'
    END AS classificacao
            
        FROM
            medida m
        JOIN
            sensor s ON m.pkSensor = s.idSensor
        JOIN
            camara c ON s.pkCamara = c.idCamara
        WHERE
            c.fkEmpresa = ${idEmpresa} 
        ORDER BY
            m.dataHora DESC;
    `

    console.log("executando função SQL \n" + instrucaoSql); 
    return database.executar(instrucaoSql)
}

module.exports = {
    buscarSensores,
    buscarGrafPPM,
    buscarIncidentes,
    buscarMedidas,
    historicoSensor
}