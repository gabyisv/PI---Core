var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                                    res.json({
                                        idUsuario: resultadoAutenticar[0].idUsuario,
                                        emailUsuario: resultadoAutenticar[0].emailUsuario,
                                        nomeUsuario: resultadoAutenticar[0].nomeUsuario,
                                        sobrenomeUsuario: resultadoAutenticar[0].sobrenomeUsuario,
                                        senhaUsuario: resultadoAutenticar[0].senhaUsuario,
                                        idEmpresa: resultadoAutenticar[0].idEmpresa
                                        
                                    });
                                } 
                        else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var razao = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!")
    }
    else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, email, senha, razao, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// function cadastrarEmpresas(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var cnpj = req.body.cnpjServer;
//     var razao = req.body.razaoServer;
  

//     // Faça as validações dos valores
//     if (razao == undefined) {
//         res.status(400).send("Sua razao está undefined!");
//     }
//     else if (cnpj == undefined) {
//         res.status(400).send("Seu cnpj está undefined!");
//     } else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.cadastrarEmpresas(cnpj, razao)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

module.exports = {
    autenticar,
    cadastrar,
    // cadastrarEmpresas
}