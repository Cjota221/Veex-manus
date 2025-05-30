// VEEX - Sistema de Gestão de Custos e Produção
// storage.js - Módulo para persistência local de dados

const storageManager = {
    // Chaves para armazenamento local
    KEYS: {
        MODELOS: 'veex_modelos',
        INSUMOS: 'veex_insumos',
        CUSTOS_FIXOS: 'veex_custos_fixos',
        CUSTOS_VARIAVEIS: 'veex_custos_variaveis',
        PRODUCAO: 'veex_producao',
        SIMULACOES: 'veex_simulacoes',
        RESUMO: 'veex_resumo'
    },
    
    // Inicializar armazenamento local com dados padrão
    inicializar: function() {
        // Verificar se já existem dados armazenados
        if (!this.getDados(this.KEYS.MODELOS)) {
            this.salvarDados(this.KEYS.MODELOS, appData.modelos);
        }
        
        if (!this.getDados(this.KEYS.INSUMOS)) {
            this.salvarDados(this.KEYS.INSUMOS, appData.insumos);
        }
        
        if (!this.getDados(this.KEYS.CUSTOS_FIXOS)) {
            this.salvarDados(this.KEYS.CUSTOS_FIXOS, appData.custosFixos);
        }
        
        if (!this.getDados(this.KEYS.CUSTOS_VARIAVEIS)) {
            this.salvarDados(this.KEYS.CUSTOS_VARIAVEIS, appData.custosVariaveis);
        }
        
        if (!this.getDados(this.KEYS.PRODUCAO)) {
            this.salvarDados(this.KEYS.PRODUCAO, appData.producao);
        }
        
        if (!this.getDados(this.KEYS.SIMULACOES)) {
            this.salvarDados(this.KEYS.SIMULACOES, appData.simulacoes);
        }
        
        if (!this.getDados(this.KEYS.RESUMO)) {
            this.salvarDados(this.KEYS.RESUMO, appData.resumo);
        }
        
        // Carregar dados do armazenamento local para o appData
        this.carregarDados();
    },
    
    // Salvar dados no armazenamento local
    salvarDados: function(chave, dados) {
        try {
            localStorage.setItem(chave, JSON.stringify(dados));
            return true;
        } catch (error) {
            console.error(`Erro ao salvar dados (${chave}):`, error);
            return false;
        }
    },
    
    // Obter dados do armazenamento local
    getDados: function(chave) {
        try {
            const dados = localStorage.getItem(chave);
            return dados ? JSON.parse(dados) : null;
        } catch (error) {
            console.error(`Erro ao obter dados (${chave}):`, error);
            return null;
        }
    },
    
    // Carregar todos os dados do armazenamento local para o appData
    carregarDados: function() {
        const modelos = this.getDados(this.KEYS.MODELOS);
        if (modelos) {
            appData.modelos = modelos;
        }
        
        const insumos = this.getDados(this.KEYS.INSUMOS);
        if (insumos) {
            appData.insumos = insumos;
        }
        
        const custosFixos = this.getDados(this.KEYS.CUSTOS_FIXOS);
        if (custosFixos) {
            appData.custosFixos = custosFixos;
        }
        
        const custosVariaveis = this.getDados(this.KEYS.CUSTOS_VARIAVEIS);
        if (custosVariaveis) {
            appData.custosVariaveis = custosVariaveis;
        }
        
        const producao = this.getDados(this.KEYS.PRODUCAO);
        if (producao) {
            appData.producao = producao;
        }
        
        const simulacoes = this.getDados(this.KEYS.SIMULACOES);
        if (simulacoes) {
            appData.simulacoes = simulacoes;
        }
        
        const resumo = this.getDados(this.KEYS.RESUMO);
        if (resumo) {
            appData.resumo = resumo;
        }
    },
    
    // Limpar todos os dados do armazenamento local
    limparDados: function() {
        Object.values(this.KEYS).forEach(chave => {
            localStorage.removeItem(chave);
        });
    }
};

