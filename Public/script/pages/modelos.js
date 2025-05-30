// VEEX - Sistema de Gestão de Custos e Produção
// modelos.js - Funcionalidades específicas da página Modelos

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos da página
    const btnNovoModelo = document.getElementById('btn-novo-modelo');
    const modalNovoModelo = document.getElementById('modal-novo-modelo');
    const formNovoModelo = document.getElementById('form-novo-modelo');
    const btnSalvar = document.getElementById('btn-salvar');
    const cardGrid = document.querySelector('.card-grid');
    
    // Inicializar dados da página de modelos
    function inicializarModelos() {
        // Carregar modelos
        const modelos = dataManager.getModelos();
        
        // Limpar grid
        if (cardGrid) {
            cardGrid.innerHTML = '';
            
            // Adicionar cards de modelos
            modelos.forEach(modelo => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.id = modelo.id;
                
                card.innerHTML = `
                    <div class="model-image">
                        <img src="${modelo.imagem}" alt="${modelo.nome}">
                    </div>
                    <div class="model-name">${modelo.nome}</div>
                    <div class="model-category">${modelo.categoria}</div>
                    
                    <div class="flex justify-between mb-md">
                        <span>Custo:</span>
                        <span class="font-semibold">${utils.formatarMoeda(modelo.custo)}</span>
                    </div>
                    
                    <div class="flex justify-between mb-md">
                        <span>Margem:</span>
                        <span class="font-semibold">${modelo.margem}%</span>
                    </div>
                    
                    <div class="flex justify-between mb-md">
                        <span>Preço:</span>
                        <span class="font-bold text-primary">${utils.formatarMoeda(modelo.preco)}</span>
                    </div>
                    
                    <div class="card-footer">
                        <div class="flex justify-between">
                            <button class="btn btn-secondary btn-editar">
                                <i class="fas fa-edit"></i>
                                Editar
                            </button>
                            <button class="btn btn-outline btn-simular">
                                <i class="fas fa-calculator"></i>
                                Simular
                            </button>
                        </div>
                    </div>
                `;
                
                cardGrid.appendChild(card);
                
                // Adicionar eventos aos botões
                const btnEditar = card.querySelector('.btn-editar');
                const btnSimular = card.querySelector('.btn-simular');
                
                btnEditar.addEventListener('click', () => editarModelo(modelo.id));
                btnSimular.addEventListener('click', () => simularModelo(modelo.id));
            });
        }
    }
    
    // Função para editar modelo
    function editarModelo(id) {
        const modelo = dataManager.getModeloPorId(id);
        if (!modelo) return;
        
        // Preencher formulário com dados do modelo
        // Aqui seria implementado o preenchimento do formulário
        
        // Abrir modal
        modalNovoModelo.classList.add('show');
        modalNovoModelo.querySelector('.modal').classList.add('show');
        modalNovoModelo.querySelector('.modal-title').textContent = 'Editar Modelo';
        btnSalvar.textContent = 'Atualizar Modelo';
        
        // Armazenar ID do modelo sendo editado
        formNovoModelo.dataset.editId = id;
    }
    
    // Função para simular modelo
    function simularModelo(id) {
        const modelo = dataManager.getModeloPorId(id);
        if (!modelo) return;
        
        // Redirecionar para a calculadora com os dados do modelo
        window.location.href = `calculadora.html?modelo=${id}`;
    }
    
    // Função para salvar novo modelo ou atualizar existente
    function salvarModelo() {
        // Aqui seria implementada a lógica para coletar dados do formulário
        // e salvar ou atualizar o modelo
        
        const editId = formNovoModelo.dataset.editId;
        
        // Dados simulados para demonstração
        const novoModelo = {
            nome: "Novo Modelo",
            categoria: "Casual",
            imagem: "https://via.placeholder.com/150",
            custo: 85.00,
            margem: 30,
            preco: 110.50,
            insumos: []
        };
        
        if (editId) {
            // Atualizar modelo existente
            dataManager.atualizarModelo(parseInt(editId), novoModelo);
            alert('Modelo atualizado com sucesso!');
        } else {
            // Adicionar novo modelo
            dataManager.adicionarModelo(novoModelo);
            alert('Novo modelo adicionado com sucesso!');
        }
        
        // Fechar modal
        modalNovoModelo.classList.remove('show');
        modalNovoModelo.querySelector('.modal').classList.remove('show');
        
        // Limpar formulário
        formNovoModelo.reset();
        delete formNovoModelo.dataset.editId;
        
        // Atualizar lista de modelos
        inicializarModelos();
    }
    
    // Eventos
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarModelo);
    }
    
    // Filtros e ordenação
    const selectCategoria = document.querySelector('.card:nth-of-type(1) select:nth-of-type(1)');
    const selectOrdenacao = document.querySelector('.card:nth-of-type(1) select:nth-of-type(2)');
    const inputBusca = document.querySelector('.card:nth-of-type(1) input[type="text"]');
    
    if (selectCategoria) {
        selectCategoria.addEventListener('change', filtrarModelos);
    }
    
    if (selectOrdenacao) {
        selectOrdenacao.addEventListener('change', filtrarModelos);
    }
    
    if (inputBusca) {
        inputBusca.addEventListener('input', filtrarModelos);
    }
    
    function filtrarModelos() {
        const categoria = selectCategoria ? selectCategoria.value : '';
        const ordenacao = selectOrdenacao ? selectOrdenacao.value : '';
        const termoBusca = inputBusca ? inputBusca.value : '';
        
        // Obter todos os modelos
        let modelos = dataManager.getModelos();
        
        // Filtrar por categoria
        if (categoria) {
            modelos = modelos.filter(modelo => modelo.categoria.toLowerCase() === categoria.toLowerCase());
        }
        
        // Filtrar por termo de busca
        if (termoBusca) {
            modelos = utils.filtrarArray(modelos, termoBusca, ['nome', 'categoria']);
        }
        
        // Ordenar
        if (ordenacao) {
            switch (ordenacao) {
                case 'nome':
                    modelos = utils.ordenarArray(modelos, 'nome');
                    break;
                case 'custo':
                    modelos = utils.ordenarArray(modelos, 'custo');
                    break;
                case 'custo-desc':
                    modelos = utils.ordenarArray(modelos, 'custo', 'desc');
                    break;
                case 'margem':
                    modelos = utils.ordenarArray(modelos, 'margem', 'desc');
                    break;
            }
        }
        
        // Atualizar visualização
        if (cardGrid) {
            cardGrid.innerHTML = '';
            
            if (modelos.length === 0) {
                cardGrid.innerHTML = '<div class="empty-state">Nenhum modelo encontrado</div>';
                return;
            }
            
            // Adicionar cards filtrados
            modelos.forEach(modelo => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.id = modelo.id;
                
                card.innerHTML = `
                    <div class="model-image">
                        <img src="${modelo.imagem}" alt="${modelo.nome}">
                    </div>
                    <div class="model-name">${modelo.nome}</div>
                    <div class="model-category">${modelo.categoria}</div>
                    
                    <div class="flex justify-between mb-md">
                        <span>Custo:</span>
                        <span class="font-semibold">${utils.formatarMoeda(modelo.custo)}</span>
                    </div>
                    
                    <div class="flex justify-between mb-md">
                        <span>Margem:</span>
                        <span class="font-semibold">${modelo.margem}%</span>
                    </div>
                    
                    <div class="flex justify-between mb-md">
                        <span>Preço:</span>
                        <span class="font-bold text-primary">${utils.formatarMoeda(modelo.preco)}</span>
                    </div>
                    
                    <div class="card-footer">
                        <div class="flex justify-between">
                            <button class="btn btn-secondary btn-editar">
                                <i class="fas fa-edit"></i>
                                Editar
                            </button>
                            <button class="btn btn-outline btn-simular">
                                <i class="fas fa-calculator"></i>
                                Simular
                            </button>
                        </div>
                    </div>
                `;
                
                cardGrid.appendChild(card);
                
                // Adicionar eventos aos botões
                const btnEditar = card.querySelector('.btn-editar');
                const btnSimular = card.querySelector('.btn-simular');
                
                btnEditar.addEventListener('click', () => editarModelo(modelo.id));
                btnSimular.addEventListener('click', () => simularModelo(modelo.id));
            });
        }
    }
    
    // Inicializar a página
    inicializarModelos();
});
