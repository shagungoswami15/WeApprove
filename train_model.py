
import pandas as pd
import joblib
import numpy as np
from imblearn.over_sampling import SMOTE  # For class balancing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier  # More accurate model
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("C:/LoanApproval/backend/ml_model/loan_dataset.csv")

# Drop missing values
df = df.dropna()

# Encode categorical columns
encoder = LabelEncoder()
df["Loan_Type"] = encoder.fit_transform(df["Loan_Type"])

# Encode target variable
df["Approved"] = df["Approved"].replace({"Yes": 1, "No": 0})

# Define features (X) and target (y)
X = df.drop(columns=["Applicant_ID", "Approved"], errors="ignore")
y = df["Approved"]

# Handle class imbalance using SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# Feature Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train a better model
model = RandomForestClassifier(n_estimators=150, max_depth=10, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "C:/LoanApproval/backend/ml_model/loan_approval_model.pkl")


# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model trained successfully! Accuracy: {accuracy:.2f}")

# Load the trained model
model = joblib.load("loan_approval_model.pkl")

# Model performance report
print("\n🔹 Model Performance Report:")
print(classification_report(y_test, y_pred))

# Test on custom data
custom_data = np.array([[35, 120000, 750, 500000, 2, 10]])  # Example input
custom_data = scaler.transform(custom_data)  # Scale custom input
custom_prediction = model.predict(custom_data)
print("\n🔹 Custom Data Prediction:", custom_prediction[0])  # 1 = Approved, 0 = Not Approved





