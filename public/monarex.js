function cadastrar() {

    var razao = input_razaoEmpresa.value
    var email = input_email.value
    var cnpj = input_cnpj.value
    var senha = input_senha.value
    var confirmarSenha = input_senhaConfirmar.value

    

    if (razao == '' || email == '' || cnpj == '' || senha == '' || confirmarSenha == '') {
        alert('Preencha todos os Campos!')
    } else {
        window.location.href = "login.html";
    }

    
    }


function cnpj() {
    var cnpj = input_cnpj.value
    if(cnpj.length == 2){
            input_cnpj.value += '.'
    } 
    if(cnpj.length == 6){
            input_cnpj.value += '.'
    } 
    if(cnpj.length == 10){
            input_cnpj.value += '/'
    } 
    if(cnpj.length == 15){
            input_cnpj.value += '-'
    } 
}

function email() {
    var email = input_email.value
        
    if (email.includes('@') && email.endsWith('.com')) {
        msg.innerHTML = ``
    } else if (!email.includes('@')) {
        msg.innerHTML = `O e-mail precisa de um @ para ser cadastrado.`
    } else if (!email.endsWith('.com')) {
        msg.innerHTML = `O e-mail precisa terminar com .com para ser cadastrado.`
    }
}

function senha() {
    var senha = input_senha.value

    if (!senha.includes('1') && !senha.includes('2') && !senha.includes('3') && !senha.includes('4') && !senha.includes('5') && !senha.includes('6') && !senha.includes('7') && !senha.includes('8') && !senha.includes('9') && !senha.includes('0')) {
        msgsenha.innerHTML = `• A senha precisa ter ao menos um número <br>`
    } else if (!senha.includes('@') && !senha.includes('#') && !senha.includes('$') && !senha.includes('%') && !senha.includes('&') && !senha.includes('*')) {
        msgsenha.innerHTML = `• A senha precisa ter ao menos um caractere especial.<br>`
    } else  if (senha == senha.toLowerCase()) {
        msgsenha.innerHTML = `A senha precisa ter ao menos uma letra Maiuscula <br>`
    } else {
        msgsenha.innerHTML = ``
    }
}

function confirmarSenha() {
    var senha = input_senha.value
    var confirmarSenha = input_senhaConfirmar.value

    if (confirmarSenha != senha) {
        msgConfirm.innerHTML = `As senhas tem que ser iguais!`
    } else {
        msgConfirm.innerHTML = ``
    }
}


function login() {

    var email = input_emailLogin.value
    var senha = input_senhaLogin.value

    if (email == '' ||senha == '') {
        alert('Preencha todos os Campos!')
    } 
    
    if (email != 'brandao61@gmail.com' || senha != 'Sptech@123') {
        msg.innerHTML = `E-mail ou senha incorreto.`
    } else {    
        window.location.href = "index-brandao.html";
    }

}


function enviar() {
    msg_pergunta_tela.style.display = "block";
    pergunta_tela.style.display = "none";
}



