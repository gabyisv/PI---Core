const { cadastrarEmpresa } = require("../controllers/usuarioController");
var database = require("../database/config");

function autenticar(emailUsuario, senhaUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    emailUsuario,
    senhaUsuario
  );
  var instrucaoSql = `
  SELECT idUsuario, emailUsuario, nomeUsuario, idEmpresa,fkEmpresa FROM usuario JOIN empresa ON empresa.idEmpresa = usuario.fkEmpresa WHERE emailUsuario= '${emailUsuario}' AND senhaUsuario = '${senhaUsuario}';    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// function cadastrarEmpresas(razao, cnpj) {
//   console.log(
//     "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
//     razao,
//     cnpj
//   );

//   // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//   //  e na ordem de inserção dos dados.
//   var instrucaoSql = `
//         INSERT INTO empresa (razaoSocial, cnpj) VALUES ('${razao}','${cnpj}');
//     `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   database.executar(instrucaoSql);

//   var instrucaoSql2 = `
//         SELECT idEmpresa FROM empresa ORDER BY idEmpresa DESC LIMIT 1;
//     `;
//   console.log("Executando a instrução SQL: \n" + instrucaoSql2);
//   return database.executar(instrucaoSql2);
// }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nomeUsuario,
      sobrenomeUsuario,
      emailUsuario,
      senhaUsuario,
      razao, 
      cnpj) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nomeUsuario,
    sobrenomeUsuario,
    emailUsuario,
    senhaUsuario,
    razao,
    cnpj
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql1 = `
        INSERT INTO empresa (razaoSocial, cnpj) VALUES ('${razao}','${cnpj}');
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql1);
  return database
    .executar(instrucaoSql1)
    .then(function (resultado) {
      var novoIdEmpresa = resultado.insertId;

      var instrucaoSql2 = `
        INSERT INTO usuario (nomeUsuario, sobrenomeUsuario, emailUsuario, senhaUsuario, fkEmpresa) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}','${emailUsuario}', '${senhaUsuario}', '${novoIdEmpresa}');
    `;
      console.log("Executando a instrução SQL 2 (usuario): \n" + instrucaoSql2);

      console.log("ID da empresa");
      return database.executar(instrucaoSql2);
    })
    .catch(function (erro) {
      console.error(
        "Houve um erro no cadastro do usuário ou da empresa: ",
        erro
      );
      // Lança o erro para que o Controller possa notificar o cliente
      throw erro;
    });
}

module.exports = {
  autenticar,
  cadastrar
  // cadastrarEmpresas
};
