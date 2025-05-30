// VEEX - Sistema de Gestão de Custos e Produção
// producao.js - Funcionalidades específicas da página Produção

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos da página
    const btnNovaProducao = document.getElementById('btn-nova-producao');
    const modalNovaProducao = document.getElementById('modal-nova-producao');
    const formNovaProducao = document.getElementById('form-nova-producao');
    const btnSalvar = document.getElementById('btn-salvar');
    const tabelaProducao = document.querySelector('.table tbody');
    
    // Inicializar dados da página de produção
    function inicializarProducao() {
        // Carregar dados de produção
        const producao = dataManager.getProducao();
        
        // Calcular totais
        const totalQuantidade = producao.reduce((total, prod) => total + prod.quantidade, 0);
        const totalCusto = producao.reduce((total, prod) => total + prod.custoTotal, 0);
        
        // Atualizar cards de métricas
        document.querySelector('.metric-card:nth-child(1) .metric-value').innerHTML = 
            `${appData.resumo.producaoMes} <span class="metric-unit">pares</span>`;
        
        document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = 
            utils.formatarMoeda(appData.resumo.custoTotal);
        
        document.querySelector('.metric-card:nth-child(3) .metric-value').innerHTML = 
            `+15% <span class="metric-unit">vs. mês anterior</span>`;
        
        // Limpar tabela
        if (tabelaProducao) {
            tabelaProducao.innerHTML = '';
            
            // Adicionar linhas de produção
            producao.forEach(prod => {
                const tr = document.createElement('tr');
                tr.dataset.id = prod.id;
                
                tr.innerHTML = `
                    <td>${utils.formatarData(prod.data)}</td>
                    <td>
                        <div class="flex items-center gap-sm">
                            <img src="${prod.imagem}" alt="${prod.modelo}" style="border-radius: 4px;">
                            <span>${prod.modelo}</span>
                        </div>
                    </td>
                    <td>${prod.quantidade}</td>
                    <td>${utils.formatarMoeda(prod.custoUnitario)}</td>
                    <td>${utils.formatarMoeda(prod.custoTotal)}</td>
                    <td><span class="badge bg-${prod.status === 'Concluído' ? 'success' : 'warning'}">${prod.status}</span></td>
                    <td>
                        <div class="flex gap-sm">
                            <button class="btn btn-icon btn-sm btn-visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-icon btn-sm btn-editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-icon btn-sm btn-excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                tabelaProducao.appendChild(tr);
                
                // Adicionar eventos aos botões
                const btnVisualizar = tr.querySelector('.btn-visualizar');
                const btnEditar = tr.querySelector('.btn-editar');
                const btnExcluir = tr.querySelector('.btn-excluir');
                
                btnVisualizar.addEventListener('click', () => visualizarProducao(prod.id));
                btnEditar.addEventListener('click', () => editarProducao(prod.id));
                btnExcluir.addEventListener('click', () => excluirProducao(prod.id));
            });
            
            // Adicionar linha de total
            const trTotal = document.createElement('tr');
            trTotal.innerHTML = `
                <td colspan="2" class="text-right font-semibold">Total:</td>
                <td class="font-bold">${totalQuantidade} pares</td>
                <td></td>
                <td class="font-bold">${utils.formatarMoeda(totalCusto)}</td>
                <td colspan="2"></td>
            `;
            tabelaProducao.appendChild(trTotal);
            
            // Estilizar badges
            uiManager.inicializarBadges();
        }
        
        // Atualizar tabela de consumo de insumos
        atualizarTabelaConsumo();
        
        // Inicializar gráficos
        inicializarGraficos();
    }
    
    // Função para atualizar tabela de consumo de insumos
    function atualizarTabelaConsumo() {
        const tabelaConsumo = document.querySelector('.card:last-child .table tbody');
        if (!tabelaConsumo) return;
        
        // Dados simulados de consumo
        const consumo = [
            { nome: 'Couro', quantidade: 120, unidade: 'm²', custo: 9600.00, estoque: 80, status: 'OK' },
            { nome: 'Borracha', quantidade: 80, unidade: 'kg', custo: 3600.00, estoque: 45, status: 'OK' },
            { nome: 'Tecido', quantidade: 35, unidade: 'm', custo: 875.00, estoque: 15, status: 'Baixo' },
            { nome: 'Cola', quantidade: 15, unidade: 'L', custo: 450.00, estoque: 25, status: 'OK' },
            { nome: 'Cadarço', quantidade: 250, unidade: 'un', custo: 625.00, estoque: 50, status: 'Baixo' }
        ];
        
        tabelaConsumo.innerHTML = '';
        
        consumo.forEach(item => {
            const tr = document.createElement('tr');
            if (item.status === 'Baixo') {
                tr.className = 'table-warning';
            }
            
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>${item.unidade}</td>
                <td>${utils.formatarMoeda(item.custo)}</td>
                <td>${item.estoque}</td>
                <td><span class="badge bg-${item.status === 'OK' ? 'success' : 'warning'}">${item.status}</span></td>
            `;
            tabelaConsumo.appendChild(tr);
        });
        
        // Estilizar badges
        uiManager.inicializarBadges();
    }
    
    // Inicializar gráficos
    function inicializarGraficos() {
        // Aqui seriam inicializados os gráficos com Chart.js ou outra biblioteca
        // Por simplicidade, estamos apenas simulando a presença dos gráficos
        
        console.log('Gráficos de produção inicializados');
        
        // Exemplo de como seria com Chart.js:
        /*
        if (typeof Chart !== 'undefined') {
            // Gráfico de produção por modelo
            const ctxModelo = document.querySelector('.grid-2-cols .card:first-child .chart-container canvas').getContext('2d');
            new Chart(ctxModelo, {
                type: 'pie',
                data: {
                    labels: ['Tênis Esportivo', 'Sandália Casual', 'Sapato Social', 'Bota Feminina'],
                    datasets: [{
                        data: [250, 50, 75, 25],
                        backgroundColor: ['#ff6b9d', '#9d4edd', '#5a189a', '#3c096c']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            
            // Gráfico de evolução da produção
            const ctxEvolucao = document.querySelector('.grid-2-cols .card:last-child .chart-container canvas').getContext('2d');
            new Chart(ctxEvolucao, {
                type: 'line',
                data: {
                    labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                    datasets: [{
                        label: 'Produção Mensal',
                        data: [800, 950, 1100, 980, 1250, 0],
                        borderColor: '#ff6b9d',
                        tension: 0.4
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
    
    // Função para visualizar detalhes da produção
    function visualizarProducao(id) {
        const prod = dataManager.getProducaoPorId(id);
        if (!prod) return;
        
        // Aqui seria implementada a lógica para exibir detalhes da produção
        // Por simplicidade, estamos apenas exibindo um alerta
        alert(`Detalhes da produção: ${prod.modelo} - ${prod.quantidade} pares - ${utils.formatarMoeda(prod.custoTotal)}`);
    }
    
    // Função para editar produção
    function editarProducao(id) {
        const prod = dataManager.getProducaoPorId(id);
        if (!prod) return;
        
        // Preencher formulário com dados da produção
        // Aqui seria implementado o preenchimento do formulário
        
        // Abrir modal
        modalNovaProducao.classList.add('show');
        modalNovaProducao.querySelector('.modal').classList.add('show');
        modalNovaProducao.querySelector('.modal-title').textContent = 'Editar Produção';
        btnSalvar.textContent = 'Atualizar Produção';
        
        // Armazenar ID da produção sendo editada
        formNovaProducao.dataset.editId = id;
    }
    
    // Função para excluir produção
    function excluirProducao(id) {
        if (confirm('Tem certeza que deseja excluir este registro de produção?')) {
            dataManager.removerProducao(id);
            alert('Registro de produção excluído com sucesso!');
            inicializarProducao();
        }
    }
    
    // Função para salvar nova produção ou atualizar existente
    function salvarProducao() {
        // Aqui seria implementada a lógica para coletar dados do formulário
        // e salvar ou atualizar a produção
        
        const editId = formNovaProducao.dataset.editId;
        
        // Dados simulados para demonstração
        const novaProducao = {
            data: "2025-05-31",
            modelo: "Tênis Esportivo",
            imagem: "https://via.placeholder.com/40",
            quantidade: 50,
            custoUnitario: 95.00,
            custoTotal: 4750.00,
            status: "Concluído"
        };
        
        if (editId) {
            // Atualizar produção existente
            dataManager.atualizarProducao(parseInt(editId), novaProducao);
            alert('Registro de produção atualizado com sucesso!');
        } else {
            // Adicionar nova produção
            dataManager.adicionarProducao(novaProducao);
            alert('Novo registro de produção adicionado com sucesso!');
        }
        
        // Fechar modal
        modalNovaProducao.classList.remove('show');
        modalNovaProducao.querySelector('.modal').classList.remove('show');
        
        // Limpar formulário
        formNovaProducao.reset();
        delete formNovaProducao.dataset.editId;
        
        // Atualizar lista de produção
        inicializarProducao();
    }
    
    // Eventos
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarProducao);
    }
    
    // Filtros e busca
    const selectPeriodo = document.querySelector('.card:nth-of-type(1) select:nth-of-type(1)');
    const selectModelo = document.querySelector('.card:nth-of-type(1) select:nth-of-type(2)');
    const btnFiltrar = document.querySelector('.card:nth-of-type(1) .btn-primary');
    const inputBusca = document.querySelector('.card:nth-of-type(2) input[type="text"]');
    
    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', filtrarProducao);
    }
    
    if (inputBusca) {
        inputBusca.addEventListener('input', filtrarProducao);
    }
    
    function filtrarProducao() {
        const periodo = selectPeriodo ? selectPeriodo.value : '';
        const modelo = selectModelo ? selectModelo.value : '';
        const termoBusca = inputBusca ? inputBusca.value : '';
        
        // Obter todos os registros de produção
        let producao = dataManager.getProducao();
        
        // Filtrar por período (simulado)
        if (periodo) {
            // Aqui seria implementada a lógica para filtrar por período
            console.log(`Filtrando por período: ${periodo}`);
        }
        
        // Filtrar por modelo
        if (modelo) {
            producao = producao.filter(prod => prod.modelo.toLowerCase().includes(modelo.toLowerCase()));
        }
        
        // Filtrar por termo de busca
        if (termoBusca) {
            producao = utils.filtrarArray(producao, termoBusca, ['modelo']);
        }
        
        // Calcular totais filtrados
        const totalQuantidade = producao.reduce((total, prod) => total + prod.quantidade, 0);
        const totalCusto = producao.reduce((total, prod) => total + prod.custoTotal, 0);
        
        // Atualizar visualização
        if (tabelaProducao) {
            tabelaProducao.innerHTML = '';
            
            if (producao.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="7" class="text-center">Nenhum registro de produção encontrado</td>';
                tabelaProducao.appendChild(tr);
                
                // Adicionar linha de total zerado
                const trTotal = document.createElement('tr');
                trTotal.innerHTML = `
                    <td colspan="2" class="text-right font-semibold">Total:</td>
                    <td class="font-bold">0 pares</td>
                    <td></td>
                    <td class="font-bold">${utils.formatarMoeda(0)}</td>
                    <td colspan="2"></td>
                `;
                tabelaProducao.appendChild(trTotal);
                return;
            }
            
            // Adicionar linhas filtradas
            producao.forEach(prod => {
                const tr = document.createElement('tr');
                tr.dataset.id = prod.id;
                
                tr.innerHTML = `
                    <td>${utils.formatarData(prod.data)}</td>
                    <td>
                        <div class="flex items-center gap-sm">
                            <img src="${prod.imagem}" alt="${prod.modelo}" style="border-radius: 4px;">
                            <span>${prod.modelo}</span>
                        </div>
                    </td>
                    <td>${prod.quantidade}</td>
                    <td>${utils.formatarMoeda(prod.custoUnitario)}</td>
                    <td>${utils.formatarMoeda(prod.custoTotal)}</td>
                    <td><span class="badge bg-${prod.status === 'Concluído' ? 'success' : 'warning'}">${prod.status}</span></td>
                    <td>
                        <div class="flex gap-sm">
                            <button class="btn btn-icon btn-sm btn-visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-icon btn-sm btn-editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-icon btn-sm btn-excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                tabelaProducao.appendChild(tr);
                
                // Adicionar eventos aos botões
                const btnVisualizar = tr.querySelector('.btn-visualizar');
                const btnEditar = tr.querySelector('.btn-editar');
                const btnExcluir = tr.querySelector('.btn-excluir');
                
                btnVisualizar.addEventListener('click', () => visualizarProducao(prod.id));
                btnEditar.addEventListener('click', () => editarProducao(prod.id));
                btnExcluir.addEventListener('click', () => excluirProducao(prod.id));
            });
            
            // Adicionar linha de total
            const trTotal = document.createElement('tr');
            trTotal.innerHTML = `
                <td colspan="2" class="text-right font-semibold">Total:</td>
                <td class="font-bold">${totalQuantidade} pares</td>
                <td></td>
                <td class="font-bold">${utils.formatarMoeda(totalCusto)}</td>
                <td colspan="2"></td>
            `;
            tabelaProducao.appendChild(trTotal);
            
            // Estilizar badges
            uiManager.inicializarBadges();
        }
    }
    
    // Inicializar a página
    inicializarProducao();
});
