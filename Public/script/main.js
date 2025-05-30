// VEEX - Sistema de Gestão de Custos e Produção
// main.js - Arquivo JavaScript principal

// Dados globais do aplicativo
const appData = {
    modelos: [
        {
            id: 1,
            nome: "Tênis Esportivo",
            categoria: "Esportivo",
            imagem: "https://via.placeholder.com/150",
            custo: 95.00,
            margem: 25,
            preco: 119.00,
            insumos: [
                { id: 1, nome: "Couro", quantidade: 0.5, unidade: "m²", custo: 40.00 },
                { id: 2, nome: "Borracha", quantidade: 0.3, unidade: "kg", custo: 15.00 },
                { id: 3, nome: "Cadarço", quantidade: 1, unidade: "par", custo: 5.00 },
                { id: 5, nome: "Cola", quantidade: 0.1, unidade: "L", custo: 3.00 },
                { id: 6, nome: "Palmilha", quantidade: 1, unidade: "par", custo: 8.00 },
                { id: 7, nome: "Linha", quantidade: 10, unidade: "m", custo: 2.00 }
            ]
        },
        {
            id: 2,
            nome: "Sandália Casual",
            categoria: "Casual",
            imagem: "https://via.placeholder.com/150",
            custo: 66.00,
            margem: 30,
            preco: 86.00,
            insumos: [
                { id: 1, nome: "Couro", quantidade: 0.3, unidade: "m²", custo: 24.00 },
                { id: 2, nome: "Borracha", quantidade: 0.2, unidade: "kg", custo: 9.00 },
                { id: 4, nome: "Fivela", quantidade: 2, unidade: "un", custo: 12.00 },
                { id: 5, nome: "Cola", quantidade: 0.05, unidade: "L", custo: 1.50 },
                { id: 6, nome: "Palmilha", quantidade: 1, unidade: "par", custo: 8.00 },
                { id: 7, nome: "Linha", quantidade: 5, unidade: "m", custo: 1.00 }
            ]
        },
        {
            id: 3,
            nome: "Sapato Social",
            categoria: "Social",
            imagem: "https://via.placeholder.com/150",
            custo: 112.00,
            margem: 20,
            preco: 135.00,
            insumos: [
                { id: 1, nome: "Couro", quantidade: 0.6, unidade: "m²", custo: 48.00 },
                { id: 2, nome: "Borracha", quantidade: 0.2, unidade: "kg", custo: 9.00 },
                { id: 5, nome: "Cola", quantidade: 0.1, unidade: "L", custo: 3.00 },
                { id: 6, nome: "Palmilha", quantidade: 1, unidade: "par", custo: 12.00 },
                { id: 7, nome: "Linha", quantidade: 15, unidade: "m", custo: 3.00 },
                { id: 8, nome: "Solado de Couro", quantidade: 1, unidade: "par", custo: 25.00 }
            ]
        },
        {
            id: 4,
            nome: "Bota Feminina",
            categoria: "Feminino",
            imagem: "https://via.placeholder.com/150",
            custo: 135.00,
            margem: 25,
            preco: 169.00,
            insumos: [
                { id: 1, nome: "Couro", quantidade: 0.8, unidade: "m²", custo: 64.00 },
                { id: 2, nome: "Borracha", quantidade: 0.3, unidade: "kg", custo: 13.50 },
                { id: 4, nome: "Fivela", quantidade: 2, unidade: "un", custo: 14.00 },
                { id: 5, nome: "Cola", quantidade: 0.15, unidade: "L", custo: 4.50 },
                { id: 6, nome: "Palmilha", quantidade: 1, unidade: "par", custo: 10.00 },
                { id: 7, nome: "Linha", quantidade: 20, unidade: "m", custo: 4.00 },
                { id: 9, nome: "Zíper", quantidade: 2, unidade: "un", custo: 8.00 }
            ]
        }
    ],
    insumos: [
        { id: 1, nome: "Couro", tipo: "Matéria-prima", unidade: "m²", preco: 80.00, estoque: 120, estoqueMinimo: 50, status: "OK" },
        { id: 2, nome: "Borracha", tipo: "Matéria-prima", unidade: "kg", preco: 45.00, estoque: 80, estoqueMinimo: 30, status: "OK" },
        { id: 3, nome: "Tecido", tipo: "Matéria-prima", unidade: "m", preco: 25.00, estoque: 15, estoqueMinimo: 20, status: "Baixo" },
        { id: 4, nome: "Fivela", tipo: "Componente", unidade: "un", preco: 7.00, estoque: 200, estoqueMinimo: 100, status: "OK" },
        { id: 5, nome: "Cola", tipo: "Componente", unidade: "L", preco: 30.00, estoque: 25, estoqueMinimo: 10, status: "OK" },
        { id: 6, nome: "Palmilha", tipo: "Componente", unidade: "par", preco: 10.00, estoque: 150, estoqueMinimo: 50, status: "OK" },
        { id: 7, nome: "Linha", tipo: "Componente", unidade: "m", preco: 0.20, estoque: 1000, estoqueMinimo: 500, status: "OK" },
        { id: 8, nome: "Solado de Couro", tipo: "Componente", unidade: "par", preco: 25.00, estoque: 40, estoqueMinimo: 20, status: "OK" },
        { id: 9, nome: "Zíper", tipo: "Componente", unidade: "un", preco: 4.00, estoque: 120, estoqueMinimo: 50, status: "OK" },
        { id: 10, nome: "Cadarço", tipo: "Componente", unidade: "par", preco: 5.00, estoque: 50, estoqueMinimo: 100, status: "Baixo" },
        { id: 11, nome: "Caixa", tipo: "Embalagem", unidade: "un", preco: 3.00, estoque: 30, estoqueMinimo: 50, status: "Baixo" }
    ],
    custosFixos: [
        { id: 1, descricao: "Aluguel do Galpão", categoria: "Aluguel", valor: 3500.00, vencimento: "2025-05-05", status: "Pago" },
        { id: 2, descricao: "Salários", categoria: "Pessoal", valor: 2800.00, vencimento: "2025-05-10", status: "Pago" },
        { id: 3, descricao: "Energia Elétrica", categoria: "Serviços", valor: 850.00, vencimento: "2025-05-15", status: "Pago" },
        { id: 4, descricao: "Água", categoria: "Serviços", valor: 320.00, vencimento: "2025-05-20", status: "Pendente" },
        { id: 5, descricao: "Internet", categoria: "Serviços", valor: 180.00, vencimento: "2025-05-25", status: "Pendente" },
        { id: 6, descricao: "Contador", categoria: "Serviços", valor: 450.00, vencimento: "2025-05-28", status: "Pendente" },
        { id: 7, descricao: "Software de Gestão", categoria: "Outros", valor: 400.00, vencimento: "2025-05-30", status: "Pendente" }
    ],
    custosVariaveis: [
        { id: 1, descricao: "Comissão de Vendas", percentual: 5, valorMensal: 1200.00 },
        { id: 2, descricao: "Frete", percentual: 3, valorMensal: 720.00 },
        { id: 3, descricao: "Embalagens", percentual: 2, valorMensal: 480.00 },
        { id: 4, descricao: "Marketing", percentual: 4, valorMensal: 960.00 }
    ],
    producao: [
        { 
            id: 1, 
            data: "2025-05-30", 
            modelo: "Tênis Esportivo", 
            imagem: "https://via.placeholder.com/40",
            quantidade: 100, 
            custoUnitario: 95.00, 
            custoTotal: 9500.00, 
            status: "Concluído" 
        },
        { 
            id: 2, 
            data: "2025-05-28", 
            modelo: "Sandália Casual", 
            imagem: "https://via.placeholder.com/40",
            quantidade: 50, 
            custoUnitario: 66.00, 
            custoTotal: 3300.00, 
            status: "Concluído" 
        },
        { 
            id: 3, 
            data: "2025-05-25", 
            modelo: "Sapato Social", 
            imagem: "https://via.placeholder.com/40",
            quantidade: 75, 
            custoUnitario: 112.00, 
            custoTotal: 8400.00, 
            status: "Concluído" 
        },
        { 
            id: 4, 
            data: "2025-05-20", 
            modelo: "Bota Feminina", 
            imagem: "https://via.placeholder.com/40",
            quantidade: 25, 
            custoUnitario: 135.00, 
            custoTotal: 3375.00, 
            status: "Concluído" 
        },
        { 
            id: 5, 
            data: "2025-05-15", 
            modelo: "Tênis Esportivo", 
            imagem: "https://via.placeholder.com/40",
            quantidade: 150, 
            custoUnitario: 95.00, 
            custoTotal: 14250.00, 
            status: "Concluído" 
        }
    ],
    simulacoes: [
        { id: 1, data: "2025-05-30", modelo: "Tênis Esportivo", custo: 95.00, margem: 30, preco: 123.50 },
        { id: 2, data: "2025-05-29", modelo: "Sandália Casual", custo: 66.00, margem: 25, preco: 82.50 },
        { id: 3, data: "2025-05-28", modelo: "Sapato Social", custo: 112.00, margem: 40, preco: 156.80 }
    ],
    resumo: {
        producaoMes: 1250,
        custoMedioPar: 7.50,
        lucroTotal: 26000,
        insumos: 25000,
        custosFixos: 8500,
        custosVariaveis: 3250,
        custoTotal: 36750
    }
};

