// src/js/app.js
class AutonomousAIApp {
    constructor() {
        this.api = api;
        this.analytics = analytics;
        this.models = [];
        this.init();
    }

    async init() {
        await this.checkConnection();
        await this.loadModels();
        this.setupEventListeners();
        this.initCharts();
        this.startLiveUpdates();
    }

    async checkConnection() {
        try {
            const health = await this.api.checkHealth();
            this.updateConnectionStatus(true);
            this.updateSystemMetrics(health);
        } catch (error) {
            this.updateConnectionStatus(false);
        }
    }

    updateConnectionStatus(connected) {
        const statusElement = document.getElementById('apiStatus');
        if (connected) {
            statusElement.innerHTML = `
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Connected</span>
            `;
            document.getElementById('systemStatus').innerHTML = `
                <i class="fas fa-circle mr-2"></i>All Systems Operational
            `;
        } else {
            statusElement.innerHTML = `
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-sm text-gray-600">Disconnected</span>
            `;
        }
    }

    async loadModels() {
        try {
            this.models = await this.api.getModels();
            this.renderModels();
            this.updateModelSelect();
        } catch (error) {
            console.error('Failed to load models:', error);
        }
    }

    renderModels() {
        const container = document.querySelector('#models .grid');
        container.innerHTML = this.models.map(model => `
            <div class="domain-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="font-bold text-gray-800">${model.name}</h4>
                    <span class="px-2 py-1 text-xs rounded-full ${
                        model.problem_type === 'Classification' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }">
                        ${model.problem_type}
                    </span>
                </div>
                <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex justify-between">
                        <span>Domain:</span>
                        <span class="font-medium">${model.domain}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Accuracy:</span>
                        <span class="font-medium">${model.accuracy ? (model.accuracy * 100).toFixed(1) + '%' : 'N/A'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Samples:</span>
                        <span class="font-medium">${model.samples_trained}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Features:</span>
                        <span class="font-medium">${model.features}</span>
                    </div>
                </div>
                <button onclick="app.useModel('${model.name}')" 
                        class="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm">
                    Use This Model
                </button>
            </div>
        `).join('');
    }

    updateModelSelect() {
        const select = document.getElementById('modelSelect');
        select.innerHTML = '<option value="">Auto-Select Best Model</option>' +
            this.models.map(model => 
                `<option value="${model.name}">${model.name} (${model.domain})</option>`
            ).join('');
    }

    setupEventListeners() {
        // Prediction form
        document.getElementById('predictionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePrediction();
        });

        // Model refresh
        document.getElementById('loadModels').addEventListener('click', () => {
            this.loadModels();
        });

        // Domain change
        document.getElementById('domainSelect').addEventListener('change', (e) => {
            this.updateInputFields(e.target.value);
        });
    }

    updateInputFields(domain) {
        const container = document.getElementById('inputFields');
        // This would be dynamically generated based on the selected domain
        // For now, using generic inputs
        container.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 mb-2">Feature 1</label>
                    <input type="number" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Value 1" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Feature 2</label>
                    <input type="number" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Value 2" required>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 mb-2">Feature 3</label>
                    <input type="number" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Value 3" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Feature 4</label>
                    <input type="number" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Value 4" required>
                </div>
            </div>
        `;
    }

    async handlePrediction() {
        const formData = new FormData(document.getElementById('predictionForm'));
        const domain = document.getElementById('domainSelect').value;
        const modelName = document.getElementById('modelSelect').value;

        // Collect input values
        const inputs = Array.from(document.querySelectorAll('#inputFields input'))
            .map(input => parseFloat(input.value) || 0);

        const predictionData = {
            data: [Object.fromEntries(inputs.map((val, idx) => [`feature_${idx + 1}`, val]))],
            domain: domain,
            model_name: modelName || null,
            return_confidence: true
        };

        try {
            const result = await this.api.predict(predictionData);
            this.displayResults(result);
            this.updatePredictionMetrics();
        } catch (error) {
            this.displayError(error.message);
        }
    }

    displayResults(result) {
        const container = document.getElementById('resultsContainer');
        const confidenceColor = result.confidence[0] > 0.8 ? 'text-green-600' : 
                              result.confidence[0] > 0.6 ? 'text-yellow-600' : 'text-red-600';

        container.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <div class="text-4xl font-bold ${confidenceColor} mb-2">
                        ${typeof result.predictions[0] === 'number' ? result.predictions[0].toFixed(4) : result.predictions[0]}
                    </div>
                    <div class="text-gray-600">Prediction Value</div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-2xl font-bold text-purple-600">${(result.confidence[0] * 100).toFixed(1)}%</div>
                        <div class="text-sm text-gray-600">Confidence</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-2xl font-bold text-blue-600">${result.processing_time_ms}ms</div>
                        <div class="text-sm text-gray-600">Response Time</div>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="text-sm text-gray-600 mb-2">Model Used</div>
                    <div class="font-semibold text-gray-800">${result.model_used}</div>
                    <div class="text-xs text-gray-500 mt-1">Domain: ${result.domain}</div>
                </div>
            </div>
        `;
    }

    displayError(message) {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = `
            <div class="text-center text-red-600">
                <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                <div class="font-semibold">Prediction Failed</div>
                <div class="text-sm mt-2">${message}</div>
            </div>
        `;
    }

    initCharts() {
        const performanceCtx = document.getElementById('performanceChart').getContext('2d');
        const domainCtx = document.getElementById('domainChart').getContext('2d');

        this.analytics.initPerformanceChart(performanceCtx, {
            labels: this.models.map(m => m.domain),
            accuracies: this.models.map(m => (m.accuracy || 0.8) * 100)
        });

        this.analytics.initDomainChart(domainCtx, {
            labels: [...new Set(this.models.map(m => m.domain))],
            counts: [...new Set(this.models.map(m => m.domain))].map(domain => 
                this.models.filter(m => m.domain === domain).length
            )
        });
    }

    updateSystemMetrics(healthData) {
        document.getElementById('activeModels').textContent = this.models.length;
        document.getElementById('totalPredictions').textContent = '1,247'; // Would come from backend
        document.getElementById('avgAccuracy').textContent = '89.5%'; // Would be calculated
        document.getElementById('responseTime').textContent = '45ms'; // From health check
    }

    updatePredictionMetrics() {
        const current = parseInt(document.getElementById('totalPredictions').textContent.replace(',', ''));
        document.getElementById('totalPredictions').textContent = (current + 1).toLocaleString();
    }

    useModel(modelName) {
        document.getElementById('modelSelect').value = modelName;
        document.getElementById('predict').scrollIntoView({ behavior: 'smooth' });
    }

    startLiveUpdates() {
        // Update system metrics every 30 seconds
        setInterval(async () => {
            await this.checkConnection();
        }, 30000);
    }
}

// Initialize the application
const app = new AutonomousAIApp();