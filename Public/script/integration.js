// VEEX - Sistema de Gestão de Custos e Produção
// integration.js - Módulo para integração entre componentes e testes

const integrationManager = {
    // Inicializar integração entre componentes
    inicializar: function() {
        // Registrar eventos de integração entre páginas
        this.registrarEventosIntegracao();
        
        // Verificar consistência dos dados
        this.verificarConsistenciaDados();
        
        // Inicializar notificações do sistema
        this.inicializarNotificacoes();
        
        console.log('Integração entre componentes inicializada com sucesso');
    },
    
    // Registrar eventos de integração entre páginas
    registrarEventosIntegracao: function() {
        // Integração entre modelos e calculadora
        document.querySelectorAll('.btn-simular').forEach(btn => {
            btn.addEventListener('click', function() {
                const modeloId = this.closest('[data-id]').dataset.id;
                window.location.href = `calculadora.html?modelo=${modeloId}`;
            });
        });
        
        // Integração entre insumos e produção
        document.querySelectorAll('.btn-consumo').forEach(btn => {
            btn.addEventListener('click', function() {
                const insumoId = this.closest('[data-id]').dataset.id;
                window.location.href = `producao.html?insumo=${insumoId}`;
            });
        });
        
        // Integração entre custos fixos e dashboard
        document.querySelectorAll('.btn-resumo').forEach(btn => {
            btn.addEventListener('click', function() {
                window.location.href = 'dashboard.html#resumo-custos';
            });
        });
    },
    
    // Verificar consistência dos dados
    verificarConsistenciaDados: function() {
        // Verificar se há insumos com estoque baixo
        const insumosEstoqueBaixo = dataManager.getInsumos().filter(insumo => insumo.status === 'Baixo');
        
        // Verificar se há custos fixos pendentes
        const custosPendentes = dataManager.getCustosFixos().filter(custo => custo.status === 'Pendente');
        
        // Armazenar alertas para exibição
        this.alertas = {
            insumosEstoqueBaixo: insumosEstoqueBaixo,
            custosPendentes: custosPendentes
        };
        
        // Recalcular resumo para garantir consistência
        dataManager.recalcularResumo();
        
        return {
            insumosEstoqueBaixo: insumosEstoqueBaixo,
            custosPendentes: custosPendentes
        };
    },
    
    // Inicializar notificações do sistema
    inicializarNotificacoes: function() {
        // Verificar se há alertas para exibir
        const { insumosEstoqueBaixo, custosPendentes } = this.alertas || this.verificarConsistenciaDados();
        
        // Criar elemento de notificação
        const notificacaoContainer = document.createElement('div');
        notificacaoContainer.className = 'notificacao-container';
        document.body.appendChild(notificacaoContainer);
        
        // Exibir notificações de estoque baixo
        if (insumosEstoqueBaixo.length > 0) {
            this.exibirNotificacao(
                'Alerta de Estoque',
                `${insumosEstoqueBaixo.length} insumos estão com estoque abaixo do mínimo.`,
                'warning'
            );
        }
        
        // Exibir notificações de custos pendentes
        if (custosPendentes.length > 0) {
            this.exibirNotificacao(
                'Custos Pendentes',
                `${custosPendentes.length} custos fixos estão pendentes de pagamento.`,
                'info'
            );
        }
    },
    
    // Exibir notificação
    exibirNotificacao: function(titulo, mensagem, tipo = 'info') {
        const notificacaoContainer = document.querySelector('.notificacao-container');
        if (!notificacaoContainer) return;
        
        // Criar elemento de notificação
        const notificacao = document.createElement('div');
        notificacao.className = `notificacao notificacao-${tipo}`;
        
        // Adicionar conteúdo
        notificacao.innerHTML = `
            <div class="notificacao-header">
                <h4>${titulo}</h4>
                <button class="btn-fechar"><i class="fas fa-times"></i></button>
            </div>
            <div class="notificacao-body">
                <p>${mensagem}</p>
            </div>
        `;
        
        // Adicionar ao container
        notificacaoContainer.appendChild(notificacao);
        
        // Adicionar evento para fechar notificação
        const btnFechar = notificacao.querySelector('.btn-fechar');
        btnFechar.addEventListener('click', () => {
            notificacao.classList.add('fechando');
            setTimeout(() => {
                notificacao.remove();
            }, 300);
        });
        
        // Auto-fechar após 5 segundos
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.classList.add('fechando');
                setTimeout(() => {
                    if (notificacao.parentNode) {
                        notificacao.remove();
                    }
                }, 300);
            }
        }, 5000);
    },
    
    // Executar testes de integração
    executarTestes: function() {
        console.log('Iniciando testes de integração...');
        
        // Testar persistência local
        this.testarPersistenciaLocal();
        
        // Testar integração entre modelos e insumos
        this.testarIntegracaoModelosInsumos();
        
        // Testar cálculos de custos
        this.testarCalculosCustos();
        
        // Testar simulações de preços
        this.testarSimulacoesPrecos();
        
        console.log('Testes de integração concluídos com sucesso!');
    },
    
    // Testar persistência local
    testarPersistenciaLocal: function() {
        console.log('Testando persistência local...');
        
        // Salvar dados atuais
        const modelosAntes = dataManager.getModelos().length;
        
        // Adicionar novo modelo para teste
        const novoModelo = {
            nome: "Modelo de Teste",
            categoria: "Teste",
            imagem: "https://via.placeholder.com/150",
            custo: 100.00,
            margem: 20,
            preco: 120.00,
            insumos: []
        };
        
        dataManager.adicionarModelo(novoModelo);
        
        // Verificar se foi salvo corretamente
        const modelosDepois = dataManager.getModelos().length;
        
        console.log(`Modelos antes: ${modelosAntes}, Modelos depois: ${modelosDepois}`);
        console.assert(modelosDepois === modelosAntes + 1, 'Falha no teste de persistência local');
        
        // Remover modelo de teste
        const ultimoModelo = dataManager.getModelos()[dataManager.getModelos().length - 1];
        dataManager.removerModelo(ultimoModelo.id);
        
        // Verificar se foi removido corretamente
        const modelosFinal = dataManager.getModelos().length;
        console.log(`Modelos final: ${modelosFinal}`);
        console.assert(modelosFinal === modelosAntes, 'Falha no teste de remoção');
        
        console.log('Teste de persistência local concluído');
    },
    
    // Testar integração entre modelos e insumos
    testarIntegracaoModelosInsumos: function() {
        console.log('Testando integração entre modelos e insumos...');
        
        // Verificar se todos os insumos referenciados nos modelos existem
        const modelos = dataManager.getModelos();
        const insumos = dataManager.getInsumos();
        
        let insumosValidos = true;
        
        modelos.forEach(modelo => {
            if (modelo.insumos) {
                modelo.insumos.forEach(insumoModelo => {
                    const insumoExiste = insumos.some(insumo => insumo.id === insumoModelo.id);
                    if (!insumoExiste) {
                        console.warn(`Insumo ID ${insumoModelo.id} referenciado no modelo "${modelo.nome}" não existe`);
                        insumosValidos = false;
                    }
                });
            }
        });
        
        console.assert(insumosValidos, 'Falha na integração entre modelos e insumos');
        console.log('Teste de integração entre modelos e insumos concluído');
    },
    
    // Testar cálculos de custos
    testarCalculosCustos: function() {
        console.log('Testando cálculos de custos...');
        
        // Verificar cálculo de custo total
        const custosFixos = dataManager.getCustosFixos().reduce((total, custo) => total + custo.valor, 0);
        const custosVariaveis = dataManager.getCustosVariaveis().reduce((total, custo) => total + custo.valorMensal, 0);
        const custoInsumos = dataManager.getInsumos().reduce((total, insumo) => total + (insumo.preco * insumo.estoque), 0);
        
        const custoTotalCalculado = custosFixos + custosVariaveis + custoInsumos;
        const custoTotalArmazenado = dataManager.getResumo().custoTotal;
        
        console.log(`Custo total calculado: ${custoTotalCalculado}, Custo total armazenado: ${custoTotalArmazenado}`);
        
        // Verificar cálculo de preço com margem
        const custoBase = 100;
        const margem = 20;
        const precoEsperado = 120;
        const precoCalculado = utils.calcularPreco(custoBase, margem);
        
        console.log(`Preço calculado: ${precoCalculado}, Preço esperado: ${precoEsperado}`);
        console.assert(precoCalculado === precoEsperado, 'Falha no cálculo de preço com margem');
        
        console.log('Teste de cálculos de custos concluído');
    },
    
    // Testar simulações de preços
    testarSimulacoesPrecos: function() {
        console.log('Testando simulações de preços...');
        
        // Salvar quantidade atual de simulações
        const simulacoesAntes = dataManager.getSimulacoes().length;
        
        // Criar nova simulação para teste
        const simulacao = {
            modelo: "Modelo de Teste",
            custo: 100.00,
            margem: 25,
            preco: 125.00
        };
        
        dataManager.adicionarSimulacao(simulacao);
        
        // Verificar se foi salva corretamente
        const simulacoesDepois = dataManager.getSimulacoes().length;
        
        console.log(`Simulações antes: ${simulacoesAntes}, Simulações depois: ${simulacoesDepois}`);
        console.assert(simulacoesDepois === simulacoesAntes + 1, 'Falha no teste de simulação de preços');
        
        // Remover simulação de teste
        const ultimaSimulacao = dataManager.getSimulacoes()[dataManager.getSimulacoes().length - 1];
        dataManager.removerSimulacao(ultimaSimulacao.id);
        
        // Verificar se foi removida corretamente
        const simulacoesFinal = dataManager.getSimulacoes().length;
        console.log(`Simulações final: ${simulacoesFinal}`);
        console.assert(simulacoesFinal === simulacoesAntes, 'Falha no teste de remoção de simulação');
        
        console.log('Teste de simulações de preços concluído');
    }
};

// Inicializar integração quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar integração entre componentes
    integrationManager.inicializar();
    
    // Executar testes de integração apenas em ambiente de desenvolvimento
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Descomentar para executar testes
        // integrationManager.executarTestes();
    }
});
