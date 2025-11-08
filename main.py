# test_deployment.py
import requests
import json

# Test the API
BASE_URL = "http://localhost:8000"

def test_api():
    print("🧪 Testing Autonomous AI API...")
    
    # 1. Test health endpoint
    response = requests.get(f"{BASE_URL}/health")
    print(f"✅ Health check: {response.json()}")
    
    # 2. List available models
    response = requests.get(f"{BASE_URL}/models")
    models = response.json()
    print(f"📊 Available models: {len(models)}")
    for model in models[:3]:  # Show first 3
        print(f"   - {model['name']} ({model['domain']})")
    
    # 3. Test prediction with healthcare data
    test_data = {
        "data": [
            {
                "age": 45.0, "blood_pressure": 120.0, "cholesterol": 200.0, 
                "bmi": 25.0, "glucose": 100.0, "heart_rate": 72.0,
                "family_history": 1.0, "exercise_freq": 3.0, "smoking_years": 0.0,
                "alcohol_consumption": 2.0, "stress_level": 4.0, "sleep_quality": 7.0
            },
            {
                "age": 65.0, "blood_pressure": 140.0, "cholesterol": 240.0, 
                "bmi": 32.0, "glucose": 130.0, "heart_rate": 85.0,
                "family_history": 1.0, "exercise_freq": 1.0, "smoking_years": 20.0,
                "alcohol_consumption": 4.0, "stress_level": 8.0, "sleep_quality": 5.0
            }
        ],
        "domain": "healthcare",
        "return_confidence": True
    }
    
    response = requests.post(f"{BASE_URL}/predict", json=test_data)
    if response.status_code == 200:
        result = response.json()
        print(f"🎯 Prediction successful!")
        print(f"   Model used: {result['model_used']}")
        print(f"   Predictions: {result['predictions']}")
        print(f"   Confidence: {result['confidence']}")
        print(f"   Processing time: {result['processing_time_ms']:.2f}ms")
    else:
        print(f"❌ Prediction failed: {response.text}")

if __name__ == "__main__":
    test_api()