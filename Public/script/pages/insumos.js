// VEEX - Sistema de Gestão de Custos e Produção
// insumos.js - Funcionalidades específicas da página Insumos

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos da página
    const btnNovoInsumo = document.getElementById('btn-novo-insumo');
    const modalNovoInsumo = document.getElementById('modal-novo-insumo');
    const formNovoInsumo = document.getElementById('form-novo-insumo');
    const btnSalvar = document.getElementById('btn-salvar');
    const tabelaInsumos = document.querySelector('.table tbody');
    
    // Inicializar dados da página de insumos
    function inicializarInsumos() {
        // Carregar insumos
        const insumos = dataManager.getInsumos();
        
        // Atualizar cards de métricas
        document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = insumos.length;
        
        const insumosEstoqueBaixo = insumos.filter(insumo => insumo.status === 'Baixo');
        document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = insumosEstoqueBaixo.length;
        
        const valorTotal = insumos.reduce((total, insumo) => total + (insumo.preco * insumo.estoque), 0);
        document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = utils.formatarMoeda(valorTotal);
        
        // Atualizar alerta de estoque baixo
        const alertaCard = document.querySelector('.alert-card');
        if (alertaCard) {
            if (insumosEstoqueBaixo.length > 0) {
                alertaCard.style.display = 'block';
                alertaCard.querySelector('p').textContent = 
                    `${insumosEstoqueBaixo.length} insumos estão com estoque abaixo do mínimo. Verifique a tabela abaixo.`;
            } else {
                alertaCard.style.display = 'none';
            }
        }
        
        // Limpar tabela
        if (tabelaInsumos) {
            tabelaInsumos.innerHTML = '';
            
            // Adicionar linhas de insumos
            insumos.forEach(insumo => {
                const tr = document.createElement('tr');
                if (insumo.status === 'Baixo') {
                    tr.className = 'table-warning';
                }
                
                tr.dataset.id = insumo.id;
                
                tr.innerHTML = `
                    <td>${insumo.nome}</td>
                    <td>${insumo.tipo}</td>
                    <td>${insumo.unidade}</td>
                    <td>${utils.formatarMoeda(insumo.preco)}</td>
                    <td>${insumo.estoque}</td>
                    <td>${insumo.estoqueMinimo}</td>
                    <td><span class="badge bg-${insumo.status === 'OK' ? 'success' : 'warning'}">${insumo.status}</span></td>
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
                
                tabelaInsumos.appendChild(tr);
                
                // Adicionar eventos aos botões
                const btnEditar = tr.querySelector('.btn-editar');
                const btnExcluir = tr.querySelector('.btn-excluir');
                
                btnEditar.addEventListener('click', () => editarInsumo(insumo.id));
                btnExcluir.addEventListener('click', () => excluirInsumo(insumo.id));
            });
            
            // Estilizar badges
            uiManager.inicializarBadges();
        }
        
        // Atualizar tabela de consumo de insumos
        atualizarTabelaConsumo();
    }
    
    // Função para atualizar tabela de consumo
    function atualizarTabelaConsumo() {
        const tabelaConsumo = document.querySelector('.card:last-child .table tbody');
        if (!tabelaConsumo) return;
        
        // Dados simulados de consumo
        const consumo = [
            { nome: 'Couro', quantidade: 120, unidade: 'm²' },
            { nome: 'Borracha', quantidade: 80, unidade: 'm' }
        ];
        
        tabelaConsumo.innerHTML = '';
        
        consumo.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.quantidade} ${item.unidade}</td>
            `;
            tabelaConsumo.appendChild(tr);
        });
    }
    
    // Função para editar insumo
    function editarInsumo(id) {
        const insumo = dataManager.getInsumoPorId(id);
        if (!insumo) return;
        
        // Preencher formulário com dados do insumo
        // Aqui seria implementado o preenchimento do formulário
        
        // Abrir modal
        modalNovoInsumo.classList.add('show');
        modalNovoInsumo.querySelector('.modal').classList.add('show');
        modalNovoInsumo.querySelector('.modal-title').textContent = 'Editar Insumo';
        btnSalvar.textContent = 'Atualizar Insumo';
        
        // Armazenar ID do insumo sendo editado
        formNovoInsumo.dataset.editId = id;
    }
    
    // Função para excluir insumo
    function excluirInsumo(id) {
        if (confirm('Tem certeza que deseja excluir este insumo?')) {
            dataManager.removerInsumo(id);
            alert('Insumo excluído com sucesso!');
            inicializarInsumos();
        }
    }
    
    // Função para salvar novo insumo ou atualizar existente
    function salvarInsumo() {
        // Aqui seria implementada a lógica para coletar dados do formulário
        // e salvar ou atualizar o insumo
        
        const editId = formNovoInsumo.dataset.editId;
        
        // Dados simulados para demonstração
        const novoInsumo = {
            nome: "Novo Insumo",
            tipo: "Matéria-prima",
            unidade: "kg",
            preco: 50.00,
            estoque: 100,
            estoqueMinimo: 30,
            status: "OK"
        };
        
        if (editId) {
            // Atualizar insumo existente
            dataManager.atualizarInsumo(parseInt(editId), novoInsumo);
            alert('Insumo atualizado com sucesso!');
        } else {
            // Adicionar novo insumo
            dataManager.adicionarInsumo(novoInsumo);
            alert('Novo insumo adicionado com sucesso!');
        }
        
        // Fechar modal
        modalNovoInsumo.classList.remove('show');
        modalNovoInsumo.querySelector('.modal').classList.remove('show');
        
        // Limpar formulário
        formNovoInsumo.reset();
        delete formNovoInsumo.dataset.editId;
        
        // Atualizar lista de insumos
        inicializarInsumos();
    }
    
    // Eventos
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarInsumo);
    }
    
    // Filtros e busca
    const selectTipo = document.querySelector('.card-header select');
    const inputBusca = document.querySelector('.card-header input[type="text"]');
    
    if (selectTipo) {
        selectTipo.addEventListener('change', filtrarInsumos);
    }
    
    if (inputBusca) {
        inputBusca.addEventListener('input', filtrarInsumos);
    }
    
    function filtrarInsumos() {
        const tipo = selectTipo ? selectTipo.value : '';
        const termoBusca = inputBusca ? inputBusca.value : '';
        
        // Obter todos os insumos
        let insumos = dataManager.getInsumos();
        
        // Filtrar por tipo
        if (tipo) {
            insumos = insumos.filter(insumo => insumo.tipo.toLowerCase() === tipo.toLowerCase());
        }
        
        // Filtrar por termo de busca
        if (termoBusca) {
            insumos = utils.filtrarArray(insumos, termoBusca, ['nome', 'tipo']);
        }
        
        // Atualizar visualização
        if (tabelaInsumos) {
            tabelaInsumos.innerHTML = '';
            
            if (insumos.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="8" class="text-center">Nenhum insumo encontrado</td>';
                tabelaInsumos.appendChild(tr);
                return;
            }
            
            // Adicionar linhas filtradas
            insumos.forEach(insumo => {
                const tr = document.createElement('tr');
                if (insumo.status === 'Baixo') {
                    tr.className = 'table-warning';
                }
                
                tr.dataset.id = insumo.id;
                
                tr.innerHTML = `
                    <td>${insumo.nome}</td>
                    <td>${insumo.tipo}</td>
                    <td>${insumo.unidade}</td>
                    <td>${utils.formatarMoeda(insumo.preco)}</td>
                    <td>${insumo.estoque}</td>
                    <td>${insumo.estoqueMinimo}</td>
                    <td><span class="badge bg-${insumo.status === 'OK' ? 'success' : 'warning'}">${insumo.status}</span></td>
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
                
                tabelaInsumos.appendChild(tr);
                
                // Adicionar eventos aos botões
                const btnEditar = tr.querySelector('.btn-editar');
                const btnExcluir = tr.querySelector('.btn-excluir');
                
                btnEditar.addEventListener('click', () => editarInsumo(insumo.id));
                btnExcluir.addEventListener('click', () => excluirInsumo(insumo.id));
            });
            
            // Estilizar badges
            uiManager.inicializarBadges();
        }
    }
    
    // Inicializar a página
    inicializarInsumos();
});
