
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("loan_dataset.csv")

# Ensure model file exists
try:
    model = joblib.load("loan_approval_model.pkl")
    print("✅ Model loaded successfully.")
except FileNotFoundError:
    raise FileNotFoundError("❌ Error: Model file 'loan_approval_model.pkl' not found! Train the model first.")

# Encode categorical variables
categorical_cols = ["Loan_Type"]
encoder = LabelEncoder()

for col in categorical_cols:
    df[col] = encoder.fit_transform(df[col])

# Define features (excluding 'Approved')
X = df.drop(["Applicant_ID", "Approved"], axis=1, errors="ignore")

# Ensure data types are correct
X = X.apply(pd.to_numeric, errors="coerce").fillna(0)

# Make predictions
y_pred = model.predict(X)
print("✅ Predictions:", y_pred)

