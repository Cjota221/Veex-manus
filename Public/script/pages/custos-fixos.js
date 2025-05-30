// VEEX - Sistema de Gestão de Custos e Produção
// custos-fixos.js - Funcionalidades específicas da página Custos Fixos

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos da página
    const btnNovoCusto = document.getElementById('btn-novo-custo');
    const modalNovoCusto = document.getElementById('modal-novo-custo');
    const formNovoCusto = document.getElementById('form-novo-custo');
    const btnSalvar = document.getElementById('btn-salvar');
    const tabelaCustos = document.querySelector('.table tbody');
    
    // Inicializar dados da página de custos fixos
    function inicializarCustosFixos() {
        // Carregar custos fixos
        const custosFixos = dataManager.getCustosFixos();
        
        // Calcular totais
        const totalMensal = custosFixos.reduce((total, custo) => total + custo.valor, 0);
        const custoPorPar = totalMensal / appData.resumo.producaoMes;
        const percentualCustoTotal = (totalMensal / appData.resumo.custoTotal) * 100;
        
        // Atualizar cards de métricas
        document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = utils.formatarMoeda(totalMensal);
        document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = utils.formatarMoeda(custoPorPar);
        document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = `${percentualCustoTotal.toFixed(0)}%`;
        
        // Limpar tabela
        if (tabelaCustos) {
            tabelaCustos.innerHTML = '';
            
            // Adicionar linhas de custos fixos
            custosFixos.forEach(custo => {
                const tr = document.createElement('tr');
                tr.dataset.id = custo.id;
                
                tr.innerHTML = `
                    <td>${custo.descricao}</td>
                    <td>${custo.categoria}</td>
                    <td>${utils.formatarMoeda(custo.valor)}</td>
                    <td>${utils.formatarData(custo.vencimento)}</td>
                    <td><span class="badge bg-${custo.status === 'Pago' ? 'success' : 'warning'}">${custo.status}</span></td>
                    <td>
                        <div class="flex gap-sm">
                            <button class="btn btn-icon btn-sm btn-editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-icon btn-sm btn-excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                tabelaCustos.appendChild(tr);
                
                // Adicionar eventos aos botões
                const btnEditar = tr.querySelector('.btn-editar');
                const btnExcluir = tr.querySelector('.btn-excluir');
                
                btnEditar.addEventListener('click', () => editarCustoFixo(custo.id));
                btnExcluir.addEventListener('click', () => excluirCustoFixo(custo.id));
            });
            
            // Adicionar linha de total
            const trTotal = document.createElement('tr');
            trTotal.innerHTML = `
                <td colspan="2" class="text-right font-semibold">Total:</td>
                <td class="font-bold">${utils.formatarMoeda(totalMensal)}</td>
                <td colspan="3"></td>
            `;
            tabelaCustos.appendChild(trTotal);
            
            // Estilizar badges
            uiManager.inicializarBadges();
        }
        
        // Atualizar gráficos
        inicializarGraficos();
        
        // Atualizar tabela de distribuição por categoria
        atualizarDistribuicaoCategoria();
    }
    
    // Função para atualizar tabela de distribuição por categoria
    function atualizarDistribuicaoCategoria() {
        const tabelaDistribuicao = document.querySelector('.grid-2-cols .table tbody');
        if (!tabelaDistribuicao) return;
        
        const custosFixos = dataManager.getCustosFixos();
        const totalMensal = custosFixos.reduce((total, custo) => total + custo.valor, 0);
        
        // Agrupar por categoria
        const categorias = {};
        custosFixos.forEach(custo => {
            if (!categorias[custo.categoria]) {
                categorias[custo.categoria] = 0;
            }
            categorias[custo.categoria] += custo.valor;
        });
        
        tabelaDistribuicao.innerHTML = '';
        
        // Adicionar linhas por categoria
        Object.keys(categorias).forEach(categoria => {
            const valor = categorias[categoria];
            const percentual = (valor / totalMensal) * 100;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${categoria}</td>
                <td>${utils.formatarMoeda(valor)}</td>
                <td>${percentual.toFixed(1)}%</td>
            `;
            tabelaDistribuicao.appendChild(tr);
        });
        
        // Adicionar linha de total
        const trTotal = document.createElement('tr');
        trTotal.innerHTML = `
            <td class="font-semibold">Total</td>
            <td class="font-bold">${utils.formatarMoeda(totalMensal)}</td>
            <td class="font-bold">100%</td>
        `;
        tabelaDistribuicao.appendChild(trTotal);
    }
    
    // Inicializar gráficos
    function inicializarGraficos() {
        // Aqui seriam inicializados os gráficos com Chart.js ou outra biblioteca
        // Por simplicidade, estamos apenas simulando a presença dos gráficos
        
        console.log('Gráficos de custos fixos inicializados');
        
        // Exemplo de como seria com Chart.js:
        /*
        if (typeof Chart !== 'undefined') {
            // Gráfico de evolução dos custos fixos
            const ctxEvolucao = document.querySelector('.card:nth-of-type(3) .chart-container canvas').getContext('2d');
            new Chart(ctxEvolucao, {
                type: 'line',
                data: {
                    labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                    datasets: [{
                        label: 'Custos Fixos',
                        data: [7800, 8100, 8200, 8300, 8400, 8500],
                        borderColor: '#ff6b9d',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            
            // Gráfico de distribuição por categoria
            const ctxDistribuicao = document.querySelector('.card:nth-of-type(4) .chart-container canvas').getContext('2d');
            new Chart(ctxDistribuicao, {
                type: 'pie',
                data: {
                    labels: ['Aluguel', 'Pessoal', 'Serviços', 'Outros'],
                    datasets: [{
                        data: [3500, 2800, 1800, 400],
                        backgroundColor: ['#ff6b9d', '#9d4edd', '#5a189a', '#3c096c']
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
    
    // Função para editar custo fixo
    function editarCustoFixo(id) {
        const custo = dataManager.getCustoFixoPorId(id);
        if (!custo) return;
        
        // Preencher formulário com dados do custo
        // Aqui seria implementado o preenchimento do formulário
        
        // Abrir modal
        modalNovoCusto.classList.add('show');
        modalNovoCusto.querySelector('.modal').classList.add('show');
        modalNovoCusto.querySelector('.modal-title').textContent = 'Editar Custo Fixo';
        btnSalvar.textContent = 'Atualizar';
        
        // Armazenar ID do custo sendo editado
        formNovoCusto.dataset.editId = id;
    }
    
    // Função para excluir custo fixo
    function excluirCustoFixo(id) {
        if (confirm('Tem certeza que deseja excluir este custo fixo?')) {
            dataManager.removerCustoFixo(id);
            alert('Custo fixo excluído com sucesso!');
            inicializarCustosFixos();
        }
    }
    
    // Função para salvar novo custo fixo ou atualizar existente
    function salvarCustoFixo() {
        // Aqui seria implementada a lógica para coletar dados do formulário
        // e salvar ou atualizar o custo fixo
        
        const editId = formNovoCusto.dataset.editId;
        
        // Dados simulados para demonstração
        const novoCusto = {
            descricao: "Novo Custo Fixo",
            categoria: "Outros",
            valor: 200.00,
            vencimento: "2025-05-31",
            status: "Pendente"
        };
        
        if (editId) {
            // Atualizar custo existente
            dataManager.atualizarCustoFixo(parseInt(editId), novoCusto);
            alert('Custo fixo atualizado com sucesso!');
        } else {
            // Adicionar novo custo
            dataManager.adicionarCustoFixo(novoCusto);
            alert('Novo custo fixo adicionado com sucesso!');
        }
        
        // Fechar modal
        modalNovoCusto.classList.remove('show');
        modalNovoCusto.querySelector('.modal').classList.remove('show');
        
        // Limpar formulário
        formNovoCusto.reset();
        delete formNovoCusto.dataset.editId;
        
        // Atualizar lista de custos fixos
        inicializarCustosFixos();
    }
    
    // Eventos
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarCustoFixo);
    }
    
    // Filtros e busca
    const selectCategoria = document.querySelector('.card-header select');
    const inputBusca = document.querySelector('.card-header input[type="text"]');
    
    if (selectCategoria) {
        selectCategoria.addEventListener('change', filtrarCustosFixos);
    }
    
    if (inputBusca) {
        inputBusca.addEventListener('input', filtrarCustosFixos);
    }
    
    function filtrarCustosFixos() {
        const categoria = selectCategoria ? selectCategoria.value : '';
        const termoBusca = inputBusca ? inputBusca.value : '';
        
        // Obter todos os custos fixos
        let custosFixos = dataManager.getCustosFixos();
        
        // Filtrar por categoria
        if (categoria) {
            custosFixos = custosFixos.filter(custo => custo.categoria.toLowerCase() === categoria.toLowerCase());
        }
        
        // Filtrar por termo de busca
        if (termoBusca) {
            custosFixos = utils.filtrarArray(custosFixos, termoBusca, ['descricao', 'categoria']);
        }
        
        // Calcular total filtrado
        const totalFiltrado = custosFixos.reduce((total, custo) => total + custo.valor, 0);
        
        // Atualizar visualização
        if (tabelaCustos) {
            tabelaCustos.innerHTML = '';
            
            if (custosFixos.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="6" class="text-center">Nenhum custo fixo encontrado</td>';
                tabelaCustos.appendChild(tr);
                
                // Adicionar linha de total zerado
                const trTotal = document.createElement('tr');
                trTotal.innerHTML = `
                    <td colspan="2" class="text-right font-semibold">Total:</td>
                    <td class="font-bold">${utils.formatarMoeda(0)}</td>
                    <td colspan="3"></td>
                `;
                tabelaCustos.appendChild(trTotal);
                return;
            }
            
            // Adicionar linhas filtradas
            custosFixos.forEach(custo => {
                const tr = document.createElement('tr');
                tr.dataset.id = custo.id;
                
                tr.innerHTML = `
                    <td>${custo.descricao}</td>
                    <td>${custo.categoria}</td>
                    <td>${utils.formatarMoeda(custo.valor)}</td>
                    <td>${utils.formatarData(custo.vencimento)}</td>
                    <td><span class="badge bg-${custo.status === 'Pago' ? 'success' : 'warning'}">${custo.status}</span></td>
                    <td>
                        <div class="flex gap-sm">
                            <button class="btn btn-icon btn-sm btn-editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-icon btn-sm btn-excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                tabelaCustos.appendChild(tr);
                
                // Adicionar eventos aos botões
                const btnEditar = tr.querySelector('.btn-editar');
                const btnExcluir = tr.querySelector('.btn-excluir');
                
                btnEditar.addEventListener('click', () => editarCustoFixo(custo.id));
                btnExcluir.addEventListener('click', () => excluirCustoFixo(custo.id));
            });
            
            // Adicionar linha de total
            const trTotal = document.createElement('tr');
            trTotal.innerHTML = `
                <td colspan="2" class="text-right font-semibold">Total:</td>
                <td class="font-bold">${utils.formatarMoeda(totalFiltrado)}</td>
                <td colspan="3"></td>
            `;
            tabelaCustos.appendChild(trTotal);
            
            // Estilizar badges
            uiManager.inicializarBadges();
        }
    }
    
    // Seletor de período
    const selectMes = document.querySelector('.card:nth-of-type(1) select:nth-of-type(1)');
    const selectAno = document.querySelector('.card:nth-of-type(1) select:nth-of-type(2)');
    const btnAtualizar = document.querySelector('.card:nth-of-type(1) .btn-primary');
    
    if (btnAtualizar) {
        btnAtualizar.addEventListener('click', function() {
            const mes = selectMes ? selectMes.options[selectMes.selectedIndex].text : 'Maio';
            const ano = selectAno ? selectAno.value : '2025';
            
            // Atualizar título da tabela
            const tituloTabela = document.querySelector('.card:nth-of-type(2) .card-title');
            if (tituloTabela) {
                tituloTabela.textContent = `Custos Fixos - ${mes}/${ano}`;
            }
            
            // Simular atualização de dados
            alert(`Dados atualizados para ${mes}/${ano}`);
            inicializarCustosFixos();
        });
    }
    
    // Inicializar a página
    inicializarCustosFixos();
});
