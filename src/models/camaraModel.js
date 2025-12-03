
var database = require("../database/config");
// NO SEU camaraModel.js
// NO SEU camaraModel.js (APENAS PARA ELIMINAR O ERRO 500)

// NO SEU camaraModel.js (VERSÃO FINAL DE TESTE)
// NO SEU camaraModel.js (VERSÃO FINAL CORRIGIDA - COM MAX(sensor_analogico))

function listar_vazamento(idEmpresa) {
    
    // SQL: Traz o valor máximo de sensor_analogico (o valor de PPM) para cada câmara
    var instrucaoSql = `
        SELECT
            c.numeroCamara AS nome,
    
            MAX(m.sensor_analogico) AS valorMedido,
            CASE
                WHEN MAX(m.sensor_analogico) > 5.01 THEN 'box-style-leak-color' 
                ELSE 'box-style-leak' 
            END AS classe
        FROM camara c
        
    
        JOIN quadrante q ON q.pkCamara = c.idCamara
        JOIN sensor s ON s.pkCamara = c.idCamara AND s.idQuadrante = q.idQuadrante
        JOIN medida m ON m.pkSensor = s.idSensor

        WHERE c.fkEmpresa = ${idEmpresa}
        
       
        GROUP BY c.idCamara, c.numeroCamara
        
 
        HAVING MAX(m.sensor_analogico) > 5.01;
    `;

    console.log( `Executando função SQL de TESTE FINAL (Versão 4): ${instrucaoSql}` );
    return database.executar(instrucaoSql);
}

// NO SEU camaraModel.js

function buscarMedidas(idCamara) {
    console.log("Acessando Model para buscar medidas PPM da câmara: ", idCamara);
    
    var instrucaoSql = `
        SELECT 
            m.sensor_analogico,
            DATE_FORMAT(m.dataHora, '%H:%i:%s') AS momento_grafico
        FROM medida m 
    
        JOIN sensor s ON m.pkSensor = s.idSensor
        JOIN camara c ON s.pkCamara = c.idCamara
       
        WHERE c.idCamara = ${idCamara} 
        
        ORDER BY m.dataHora DESC 
        LIMIT 30 
    `;

    console.log("Instrução SQL para PPM: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Lembre-se de EXPORTAR a nova função no final do arquivo:

module.exports = {
    listar_vazamento,
    buscarMedidas
};