// Estender o dataManager para usar o storageManager
const dataManagerExtended = {
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
        storageManager.salvarDados(storageManager.KEYS.MODELOS, appData.modelos);
        return modelo;
    },
    
    atualizarModelo: function(id, dadosAtualizados) {
        const index = appData.modelos.findIndex(modelo => modelo.id === id);
        if (index !== -1) {
            appData.modelos[index] = { ...appData.modelos[index], ...dadosAtualizados };
            storageManager.salvarDados(storageManager.KEYS.MODELOS, appData.modelos);
            return appData.modelos[index];
        }
        return null;
    },
    
    removerModelo: function(id) {
        const index = appData.modelos.findIndex(modelo => modelo.id === id);
        if (index !== -1) {
            appData.modelos.splice(index, 1);
            storageManager.salvarDados(storageManager.KEYS.MODELOS, appData.modelos);
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
        storageManager.salvarDados(storageManager.KEYS.INSUMOS, appData.insumos);
        return insumo;
    },
    
    atualizarInsumo: function(id, dadosAtualizados) {
        const index = appData.insumos.findIndex(insumo => insumo.id === id);
        if (index !== -1) {
            appData.insumos[index] = { ...appData.insumos[index], ...dadosAtualizados };
            storageManager.salvarDados(storageManager.KEYS.INSUMOS, appData.insumos);
            return appData.insumos[index];
        }
        return null;
    },
    
    removerInsumo: function(id) {
        const index = appData.insumos.findIndex(insumo => insumo.id === id);
        if (index !== -1) {
            appData.insumos.splice(index, 1);
            storageManager.salvarDados(storageManager.KEYS.INSUMOS, appData.insumos);
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
        storageManager.salvarDados(storageManager.KEYS.CUSTOS_FIXOS, appData.custosFixos);
        return custo;
    },
    
    atualizarCustoFixo: function(id, dadosAtualizados) {
        const index = appData.custosFixos.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosFixos[index] = { ...appData.custosFixos[index], ...dadosAtualizados };
            storageManager.salvarDados(storageManager.KEYS.CUSTOS_FIXOS, appData.custosFixos);
            return appData.custosFixos[index];
        }
        return null;
    },
    
    removerCustoFixo: function(id) {
        const index = appData.custosFixos.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosFixos.splice(index, 1);
            storageManager.salvarDados(storageManager.KEYS.CUSTOS_FIXOS, appData.custosFixos);
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
        storageManager.salvarDados(storageManager.KEYS.CUSTOS_VARIAVEIS, appData.custosVariaveis);
        return custo;
    },
    
    atualizarCustoVariavel: function(id, dadosAtualizados) {
        const index = appData.custosVariaveis.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosVariaveis[index] = { ...appData.custosVariaveis[index], ...dadosAtualizados };
            storageManager.salvarDados(storageManager.KEYS.CUSTOS_VARIAVEIS, appData.custosVariaveis);
            return appData.custosVariaveis[index];
        }
        return null;
    },
    
    removerCustoVariavel: function(id) {
        const index = appData.custosVariaveis.findIndex(custo => custo.id === id);
        if (index !== -1) {
            appData.custosVariaveis.splice(index, 1);
            storageManager.salvarDados(storageManager.KEYS.CUSTOS_VARIAVEIS, appData.custosVariaveis);
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
        storageManager.salvarDados(storageManager.KEYS.PRODUCAO, appData.producao);
        return producao;
    },
    
    atualizarProducao: function(id, dadosAtualizados) {
        const index = appData.producao.findIndex(prod => prod.id === id);
        if (index !== -1) {
            appData.producao[index] = { ...appData.producao[index], ...dadosAtualizados };
            storageManager.salvarDados(storageManager.KEYS.PRODUCAO, appData.producao);
            return appData.producao[index];
        }
        return null;
    },
    
    removerProducao: function(id) {
        const index = appData.producao.findIndex(prod => prod.id === id);
        if (index !== -1) {
            appData.producao.splice(index, 1);
            storageManager.salvarDados(storageManager.KEYS.PRODUCAO, appData.producao);
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
        storageManager.salvarDados(storageManager.KEYS.SIMULACOES, appData.simulacoes);
        return simulacao;
    },
    
    removerSimulacao: function(id) {
        const index = appData.simulacoes.findIndex(sim => sim.id === id);
        if (index !== -1) {
            appData.simulacoes.splice(index, 1);
            storageManager.salvarDados(storageManager.KEYS.SIMULACOES, appData.simulacoes);
            return true;
        }
        return false;
    },
    
    // Resumo
    getResumo: function() {
        return appData.resumo;
    },
    
    atualizarResumo: function(dadosAtualizados) {
        appData.resumo = { ...appData.resumo, ...dadosAtualizados };
        storageManager.salvarDados(storageManager.KEYS.RESUMO, appData.resumo);
        return appData.resumo;
    },
    
    // Recalcular resumo com base nos dados atuais
    recalcularResumo: function() {
        // Calcular produção total
        const producaoTotal = appData.producao.reduce((total, prod) => total + prod.quantidade, 0);
        
        // Calcular custo total
        const custoInsumos = appData.insumos.reduce((total, insumo) => total + (insumo.preco * insumo.estoque), 0);
        const custoFixoTotal = appData.custosFixos.reduce((total, custo) => total + custo.valor, 0);
        const custoVariavelTotal = appData.custosVariaveis.reduce((total, custo) => total + custo.valorMensal, 0);
        const custoTotal = custoInsumos + custoFixoTotal + custoVariavelTotal;
        
        // Calcular custo médio por par
        const custoMedioPar = producaoTotal > 0 ? custoTotal / producaoTotal : 0;
        
        // Calcular lucro total (simulado)
        const lucroTotal = 26000; // Valor fixo para demonstração
        
        // Atualizar resumo
        const resumoAtualizado = {
            producaoMes: producaoTotal,
            custoMedioPar: custoMedioPar,
            lucroTotal: lucroTotal,
            insumos: custoInsumos,
            custosFixos: custoFixoTotal,
            custosVariaveis: custoVariavelTotal,
            custoTotal: custoTotal
        };
        
        return this.atualizarResumo(resumoAtualizado);
    }
};

// Substituir o dataManager original pelo estendido
Object.assign(dataManager, dataManagerExtended);

// Inicializar armazenamento local quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar armazenamento local
    storageManager.inicializar();
});
