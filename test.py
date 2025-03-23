

import joblib  # For loading the saved model
import pandas as pd  # To handle test data

# Load the trained model
model = joblib.load("loan_approval_model.pkl")
print("✅ Model loaded successfully!")