// Funções utilitárias
const utils = {
    formatarMoeda: function(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    
    formatarData: function(data) {
        if (!data) return '';
        const partes = data.split('-');
        if (partes.length !== 3) return data;
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    },
    
    calcularPreco: function(custo, margem) {
        return custo * (1 + margem / 100);
    },
    
    calcularLucro: function(custo, preco) {
        return preco - custo;
    },
    
    calcularMargemPercentual: function(custo, preco) {
        return ((preco - custo) / custo) * 100;
    },
    
    gerarId: function(array) {
        return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
    },
    
    filtrarArray: function(array, termo, campos) {
        if (!termo) return array;
        termo = termo.toLowerCase();
        return array.filter(item => {
            return campos.some(campo => {
                const valor = item[campo];
                if (typeof valor === 'string') {
                    return valor.toLowerCase().includes(termo);
                }
                return false;
            });
        });
    },
    
    ordenarArray: function(array, campo, ordem = 'asc') {
        return [...array].sort((a, b) => {
            let valorA = a[campo];
            let valorB = b[campo];
            
            if (typeof valorA === 'string') {
                valorA = valorA.toLowerCase();
                valorB = valorB.toLowerCase();
            }
            
            if (ordem === 'asc') {
                return valorA > valorB ? 1 : -1;
            } else {
                return valorA < valorB ? 1 : -1;
            }
        });
    }
};

// Funções para manipulação de dados
const dataManager = {
    // Modelos
    getModelos: function() {
        return appData.modelos;
    },
    
    getModeloPorId: function(id) {
        return appData.modelos.find(modelo => modelo.id === id);
    },
    
    adicionarModelo: function(modelo) {
        modelo.id = utils.gerarId(appData.modelos);
        appData.modelos.push(modelo);
        return modelo;
    },
    
    atualizarModelo: function(id, dadosAtualizados) {
        const index = appData.modelos.findIndex(modelo => modelo.id === id);
        if (index !== -1) {
            appData.modelos[index] = { ...appData.modelos[index], ...dadosAtualizados };
            return appData.modelos[index];
        }
        return null;
    },
    
    removerModelo: function(id) {
        const index = appData.modelos.findIndex(modelo => modelo.id === id);
        if (index !== -1) {
            appData.modelos.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Insumos
    getInsumos: function() {
        return appData.insumos;
    },
    
    getInsumoPorId: function(id) {
        return appData.insumos.find(insumo => insumo.id === id);
    },
    
    adicionarInsumo: function(insumo) {
        insumo.id = utils.gerarId(appData.insumos);
        appData.insumos.push(insumo);
        return insumo;
    },
    
    atualizarInsumo: function(id, dadosAtualizados) {
        const index = appData.insumos.findIndex(insumo => insumo.id === id);
        if (index !== -1) {
            appData.insumos[index] = { ...appData.insumos[index], ...dadosAtualizados };
            return appData.insumos[index];
        }
        return null;
    },
    
    removerInsumo: function(id) {
        const index = appData.insumos.findIndex(insumo => insumo.id === id);
        if (index !== -1) {
            appData.insumos.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Custos Fixos
    getCustosFixos: function() {
        return appData.custosFixos;
    },
    
    getCustoFixoPorId: function(id) {
        return appData.custosFixos.find(custo => custo.id === id);
    },
    
    adicionarCustoFixo: function(custo) {
        custo.id = utils.gerarId(appData.custosFixos);
        appData.custosFixos.push(custo);
        return custo;
    },
    
    atualizarCustoFixo: function(id, dadosAtualizados) {
        const index = appData.custosFixos.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosFixos[index] = { ...appData.custosFixos[index], ...dadosAtualizados };
            return appData.custosFixos[index];
        }
        return null;
    },
    
    removerCustoFixo: function(id) {
        const index = appData.custosFixos.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosFixos.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Custos Variáveis
    getCustosVariaveis: function() {
        return appData.custosVariaveis;
    },
    
    getCustoVariavelPorId: function(id) {
        return appData.custosVariaveis.find(custo => custo.id === id);
    },
    
    adicionarCustoVariavel: function(custo) {
        custo.id = utils.gerarId(appData.custosVariaveis);
        appData.custosVariaveis.push(custo);
        return custo;
    },
    
    atualizarCustoVariavel: function(id, dadosAtualizados) {
        const index = appData.custosVariaveis.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosVariaveis[index] = { ...appData.custosVariaveis[index], ...dadosAtualizados };
            return appData.custosVariaveis[index];
        }
        return null;
    },
    
    removerCustoVariavel: function(id) {
        const index = appData.custosVariaveis.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosVariaveis.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Produção
    getProducao: function() {
        return appData.producao;
    },
    
    getProducaoPorId: function(id) {
        return appData.producao.find(prod => prod.id === id);
    },
    
    adicionarProducao: function(producao) {
        producao.id = utils.gerarId(appData.producao);
        appData.producao.push(producao);
        return producao;
    },
    
    atualizarProducao: function(id, dadosAtualizados) {
        const index = appData.producao.findIndex(prod => prod.id === id);
        if (index !== -1) {
            appData.producao[index] = { ...appData.producao[index], ...dadosAtualizados };
            return appData.producao[index];
        }
        return null;
    },
    
    removerProducao: function(id) {
        const index = appData.producao.findIndex(prod => prod.id === id);
        if (index !== -1) {
            appData.producao.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Simulações
    getSimulacoes: function() {
        return appData.simulacoes;
    },
    
    adicionarSimulacao: function(simulacao) {
        simulacao.id = utils.gerarId(appData.simulacoes);
        simulacao.data = new Date().toISOString().split('T')[0];
        appData.simulacoes.push(simulacao);
        return simulacao;
    },
    
    removerSimulacao: function(id) {
        const index = appData.simulacoes.findIndex(sim => sim.id === id);
        if (index !== -1) {
            appData.simulacoes.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Resumo
    getResumo: function() {
        return appData.resumo;
    },
    
    atualizarResumo: function() {
        // Aqui seria implementada a lógica para recalcular o resumo com base nos dados atuais
        // Por simplicidade, estamos mantendo os valores estáticos
        return appData.resumo;
    }
};

// Funções para manipulação da interface
const uiManager = {
    // Funções gerais
    inicializarSidebar: function() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                
                if (sidebar.classList.contains('collapsed')) {
                    sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
                } else {
                    sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
                }
            });
        }
        
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
            
            // Fechar sidebar ao clicar fora em dispositivos móveis
            document.addEventListener('click', (e) => {
                if (window.innerWidth < 992) {
                    if (!sidebar.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        }
    },
    
    inicializarBadges: function() {
        document.querySelectorAll('.badge').forEach(badge => {
            if (badge.classList.contains('bg-success')) {
                badge.style.backgroundColor = 'var(--color-accent-success)';
                badge.style.color = 'white';
                badge.style.padding = '3px 8px';
                badge.style.borderRadius = 'var(--border-radius-full)';
                badge.style.fontSize = 'var(--font-size-xs)';
                badge.style.fontWeight = 'var(--font-weight-medium)';
            } else if (badge.classList.contains('bg-warning')) {
                badge.style.backgroundColor = 'var(--color-accent-warning)';
                badge.style.color = '#212529';
                badge.style.padding = '3px 8px';
                badge.style.borderRadius = 'var(--border-radius-full)';
                badge.style.fontSize = 'var(--font-size-xs)';
                badge.style.fontWeight = 'var(--font-weight-medium)';
            }
        });
    },
    
    inicializarModal: function(modalId, btnAbrirId, btnFecharId, btnCancelarId) {
        const modal = document.getElementById(modalId);
        const btnAbrir = document.getElementById(btnAbrirId);
        const btnFechar = document.getElementById(btnFecharId);
        const btnCancelar = document.getElementById(btnCancelarId);
        
        if (!modal || !btnAbrir) return;
        
        btnAbrir.addEventListener('click', () => {
            modal.classList.add('show');
            modal.querySelector('.modal').classList.add('show');
        });
        
        function fecharModal() {
            modal.classList.remove('show');
            modal.querySelector('.modal').classList.remove('show');
        }
        
        if (btnFechar) {
            btnFechar.addEventListener('click', fecharModal);
        }
        
        if (btnCancelar) {
            btnCancelar.addEventListener('click', fecharModal);
        }
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });
    },
    
    // Funções específicas para cada página
    inicializarDashboard: function() {
        const margemLucro = document.getElementById('margem-lucro');
        const margemValor = document.getElementById('margem-valor');
        const precoSugerido = document.getElementById('preco-sugerido');
        
        if (margemLucro && margemValor && precoSugerido) {
            margemLucro.addEventListener('input', () => {
                const margem = margemLucro.value;
                margemValor.textContent = `${margem}%`;
                
                // Cálculo simplificado para demonstração
                const custoBase = 140;
                const preco = utils.calcularPreco(custoBase, margem);
                precoSugerido.textContent = utils.formatarMoeda(preco);
            });
        }
    },
    
    inicializarCalculadora: function() {
        const margemLucro = document.getElementById('margem-lucro');
        const margemValor = document.getElementById('margem-valor');
        const custoProducao = document.getElementById('custo-producao');
        const precoSugerido = document.getElementById('preco-sugerido');
        const lucroUnidade = document.getElementById('lucro-unidade');
        const lucroPercentual = document.getElementById('lucro-percentual');
        const selectModelo = document.getElementById('select-modelo');
        
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
            }
        }
        
        if (margemLucro && custoProducao) {
            margemLucro.addEventListener('input', calcularPreco);
            custoProducao.addEventListener('input', calcularPreco);
        }
        
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
                
                if (custo > 0) {
                    custoProducao.value = custo.toFixed(2).replace('.', ',');
                    calcularPreco();
                }
            });
        }
        
        // Inicializar calculadora
        if (custoProducao && margemLucro) {
            calcularPreco();
        }
    },
    
    inicializarModelos: function() {
        // Inicializar modal de novo modelo
        this.inicializarModal('modal-novo-modelo', 'btn-novo-modelo', 'modal-close', 'btn-cancelar');
    },
    
    inicializarInsumos: function() {
        // Inicializar modal de novo insumo
        this.inicializarModal('modal-novo-insumo', 'btn-novo-insumo', 'modal-close', 'btn-cancelar');
    },
    
    inicializarCustosFixos: function() {
        // Inicializar modal de novo custo fixo
        this.inicializarModal('modal-novo-custo', 'btn-novo-custo', 'modal-close', 'btn-cancelar');
    },
    
    inicializarProducao: function() {
        // Inicializar modal de nova produção
        this.inicializarModal('modal-nova-producao', 'btn-nova-producao', 'modal-close', 'btn-cancelar');
    }
};

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes comuns
    uiManager.inicializarSidebar();
    uiManager.inicializarBadges();
    
    // Detectar página atual e inicializar componentes específicos
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'dashboard.html':
            uiManager.inicializarDashboard();
            break;
        case 'modelos.html':
            uiManager.inicializarModelos();
            break;
        case 'insumos.html':
            uiManager.inicializarInsumos();
            break;
        case 'custos-fixos.html':
            uiManager.inicializarCustosFixos();
            break;
        case 'producao.html':
            uiManager.inicializarProducao();
            break;
        case 'calculadora.html':
            uiManager.inicializarCalculadora();
            break;
    }
    
    // Inicializar gráficos (simulação)
    if (typeof Chart !== 'undefined') {
        // Aqui seriam inicializados os gráficos com Chart.js
        console.log('Chart.js disponível para inicialização de gráficos');
    }
});
