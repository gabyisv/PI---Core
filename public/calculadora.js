
function calcular() {
    div_mensagem.innerHTML = '';

    var AREA_POR_SENSOR = 25; // 1 sensor a cada 25 m²

    // Captura os valores dos inputs e selects
    var qtd_funcionarios = Number(input_funcionario.value);
    var camara = Number(input_camara.value);
    // Captura a área de CADA câmara em m²
    var area_camara = Number(input_area_camara.value);
    var cenario = select_cenario.value;

    // Verifica se todos os campos foram preenchidos
    if (!qtd_funcionarios || !camara || !area_camara || !cenario) {
        div_mensagem.innerHTML = '<p class="div-msg-erro"> Por favor, preencha todos os campos! </p>';
    } else if (qtd_funcionarios <= 0 || camara <= 0 || area_camara <= 0) {
        div_mensagem.innerHTML = '<p class="div-msg-erro"> Digite um valor acima de 0 para a quantidade de funcionários, câmaras e área da câmara. </p>';
    } else {

        // 1. Calcula quantos sensores UMA câmara precisa (Arredonda para cima)
        var sensores_por_camara = Math.ceil(area_camara / AREA_POR_SENSOR);

        // 2. Calcula o número total de sensores
        var num_sensores = camara * sensores_por_camara;
        

        var custo_unitario = 100;
        var custo_sensor_instalacao = num_sensores * custo_unitario

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
        div_mensagem.innerHTML = ` <div class="titulo-div-primeiro"> <h1> Perdas possíveis sem monitoramento: </h1> </div>
            <div class="div_msg_style">
            <p> Com base na sua simulação de cenario ${cenario}, em torno de  <strong>${funcionarios_afetados}</strong> funcionários podem ser afetados. </p>
            <p> Gerando um custo estimado de indenizações de <strong>R$ ${custo_indenizacoes.toLocaleString('pt-BR')}</strong>. </p>
            <h1> Solução </h1>
            <p> Cálculo Técnico: Cada câmara (com ${area_camara} m²) requer ${sensores_por_camara} sensores (base: 1 sensor/ ${AREA_POR_SENSOR}m²). </p>
            <p> Esse prejuízo pode ser evitado investindo até <strong>R$ ${custo_sensor_instalacao.toLocaleString('pt-BR')}</strong> na instalação de ${num_sensores} sensores no total. </p> 
            <div class="div_msg_economia">
            <h1> Economia </h1>
            <p> Com o nosso sistema, você pode economizar </p>
            <span><strong>R$ ${economia_potencial.toLocaleString('pt-BR')}!</strong> </span> 
            <p> Assim protegendo sua equipe e evitando prejuízos.</p>
            </div>
            </div>
        `;
    }
}