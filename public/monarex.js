
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
        window.location.href = "informacoes.html";
        validacaoLogin = true
        
    } 

}


function enviar() {
    msg_pergunta_tela.style.display = "block";
    pergunta_tela.style.display = "none";
}




// CHART JS //


const cth = document.getElementById("chart-horario");
  const ctm = document.getElementById("chart-maximo");
  const cti = document.getElementById("chart-incidentes");
  const cts = document.getElementById("chart-seguranca");

  Chart.register(window['chartjs-plugin-annotation']);


  

  const data = {
    labels: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    datasets: [
      {
        label: "Horário de Pico",
        data: [
          2, 1, 8, 5, 6, 5, 0, 5, 5, 0, 1, 6, 5, 0, 5, 9, 0, 8, 5, 5, 4, 1, 3,
          0,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "#4CAF5050",
        borderColor: "#4CAF50",
        pointRadius: 0,
        tension: 0.4,
        fill: true
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      layout: {
        padding: {
          bottom: 9
        }
      },
      plugins:{
        annotation: {
            annotations:{
              linhaLimite: {
                type: 'line',
                yMin: 20,
                yMax: 20,
                borderColor: 'red',
                borderWidth: 2
              }
            }
          },
        legend:{
          position: 'bottom',
          labels:{
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 11
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 30,
          ticks: {
            font: {
              size: 7,
            },
          },
        },

        x: {
          ticks: {
            font: {
              size: 7,
            },
          },
        },
      },
    },
  };

  new Chart(cth, config);

  new Chart(ctm, {
    type: "bar",
    data: {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
      datasets: [
        {
          label: "Máximo de PPM por dia",
          data: [
            12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19,
            3, 5, 2, 3, 12, 19, 3, 5, 2, 3,
          ],
          borderWidth: 1,
          backgroundColor: "#134215",
          borderColor: "#134215",
          borderRadius: 50,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          bottom: 9
        }
      },
      plugins:{
        legend:{
          position: 'bottom',
          labels:{
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 11
            }
          }
        }
      },
      
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 80,
          ticks: {
            font: {
              size: 7,
            },
          },
        },

        x: {
          ticks: {
            font: {
              size: 7,
            },
          },
        },
      },
    },
  });

  new Chart(cti, {
    type: "bar",
    data: {
      labels: [""],
      datasets: [
        {
          label: "Critíco",
          data: [10],
          borderWidth: 1,
          backgroundColor: "#B3000099",
          borderColor: "#D67A7680",
          borderRadius: 50,
        },
        {
          label: "Alerta",
          data: [7],
          borderWidth: 0,
          backgroundColor: "#FFCF0090",
          borderColor: "#FFCF0080",
          borderRadius: 50,
        },
        {
          label: "Normal",
          data: [5],
          borderWidth: 0,
          backgroundColor: "#005a9e99",
          borderColor: "#9DDEFF80",
          borderRadius: 50,

        }
      ],
    },
    options: {
      layout: {
        padding: {
          bottom: 9
        }
      },
      plugins:{
        legend:{
          position: 'bottom',
          labels:{
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 11
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 20,
          ticks: {
            font: {
              size: 7,
            },
          },
        },

        x: {
          ticks: {
            font: {
              size: 7,
            },
          },
        },
      },
    },
  });

  new Chart(cts, {
    type: "pie",
    data: {
      labels: ["Seguro", "Moderado", "Critico"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: ["#134215", "#2A862E", "#9FD8A1"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          bottom: 9
        }
      },
      plugins:{
        legend:{
          position: 'bottom',
          labels:{
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 11
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });





  //FUNÇÃO VAZAMENTO

  function vazar(){
    
    if (alertaCaixa.style.display == "block") {
      alertaCaixa.style.display = "none";
    } else {
      alertaCaixa.style.display = "block";
    }
  }
  function fecharVazamento(){
      alertaCaixa.style.display = "none";
  }