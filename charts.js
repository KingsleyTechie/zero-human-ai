// src/js/charts.js
class AnalyticsCharts {
    constructor() {
        this.performanceChart = null;
        this.domainChart = null;
    }

    initPerformanceChart(ctx, data) {
        this.performanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels || ['Healthcare', 'Finance', 'E-commerce', 'Manufacturing', 'Agriculture'],
                datasets: [{
                    label: 'Accuracy (%)',
                    data: data.accuracies || [95, 92, 89, 94, 96],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)'
                    ],
                    borderColor: [
                        'rgb(102, 126, 234)',
                        'rgb(118, 75, 162)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Model Performance by Domain'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Accuracy (%)'
                        }
                    }
                }
            }
        });
    }

    initDomainChart(ctx, data) {
        this.domainChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels || ['Healthcare', 'Finance', 'E-commerce', 'Other'],
                datasets: [{
                    data: data.counts || [5, 4, 3, 11],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(201, 203, 207, 0.8)'
                    ],
                    borderColor: [
                        'rgb(102, 126, 234)',
                        'rgb(118, 75, 162)',
                        'rgb(255, 99, 132)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Dataset Distribution by Domain'
                    }
                }
            }
        });
    }

    updatePerformanceData(newData) {
        if (this.performanceChart) {
            this.performanceChart.data.datasets[0].data = newData.accuracies;
            this.performanceChart.update();
        }
    }

    updateDomainData(newData) {
        if (this.domainChart) {
            this.domainChart.data.datasets[0].data = newData.counts;
            this.domainChart.update();
        }
    }
}

const analytics = new AnalyticsCharts();