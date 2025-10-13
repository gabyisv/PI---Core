function calcular() {
      div_mensagem.innerHTML = '';

      // var funcionarios = Number(input_funcionarios.value);
      var idade = Number(input_idade.value);
      var salario = Number(input_salario.value);
      var porte = select_porte.value;
      var cenario = select_cenario.value;
      // var mensagem = div_mensagem.value;

      if (
        input_funcionarios.value == '' ||
        input_idade.value == '' ||
        input_salario.value == '' ||
        select_porte.value == '' ||
        select_cenario.value == ''
      ) {
        div_mensagem.innerHTML = 'Por favor, preencha todos os campos!';
      } else {
        var qtd_funcionarios = Number(input_funcionarios.value);
        var idade = Number(input_idade.value);
        var salario = Number(input_salario.value);
        var porte = select_porte.value;
        var cenario = select_cenario.value;

        // tirar ou alterar
        // var tempo_parada = 0;
        // if (porte == 'pequeno') {
        //   tempo_parada = 6;
        // } else if (porte == 'medio') {
        //   tempo_parada = 8;
        // } else if (porte == 'grande') {
        //   tempo_parada = 12;
        // }

        var num_camaras = 0;
        if (porte == 'pequeno') {
          num_camaras = 10;
        } else if (porte == 'medio') {
          num_camaras = 25;
        } else if (porte == 'grande') {
          num_camaras = 50;
        }

        var num_sensores = num_camaras * 15;
        var custo_sensor_instalacao = (num_sensores / 5) * 100; //pressupõe-se que sensores são vendidos em pacotes de 5 que custam R$100 por pacote (ou seja, R$20 por sensor).

        // var dias_paralisacao = tempo_parada * 30;
        // var custo_falhas = num_camaras * dias_paralisacao * 3000;

        var expectativa_vida = 76.8;
        var anos_restantes = expectativa_vida - idade; //anos de vida esperados restantes.
        var indenizacao_funcionario = salario * 13 * anos_restantes; //equivalente a 13 salários por ano ao longo de todos os anos restantes

        var percentual_funcionarios_afetados = 0;
        var impacto = 0;

        if (cenario == 'baixo') { 
          percentual_funcionarios_afetados = 0.02;//fração do total de funcionários direta ou indiretamente afetados.
          impacto = 0.1; //fator multiplicador usado depois sobre o valor total de indenização (parece representar a severidade econômica do dano).
        } else if (cenario == 'moderado') {
          percentual_funcionarios_afetados = 0.15;
          impacto = 0.4;
        } else if (cenario == 'grave') {
          percentual_funcionarios_afetados = 0.7;
          impacto = 0.9;
        }

        var funcionarios_afetados = qtd_funcionarios * percentual_funcionarios_afetados;
        funcionarios_afetados = parseInt(funcionarios_afetados + 0.9999); //Multiplica e tenta arredondar para cima com o parseInt(x + 0.9999)

        var custo_indenizacoes = funcionarios_afetados * indenizacao_funcionario * impacto;  //Multiplica o número de funcionários afetados, o valor teórico de indenização por funcionário e o fator impacto

        var multa_estimativa = 100000;

        var perdas_totais =  custo_indenizacoes + multa_estimativa;
        var economia_potencial = perdas_totais - custo_sensor_instalacao;



        div_mensagem.innerHTML += '<h1 class="titulo-div-primeiro"> Perdas possíveis sem monitoramento:\n </h1> <br>';
        // div_mensagem.innerHTML += '- Custo de falhas no sistema de refrigeração: R$ ' + (custo_falhas) + '\n';
        div_mensagem.innerHTML += `<h1 class="titulo-div"> Custo com indenizações (cenário ${cenario}): </h1> <h2 class="result-div"> R$ ${custo_indenizacoes} </div> <br>`;

        div_mensagem.innerHTML += `<br> 
        <h1 class="titulo-div">Risco estimado de multas: </h1> 
        <h2 class="result-div"> R$${multa_estimativa}  \n </h2><br> 
        <h1 class="titulo-div"> Economia potencial com o sistema:\n </h1>
        <div class="container-divs"> 
        <h2> Custo de instalação dos sensores: R$${custo_sensor_instalacao}  </h2> 
        <h2> Economia potencial ao evitar falhas e acidentes: R$${economia_potencial}</h2>
        </div>`;

      }
    }