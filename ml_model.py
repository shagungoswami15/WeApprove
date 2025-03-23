from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # ⚠️ Allow frontend calls (React ke liye zaroori hai)

# Load trained model
model = joblib.load("loan_approval_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Convert input to NumPy array
        features = np.array([[data["income"], data["loan_amount"], 
                              data["credit_history"], data["dependents"], 
                              data["education"], data["loan_term"]]])

        # Ensure feature count matches model expectations
        if len(features[0]) != model.n_features_in_:
            return jsonify({"error": f"Expected {model.n_features_in_} features, but got {len(features[0])}."})

        # Predict using model
        prediction = model.predict(features)[0]  
        result = "Approved" if prediction == 1 else "Rejected"
        return jsonify({"prediction": result})
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
