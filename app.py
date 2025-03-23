from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import traceback 

app = Flask(__name__)

# ✅ Correct CORS setup with credentials support
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Load trained model
MODEL_PATH = os.path.abspath("./loan_approval_model.pkl")

if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        print("✅ Model loaded successfully.")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        model = None
else:
    print(f"❌ Model file not found at: {MODEL_PATH}")
    model = None

@app.route("/")
def home():
    return "Loan Eligibility Predictor API is running."

@app.route("/api/predict", methods=["POST", "OPTIONS"])  # 👈 OPTIONS request bhi allow karo
def predict():
    if request.method == "OPTIONS":  # 👈 Preflight request ko handle karna zaroori hai
        response = jsonify({"message": "CORS preflight OK"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200  # ✅ 200 status return karo

    try:
        data = request.json
        print("✅ Received Data:", data)
        required_keys = ["income", "loan_amount", "credit_history", "dependents", "education", "loan_term"]

        for key in required_keys:
            if key not in data or data[key] == "":
                if key in ["credit_history", "education"]:  
                    data[key] = 0  # Default value if missing
                else:
                    return jsonify({"error": f"Missing key: {key}"}), 400


        features = np.array([[  
            float(data["income"]),
            float(data["loan_amount"]),
            int(data["credit_history"]),
            int(data["dependents"]),
            int(data["education"]),
            float(data["loan_term"])
        ]])

        prediction = model.predict(features)[0]  
        result = "Approved" if prediction == 1 else "Rejected"

        # ✅ Response headers me bhi CORS allow karo
        response = jsonify({"prediction": result})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200
    
    except Exception as e:
        print("❌ Internal Server Error:", str(e))  # 👈 Error print karo
        print(traceback.format_exc())  # 👈 Full stack trace dikhaye
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
