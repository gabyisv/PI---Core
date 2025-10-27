// function calcular() {
//       div_mensagem.innerHTML = '';

//       // var funcionarios = Number(input_funcionarios.value);
//       // var idade = Number(input_idade.value);
//       var salario = Number(input_salario.value);
//       var porte = select_porte.value;
//       var cenario = select_cenario.value;
//       // var mensagem = div_mensagem.value;

//       if (
//         input_funcionarios.value == '' ||
//         // input_idade.value == '' ||
//         input_salario.value == '' ||
//         select_porte.value == '' ||
//         select_cenario.value == ''
//       ) {
//         div_mensagem.innerHTML = 'Por favor, preencha todos os campos!';
//       } else {
//         var qtd_funcionarios = Number(input_funcionarios.value);
//         // var idade = Number(input_idade.value);
//         var salario = Number(input_salario.value);
//         var porte = select_porte.value;
//         var cenario = select_cenario.value;

//         // tirar ou alterar
//         // var tempo_parada = 0;
//         // if (porte == 'pequeno') {
//         //   tempo_parada = 6;
//         // } else if (porte == 'medio') {
//         //   tempo_parada = 8;
//         // } else if (porte == 'grande') {
//         //   tempo_parada = 12;
//         // }

//         // Define o número de câmeras de acordo com o porte da empresa
//         // pequeno = 10 câmeras, médio = 25 câmeras, grande = 50 câmeras
//         var num_camaras = 0;
//         if (porte == 'pequeno') {
//           num_camaras = 10;
//         } else if (porte == 'medio') {
//           num_camaras = 25;
//         } else if (porte == 'grande') {
//           num_camaras = 50;
//         }

//         var num_sensores = num_camaras * 15;
//         var custo_sensor_instalacao = (num_sensores / 5) * 100; //pressupõe-se que sensores são vendidos em pacotes de 5 que custam R$100 por pacote (ou seja, R$20 por sensor).

//       // Cálculo da indenização por funcionário
//       // anos_indenizacao = número de anos que consideramos para a simulação (5 anos)
//       // indenizacao_funcionario = salário mensal * 13 (13º salário anual) * anos_indenizacao
//       // Exemplo: salário = 3.000, anos_indenizacao = 5 → indenização = 3.000 * 13 * 5 = 195.000
//       // OBS: É uma simulação realista, não representa obrigação legal exato
//         var anos_indenizacao = 5;
//         var indenizacao_funcionario = salario * 13 * anos_indenizacao;

//         // var expectativa_vida = 76.8;
//         // var anos_restantes = expectativa_vida - idade; //anos de vida esperados restantes.
//         // var indenizacao_funcionario = salario * 13 * anos_restantes; //equivalente a 13 salários por ano ao longo de todos os anos restantes

//         var percentual_funcionarios_afetados = 0;
//         var impacto = 0;

//         if (cenario == 'baixo') { 
//           percentual_funcionarios_afetados = 0.02;//fração do total de funcionários direta ou indiretamente afetados.
//           impacto = 10000; // valor medio de indenização
//         } else if (cenario == 'moderado') {
//           percentual_funcionarios_afetados = 0.15;
//           impacto = 50000;
//         } else if (cenario == 'grave') {
//           percentual_funcionarios_afetados = 0.7;
//           impacto = 200000;
//         }

//         var funcionarios_afetados = qtd_funcionarios * percentual_funcionarios_afetados;
//         funcionarios_afetados = parseInt(funcionarios_afetados + 0.9999); //Multiplica e tenta arredondar para cima com o parseInt(x + 0.9999)

//         var custo_indenizacoes = funcionarios_afetados * indenizacao_funcionario * impacto;  //Multiplica o número de funcionários afetados, o valor teórico de indenização por funcionário e o fator impacto

//         var economia_potencial = custo_indenizacoes - custo_sensor_instalacao;



//         div_mensagem.innerHTML += '<div  class="titulo-div-primeiro"> <h1> Perdas possíveis sem monitoramento:\n </h1> </div> <br>';
//         // div_mensagem.innerHTML += '- Custo de falhas no sistema de refrigeração: R$ ' + (custo_falhas) + '\n';
//         div_mensagem.innerHTML += `<h1 class="titulo-div"> Custo com indenizações (cenário ${cenario}): </h1> <h2 class="result-div"> R$ ${custo_indenizacoes.toLocaleString('pt-BR')} </h2> <br>`;

