// VEEX - Sistema de Gestão de Custos e Produção
// charts.js - Módulo para criação e gerenciamento de gráficos

const chartManager = {
    // Inicializar gráficos do dashboard
    inicializarGraficosDashboard: function() {
        // Verificar se Chart.js está disponível
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js não está disponível. Os gráficos não serão renderizados.');
            return;
        }
        
        // Gráfico de distribuição de custos
        this.criarGraficoPieCustos('chart-distribuicao-custos', [
            appData.resumo.insumos,
            appData.resumo.custosFixos,
            appData.resumo.custosVariaveis
        ]);
        
        // Gráfico de produção mensal
        this.criarGraficoLinhaProducao('chart-producao-mensal');
    },
    
    // Inicializar gráficos da página de custos fixos
    inicializarGraficosCustosFixos: function() {
        if (typeof Chart === 'undefined') return;
        
        // Gráfico de evolução dos custos fixos
        this.criarGraficoLinhaCustosFixos('chart-evolucao-custos');
        
        // Gráfico de distribuição por categoria
        this.criarGraficoPieDistribuicaoCategorias('chart-distribuicao-categorias');
    },
    
    // Inicializar gráficos da página de produção
    inicializarGraficosProducao: function() {
        if (typeof Chart === 'undefined') return;
        
        // Gráfico de produção por modelo
        this.criarGraficoPieProducaoPorModelo('chart-producao-modelo');
        
        // Gráfico de evolução da produção
        this.criarGraficoLinhaEvolucaoProducao('chart-evolucao-producao');
    },
    
    // Inicializar gráfico da calculadora
    inicializarGraficoCalculadora: function(custo, preco) {
        if (typeof Chart === 'undefined') return;
        
        // Gráfico de composição do preço
        this.criarGraficoPieComposicaoPreco('chart-composicao-preco', custo, preco);
    },
    
    // Criar gráfico de pizza para distribuição de custos
    criarGraficoPieCustos: function(elementId, dados) {
        const canvas = document.getElementById(elementId);
        if (!canvas) return;
        
        // Destruir gráfico anterior se existir
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        // Criar novo gráfico
        canvas.chart = new Chart(canvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Insumos', 'Custos Fixos', 'Custos Variáveis'],
                datasets: [{
                    data: dados,
                    backgroundColor: ['#ff6b9d', '#9d4edd', '#5a189a']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${utils.formatarMoeda(value)}`;
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Criar gráfico de linha para produção mensal
    criarGraficoLinhaProducao: function(elementId) {
        const canvas = document.getElementById(elementId);
        if (!canvas) return;
        
        // Destruir gráfico anterior se existir
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        // Dados simulados para demonstração
        const meses = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
        const dados = [800, 950, 1100, 980, 1250, 0];
        
        // Criar novo gráfico
        canvas.chart = new Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Produção Mensal',
                    data: dados,
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    },
    
    // Criar gráfico de linha para evolução dos custos fixos
    criarGraficoLinhaCustosFixos: function(elementId) {
        const canvas = document.getElementById(elementId);
        if (!canvas) return;
        
        // Destruir gráfico anterior se existir
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        // Dados simulados para demonstração
        const meses = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
        const dados = [7800, 8100, 8200, 8300, 8400, 8500];
        
        // Criar novo gráfico
        canvas.chart = new Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Custos Fixos',
                    data: dados,
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                return utils.formatarMoeda(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${utils.formatarMoeda(value)}`;
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Criar gráfico de pizza para distribuição por categoria
    criarGraficoPieDistribuicaoCategorias: function(elementId) {
        const canvas = document.getElementById(elementId);
        if (!canvas) return;
        
        // Destruir gráfico anterior se existir
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        // Agrupar custos fixos por categoria
        const custosFixos = dataManager.getCustosFixos();
        const categorias = {};
        custosFixos.forEach(custo => {
            if (!categorias[custo.categoria]) {
                categorias[custo.categoria] = 0;
            }
            categorias[custo.categoria] += custo.valor;
        });
        
        // Preparar dados para o gráfico
        const labels = Object.keys(categorias);
        const dados = Object.values(categorias);
        const cores = ['#ff6b9d', '#9d4edd', '#5a189a', '#3c096c', '#240046'];
        
        // Criar novo gráfico
        canvas.chart = new Chart(canvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dados,
                    backgroundColor: cores.slice(0, labels.length)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${utils.formatarMoeda(value)}`;
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Criar gráfico de pizza para produção por modelo
    criarGraficoPieProducaoPorModelo: function(elementId) {
        const canvas = document.getElementById(elementId);
        if (!canvas) return;
        
        // Destruir gráfico anterior se existir
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        // Agrupar produção por modelo
        const producao = dataManager.getProducao();
        const modelos = {};
        producao.forEach(prod => {
            if (!modelos[prod.modelo]) {
                modelos[prod.modelo] = 0;
            }
            modelos[prod.modelo] += prod.quantidade;
        });
        
        // Preparar dados para o gráfico
        const labels = Object.keys(modelos);
        const dados = Object.values(modelos);
        const cores = ['#ff6b9d', '#9d4edd', '#5a189a', '#3c096c', '#240046'];
        
        // Criar novo gráfico
        canvas.chart = new Chart(canvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dados,
                    backgroundColor: cores.slice(0, labels.length)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value} pares`;
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Criar gráfico de linha para evolução da produção
    criarGraficoLinhaEvolucaoProducao: function(elementId) {
        const canvas = document.getElementById(elementId);
        if (!canvas) return;
        
        // Destruir gráfico anterior se existir
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        // Dados simulados para demonstração
        const meses = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
        const dados = [800, 950, 1100, 980, 1250, 0];
        
        // Criar novo gráfico
        canvas.chart = new Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Produção Mensal',
                    data: dados,
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    },
    
    // Criar gráfico de pizza para composição do preço
    criarGraficoPieComposicaoPreco: function(elementId, custo, preco) {
        const canvas = document.getElementById(elementId);
        if (!canvas) return;
        
        // Destruir gráfico anterior se existir
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        
        // Calcular lucro
        const lucro = preco - custo;
        
        // Criar novo gráfico
        canvas.chart = new Chart(canvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Custo', 'Lucro'],
                datasets: [{
                    data: [custo, lucro],
                    backgroundColor: ['#5a189a', '#ff6b9d']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${utils.formatarMoeda(value)}`;
                            }
                        }
                    }
                }
            }
        });
    }
};

// Adicionar chartManager ao escopo global
window.chartManager = chartManager;
