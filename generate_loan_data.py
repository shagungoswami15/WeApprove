
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
MODEL_PATH = "/mnt/data/loan_model.pkl"
try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route("/")
def home():
    return "Loan Eligibility Predictor API is running."

@app.route("/predict", methods=["POST"])
def predict():
    if not model:
        return jsonify({"error": "Model not available"}), 500
    
    try:
        data = request.get_json()
        features = np.array([
            data["Age"],
            data["Income"],
            data["Credit_Score"],
            data["Loan_Amount"],
            data["Loan_Type"],
            data["Employment_Years"]
        ]).reshape(1, -1)
        
        prediction = model.predict(features)[0]
        return jsonify({"Approved": bool(prediction)})
    except KeyError as e:
        return jsonify({"error": f"Missing key: {e}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)


        return jsonify({"error": "Model not available"}), 500
    
    try:
        data = request.get_json()
        features = np.array([
            data["Age"],
            data["Income"],
            data["Credit_Score"],
            data["Loan_Amount"],
            data["Loan_Type"],
            data["Employment_Years"]
        ]).reshape(1, -1)
        
        prediction = model.predict(features)[0]
        return jsonify({"Approved": bool(prediction)})
    except KeyError as e:
        retrn jsonify({"error": f"Missing key: {e}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)


