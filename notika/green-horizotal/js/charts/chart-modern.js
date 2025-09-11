/**
 * Modern Chart.js Implementation
 * Replaces legacy Flot Charts with Chart.js 4.x
 */

(function() {
    'use strict';

    // Wait for DOM and Chart.js to be ready
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }

        // Configure Chart.js defaults
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.plugins.legend.position = 'bottom';
        
        // Modern color palette
        const colors = {
            primary: '#00c292',
            secondary: '#03a9f3',
            success: '#00c292',
            warning: '#ff9800',
            danger: '#e91e63',
            info: '#03a9f3',
            light: '#f8f9fa',
            dark: '#343a40'
        };

        // Helper function to generate gradient
        function createGradient(ctx, colorStart, colorEnd) {
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, colorStart);
            gradient.addColorStop(1, colorEnd);
            return gradient;
        }

        // 1. Sales Statistics Chart (curved line chart)
        const salesChart = document.getElementById('curved-line-chart');
        if (salesChart) {
            const ctx = salesChart.getContext('2d');
            const gradient = createGradient(ctx, 'rgba(0, 194, 146, 0.8)', 'rgba(0, 194, 146, 0.1)');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Sales',
                        data: [30000, 35000, 28000, 45000, 42000, 55000, 48000, 52000, 60000, 58000, 65000, 70000],
                        borderColor: colors.primary,
                        backgroundColor: gradient,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            cornerRadius: 6,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return 'Sales: $' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            border: {
                                display: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // 2. Recent Items Chart (small area chart)
        const recentItemsChart = document.getElementById('recent-items-chart');
        if (recentItemsChart) {
            const ctx = recentItemsChart.getContext('2d');
            const gradient = createGradient(ctx, 'rgba(3, 169, 243, 0.6)', 'rgba(3, 169, 243, 0.1)');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', ''],
                    datasets: [{
                        data: [20, 35, 25, 45, 30, 55, 40],
                        borderColor: colors.info,
                        backgroundColor: gradient,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 2
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
        }

        // 3. Widget Analytics Charts
        initializeWidgetCharts();

        function initializeWidgetCharts() {
            // Sparkline-style charts for dashboard widgets
            const sparklineConfigs = [
                { id: 'stats-bar', data: [9,4,8,6,5,6,4,8,3,5,9,5], color: colors.primary },
                { id: 'stats-line', data: [1,4,8,3,5,6,4,8,3,3,9,5], color: colors.secondary },
                { id: 'stats-bar-2', data: [4,2,8,2,5,6,3,8,3,5,9,5], color: colors.success },
                { id: 'stats-bar-3', data: [2,4,8,4,5,7,4,7,3,5,7,5], color: colors.warning }
            ];

            sparklineConfigs.forEach(config => {
                const element = document.getElementById(config.id) || 
                               document.querySelector(`.${config.id}`);
                
                if (element) {
                    // Create canvas if it doesn't exist
                    if (element.tagName !== 'CANVAS') {
                        const canvas = document.createElement('canvas');
                        canvas.style.width = '100%';
                        canvas.style.height = '50px';
                        element.appendChild(canvas);
                        element = canvas;
                    }

                    const ctx = element.getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: config.data.map((_, i) => i),
                            datasets: [{
                                data: config.data,
                                borderColor: config.color,
                                backgroundColor: config.color + '20',
                                borderWidth: 2,
                                fill: config.id.includes('bar'),
                                tension: 0.4,
                                pointRadius: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false }, tooltip: { enabled: false } },
                            scales: { x: { display: false }, y: { display: false } },
                            animation: { duration: 1000 }
                        }
                    });
                }
            });
        }

        // 4. Initialize any chart containers found in the DOM
        function initializeDynamicCharts() {
            // Look for any remaining flot chart containers
            const flotContainers = document.querySelectorAll('[id*="flot"], [class*="flot"]');
            flotContainers.forEach(container => {
                if (!container.querySelector('canvas') && container.offsetWidth > 0) {
                    // Convert to Chart.js
                    const canvas = document.createElement('canvas');
                    container.appendChild(canvas);
                    
                    // Create a simple default chart
                    const ctx = canvas.getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                                label: 'Data',
                                data: [12, 19, 3, 5, 2, 3],
                                borderColor: colors.primary,
                                backgroundColor: colors.primary + '20',
                                borderWidth: 2,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            }
                        }
                    });
                }
            });
        }

        // Initialize dynamic charts after a short delay
        setTimeout(initializeDynamicCharts, 500);
    });

    // Export for global access if needed
    window.NotikaCharts = {
        colors: {
            primary: '#00c292',
            secondary: '#03a9f3',
            success: '#00c292', 
            warning: '#ff9800',
            danger: '#e91e63',
            info: '#03a9f3'
        },
        createChart: function(ctx, config) {
            return new Chart(ctx, config);
        }
    };

})();