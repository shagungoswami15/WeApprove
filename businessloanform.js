
import React, { useState } from "react";
import "./businessloanform.css"; // Make sure to create this CSS file for styling

const BusinessLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobile: "",
    email: "",
    aadhaarPan: "",
    employmentType: "",
    companyName: "",
    designation: "",
    income: "",
    experience: "",
    loanAmount: "",
    tenure: "",
    downPayment: "",
    currentAddress: "",
    permanentAddress: "",
    state: "",
    city: "",
    pincode: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    idProof: null,
    addressProof: null,
    incomeProof: null,
    employmentProof: null,
    businessType: "", 
    businessStartDate: "",
    agreeTerms: false,
    creditHistory: "",  // Default to 1 (good history)
    dependents: "",
    education: "",
    loan_term: "",
  });
   // ✅ Add prediction state here
   const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value, // ✅ Correctly handle file input
    }));
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
        alert("Please accept the terms and conditions.");
        return;
    }
    const submissionData = {
      income: formData.income,  
      loan_amount: formData.loanAmount,  // Ensure naming consistency
      credit_history: formData.creditHistory,  
      dependents: formData.dependents,  
      education: formData.education,  
      loan_term: formData.tenure  // Ensure it matches "loan_term" in Python
  };
  

    try {
        const response = await fetch("http://localhost:5000/api/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",  
            credentials: "include",
            body: JSON.stringify(submissionData)
        });

        const result = await response.json();
        console.log("🔹 Backend Response:", result);  // ✅ Check response

        if (result && result.prediction) {
            setPrediction(result.prediction);  // ✅ Ensure prediction updates
            console.log("🔹 Prediction Set:", result.prediction);
        } else {
            console.error("⚠️ Unexpected Response:", result);
            alert("Unexpected response format, check server.");
        }
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Server error, please try again.");
    }
};

  return (
    <div className="form-container">
      <h2>Business Loan Application Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        {/* 1️⃣ Personal Details */}
        <fieldset>
          <legend>👤 Personal Details</legend>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Marital Status:</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>

          <label>Mobile Number:</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

          <label>Email ID:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Aadhaar/PAN Number:</label>
          <input type="text" name="aadhaarPan" value={formData.aadhaarPan} onChange={handleChange} required />

          <label>Credit History:</label>
        <select name="creditHistory" value={formData.creditHistory} onChange={handleChange} required>
            <option value="1">Good</option>
            <option value="0">Bad</option>
        </select>

        <label>Dependents:</label>
        <input type="number" name="dependents" value={formData.dependents} onChange={handleChange} required />

        <label>Education:</label>
        <select name="education" value={formData.education} onChange={handleChange} required>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
        </select>

        
        <label>LOAN TERM:</label>
        <input type="number" name="loan_term" value={formData.loan_term} onChange={handleChange} required />
        </fieldset>

        {/* 2️⃣ Employment & Income Details */}
        <fieldset>
          <legend>💼 Employment & Income</legend>
          <label>Employment Type:</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
          </select>

          <label>Company/Business Name:</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

          <label>Designation:</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />

          <label>Annual Income (₹):</label>
          <input type="number" name="income" value={formData.income} onChange={handleChange} required />

          <label>Work Experience (Years):</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
        </fieldset>

        {/* 3️⃣ Loan Details */}
        <fieldset>
          <legend>💰 Loan Details</legend>
          <label>Loan Amount (₹):</label>
          <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

          <label>Loan Tenure (Years):</label>
          <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />
 
          <label>Down Payment (₹):</label>
          <input type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} />

        </fieldset>

        {/* 4️⃣ Address Details */}
        <fieldset>
          <legend>🏠 Address Details</legend>
          <label>Current Address:</label>
          <input type="text" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />

          <label>Permanent Address:</label>
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />

          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />

          <label>Pincode:</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
        </fieldset>

        {/* 5️⃣ Bank Details */}
        <fieldset>
          <legend>🏦 Bank Details</legend>
          <label>Bank Name:</label>
          <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />

          <label>Account Number:</label>
          <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />

          <label>IFSC Code:</label>
          <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} required />
        </fieldset>
        {/* 5️⃣ Business Details */}
<fieldset>
  <legend>📊 Business Details</legend>

  <label>Business Start Date:</label>
  <input 
    type="date" 
    name="businessStartDate" 
    value={formData.businessStartDate} 
    onChange={handleChange} 
    required 
  />

  <label>Business Type:</label>
  <select 
    name="businessType" 
    value={formData.businessType} 
    onChange={handleChange} 
    required
  >
    <option value="">Select</option>
    <option value="Partnership">Partnership</option>
    <option value="Private Limited">Private Limited</option>
  </select>
</fieldset>

        {/* 6️⃣ Upload Documents */}
        <fieldset>
          <legend>📂 Upload Documents</legend>
          <label>ID Proof:</label>
          <input type="file" name="idProof" onChange={handleChange} required />
          
          <label>Address Proof:</label>
          <input type="file" name="addressProof" onChange={handleChange} required />

          <label>Income Proof:</label>
          <input type="file" name="incomeProof" onChange={handleChange} required />

          <label>Employment Proof:</label>
          <input type="file" name="employmentProof" onChange={handleChange} required />
        </fieldset>

      {/* 7️⃣ Agreement */}
  <label>
  <input 
    type="checkbox" 
    name="agreeTerms" 
    checked={formData.agreeTerms} 
    onChange={handleChange} // ✅ Fix: This will correctly update state 
    required 
  /> I agree to the
  <a href="/Business_TC.pdf" download target="_blank" style={{ color: "#a91d1d", fontWeight: "bold" }}> Terms & Conditions </a>
</label>



        <button type="submit">Submit Application</button>
        {prediction && (
  <div className={`prediction-result ${prediction === "Approved" ? "approved" : "rejected"}`}>
    Loan {prediction}
  </div>
)}
      </form>
    </div>
  );
};

export default BusinessLoanForm;