//         div_mensagem.innerHTML += `<br> 
//         <h1 class="titulo-div"> Economia potencial com o sistema:\n </h1>
//         <div class="container-divs"> 
//         <h2> Custo de instalação dos sensores: R$${custo_sensor_instalacao.toLocaleString('pt-BR')}  </h2> 
//         <h2> Economia potencial ao evitar falhas e acidentes: R$${economia_potencial.toLocaleString('pt-BR')}</h2>
//         </div>`;

//       }
//     }

function calcular() {
    div_mensagem.innerHTML = '';

    // Captura os valores dos inputs e selects
    var qtd_funcionarios = Number(input_funcionario.value);
    // var salario = Number(input_salario.value);
    var camara = Number(input_camara.value);
    var cenario = select_cenario.value;

    // Verifica se todos os campos foram preenchidos
    if (!qtd_funcionarios || !camara || !cenario) {
        div_mensagem.innerHTML = '<p class="div-msg-erro"> Por favor, preencha todos os campos! </p>';
    } else if (qtd_funcionarios <= 0 || camara <= 0 ) {
        div_mensagem.innerHTML = '<p class="div-msg-erro"> Digite um valor acima de 0 para a quantidade de funcionarios e camâras. </p>'
    } else {

    // // Define o número de câmeras de acordo com o porte da empresa
    // var num_camaras = 0;
    //     if (porte >= 1 && porte <= 10 ){
    //       num_camaras = porte;
    //     } else if (porte > 10 && porte <= 25 ) {
    //        num_camaras = porte;
    //     } else if (porte > 25) {
    //       num_camaras = porte;
    //     }

    // Calcula o número de sensores e o custo de instalação
    var num_sensores = camara * 15;
    var custo_sensor_instalacao = (num_sensores / 5) * 100;

    // Define o percentual de funcionários afetados e o valor médio de indenização
    var percentual_funcionarios_afetados = 0;
    var valor_medio_indenizacao = 0;

    if (cenario === 'baixo') {
        percentual_funcionarios_afetados = 0.02;
        valor_medio_indenizacao = 10000;
    } else if (cenario === 'moderado') {
        percentual_funcionarios_afetados = 0.15;
        valor_medio_indenizacao = 50000;
    } else if (cenario === 'grave') {
        percentual_funcionarios_afetados = 0.7;
        valor_medio_indenizacao = 200000;
    }

    // Calcula o número de funcionários afetados
    var funcionarios_afetados = qtd_funcionarios * percentual_funcionarios_afetados;
    funcionarios_afetados = parseInt(funcionarios_afetados + 0.9999);

    // Calcula o custo total de indenizações
    var custo_indenizacoes = funcionarios_afetados * valor_medio_indenizacao;

    // Calcula a economia potencial ao instalar os sensores
    var economia_potencial = custo_indenizacoes - custo_sensor_instalacao;

    // Exibe os resultados na tela de forma legível
    div_mensagem.innerHTML = ` <div  class="titulo-div-primeiro"> <h1> Perdas possíveis sem monitoramento:\n </h1> </div>
        <div class="div_msg_style">
        <p> Com base na sua simulação de cenario ${cenario}, <strong>${funcionarios_afetados}</strong> funcionários podem ser afetados. </p>
        <p> Gerando um custo estimado de indenizações de <strong>R$ ${custo_indenizacoes.toLocaleString('pt-BR')}</strong>. </p>
        <h1> Solução </h1>
        <p> Esse prejuízo pode ser evitado investindo até <strong>R$ ${custo_sensor_instalacao.toLocaleString('pt-BR')}</strong> na instalação de ${num_sensores} sensores. </p> 
        <div class="div_msg_economia">
        <h1> Economia </h1>
        <p> Com o nosso sistema, você pode economizar </p>
        <span><strong>R$ ${economia_potencial.toLocaleString('pt-BR')}!</strong> </span> 
        <p> Assim protegendo sua equipe e evitando prejuízos.</p>
        </div>
        </div>
    `;
    }}
