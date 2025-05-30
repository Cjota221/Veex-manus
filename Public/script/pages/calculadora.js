// VEEX - Sistema de Gestão de Custos e Produção
// calculadora.js - Funcionalidades específicas da página Calculadora

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos da página
    const selectModelo = document.getElementById('select-modelo');
    const custoProducao = document.getElementById('custo-producao');
    const margemLucro = document.getElementById('margem-lucro');
    const margemValor = document.getElementById('margem-valor');
    const precoSugerido = document.getElementById('preco-sugerido');
    const lucroUnidade = document.getElementById('lucro-unidade');
    const lucroPercentual = document.getElementById('lucro-percentual');
    const btnSimular = document.getElementById('btn-simular');
    const btnSalvar = document.getElementById('btn-salvar');
    const tabelaSimulacoes = document.querySelector('.table tbody');
    
    // Inicializar dados da calculadora
    function inicializarCalculadora() {
        // Verificar se há parâmetros na URL (modelo selecionado)
        const urlParams = new URLSearchParams(window.location.search);
        const modeloId = urlParams.get('modelo');
        
        if (modeloId) {
            // Selecionar modelo automaticamente
            const modelo = dataManager.getModeloPorId(parseInt(modeloId));
            if (modelo) {
                // Selecionar opção no select
                if (selectModelo) {
                    switch (modelo.nome) {
                        case 'Tênis Esportivo':
                            selectModelo.value = 'tenis';
                            break;
                        case 'Sandália Casual':
                            selectModelo.value = 'sandalia';
                            break;
                        case 'Sapato Social':
                            selectModelo.value = 'sapato';
                            break;
                        case 'Bota Feminina':
                            selectModelo.value = 'bota';
                            break;
                    }
                }
                
                // Preencher custo
                if (custoProducao) {
                    custoProducao.value = modelo.custo.toFixed(2).replace('.', ',');
                }
                
                // Definir margem
                if (margemLucro) {
                    margemLucro.value = modelo.margem;
                }
                
                // Calcular preço
                calcularPreco();
            }
        }
        
        // Carregar simulações salvas
        carregarSimulacoes();
    }
    
    // Função para calcular preço com base no custo e margem
    function calcularPreco() {
        const custoStr = custoProducao.value.replace(',', '.');
        const custo = parseFloat(custoStr);
        const margem = parseInt(margemLucro.value);
        
        if (!isNaN(custo)) {
            const preco = utils.calcularPreco(custo, margem);
            const lucro = utils.calcularLucro(custo, preco);
            
            precoSugerido.textContent = utils.formatarMoeda(preco);
            lucroUnidade.textContent = utils.formatarMoeda(lucro);
            lucroPercentual.textContent = `${margem}%`;
            margemValor.textContent = `${margem}%`;
            
            // Atualizar gráfico
            atualizarGrafico(custo, preco);
        }
    }
    
    // Função para atualizar gráfico de composição do preço
    function atualizarGrafico(custo, preco) {
        // Aqui seria implementada a lógica para atualizar o gráfico
        // Por simplicidade, estamos apenas simulando a presença do gráfico
        
        console.log('Gráfico de composição do preço atualizado');
        console.log(`Custo: ${custo}, Preço: ${preco}, Lucro: ${preco - custo}`);
        
        // Exemplo de como seria com Chart.js:
        /*
        if (typeof Chart !== 'undefined') {
            // Destruir gráfico anterior se existir
            if (window.composicaoChart) {
                window.composicaoChart.destroy();
            }
            
            // Criar novo gráfico
            const ctx = document.querySelector('.chart-container canvas').getContext('2d');
            window.composicaoChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Custo', 'Lucro'],
                    datasets: [{
                        data: [custo, preco - custo],
                        backgroundColor: ['#5a189a', '#ff6b9d']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        */
    }
    
    // Função para carregar simulações salvas
    function carregarSimulacoes() {
        if (!tabelaSimulacoes) return;
        
        // Obter simulações
        const simulacoes = dataManager.getSimulacoes();
        
        // Limpar tabela
        tabelaSimulacoes.innerHTML = '';
        
        // Adicionar linhas de simulações
        simulacoes.forEach(simulacao => {
            const tr = document.createElement('tr');
            tr.dataset.id = simulacao.id;
            
            tr.innerHTML = `
                <td>${utils.formatarData(simulacao.data)}</td>
                <td>${simulacao.modelo}</td>
                <td>${utils.formatarMoeda(simulacao.custo)}</td>
                <td>${simulacao.margem}%</td>
                <td>${utils.formatarMoeda(simulacao.preco)}</td>
                <td>
                    <div class="flex gap-sm">
                        <button class="btn btn-icon btn-sm btn-aplicar">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-icon btn-sm btn-excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tabelaSimulacoes.appendChild(tr);
            
            // Adicionar eventos aos botões
            const btnAplicar = tr.querySelector('.btn-aplicar');
            const btnExcluir = tr.querySelector('.btn-excluir');
            
            btnAplicar.addEventListener('click', () => aplicarSimulacao(simulacao.id));
            btnExcluir.addEventListener('click', () => excluirSimulacao(simulacao.id));
        });
    }
    
    // Função para aplicar simulação salva
    function aplicarSimulacao(id) {
        const simulacao = dataManager.getSimulacoes().find(sim => sim.id === id);
        if (!simulacao) return;
        
        // Preencher campos com dados da simulação
        custoProducao.value = simulacao.custo.toFixed(2).replace('.', ',');
        margemLucro.value = simulacao.margem;
        
        // Selecionar modelo correspondente
        if (selectModelo) {
            switch (simulacao.modelo) {
                case 'Tênis Esportivo':
                    selectModelo.value = 'tenis';
                    break;
                case 'Sandália Casual':
                    selectModelo.value = 'sandalia';
                    break;
                case 'Sapato Social':
                    selectModelo.value = 'sapato';
                    break;
                case 'Bota Feminina':
                    selectModelo.value = 'bota';
                    break;
            }
        }
        
        // Calcular preço
        calcularPreco();
    }
    
    // Função para excluir simulação
    function excluirSimulacao(id) {
        if (confirm('Tem certeza que deseja excluir esta simulação?')) {
            dataManager.removerSimulacao(id);
            alert('Simulação excluída com sucesso!');
            carregarSimulacoes();
        }
    }
    
    // Função para simular preço
    function simularPreco() {
        calcularPreco();
        alert('Simulação realizada com sucesso!');
    }
    
    // Função para salvar simulação
    function salvarSimulacao() {
        const custoStr = custoProducao.value.replace(',', '.');
        const custo = parseFloat(custoStr);
        const margem = parseInt(margemLucro.value);
        
        if (isNaN(custo)) {
            alert('Por favor, informe um custo válido.');
            return;
        }
        
        // Obter nome do modelo selecionado
        let nomeModelo = 'Personalizado';
        if (selectModelo) {
            switch (selectModelo.value) {
                case 'tenis':
                    nomeModelo = 'Tênis Esportivo';
                    break;
                case 'sandalia':
                    nomeModelo = 'Sandália Casual';
                    break;
                case 'sapato':
                    nomeModelo = 'Sapato Social';
                    break;
                case 'bota':
                    nomeModelo = 'Bota Feminina';
                    break;
            }
        }
        
        // Calcular preço
        const preco = utils.calcularPreco(custo, margem);
        
        // Criar objeto de simulação
        const simulacao = {
            modelo: nomeModelo,
            custo: custo,
            margem: margem,
            preco: preco
        };
        
        // Salvar simulação
        dataManager.adicionarSimulacao(simulacao);
        alert('Simulação salva com sucesso!');
        
        // Atualizar lista de simulações
        carregarSimulacoes();
    }
    
    // Eventos
    if (selectModelo) {
        selectModelo.addEventListener('change', () => {
            let custo = 0;
            
            switch (selectModelo.value) {
                case 'tenis':
                    custo = 95.00;
                    break;
                case 'sandalia':
                    custo = 66.00;
                    break;
                case 'sapato':
                    custo = 112.00;
                    break;
                case 'bota':
                    custo = 135.00;
                    break;
            }
            
            if (custo > 0 && custoProducao) {
                custoProducao.value = custo.toFixed(2).replace('.', ',');
                calcularPreco();
            }
        });
    }
    
    if (margemLucro) {
        margemLucro.addEventListener('input', calcularPreco);
    }
    
    if (custoProducao) {
        custoProducao.addEventListener('input', calcularPreco);
    }
    
    if (btnSimular) {
        btnSimular.addEventListener('click', simularPreco);
    }
    
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarSimulacao);
    }
    
    // Inicializar a página
    inicializarCalculadora();
});
