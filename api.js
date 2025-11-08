// src/js/api.js
class AutonomousAIAPI {
    constructor(baseURL = 'http://localhost:8000') {
        this.baseURL = baseURL;
        this.isConnected = false;
    }

    async checkHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            const data = await response.json();
            this.isConnected = response.ok;
            return data;
        } catch (error) {
            this.isConnected = false;
            throw new Error('API connection failed');
        }
    }

    async getModels() {
        try {
            const response = await fetch(`${this.baseURL}/models`);
            if (!response.ok) throw new Error('Failed to fetch models');
            return await response.json();
        } catch (error) {
            console.error('Error fetching models:', error);
            return [];
        }
    }

    async predict(predictionData) {
        try {
            const startTime = performance.now();
            const response = await fetch(`${this.baseURL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(predictionData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Prediction failed');
            }

            const data = await response.json();
            const endTime = performance.now();
            data.processing_time_ms = Math.round(endTime - startTime);

            return data;
        } catch (error) {
            console.error('Prediction error:', error);
            throw error;
        }
    }

    async getSystemStats() {
        try {
            const response = await fetch(`${this.baseURL}/system/stats`);
            if (!response.ok) throw new Error('Failed to fetch stats');
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            return null;
        }
    }
}

// Global API instance
const api = new AutonomousAIAPI();