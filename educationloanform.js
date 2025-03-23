
import React, { useState } from "react";
import "./educationloanform.css"; // Import CSS file

const EducationLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobile: "",
    email: "",
    aadhaar: "",
    qualification: "",
    university: "",
    course: "",
    duration: "",
    admissionLetter: null,
    loanAmount: "",
    loanTenure: "",
    loanPurpose: "",
    coApplicantName: "",
    relationship: "",
    coApplicantIncome: "",
    employmentType: "",
    companyName: "",
    securityType: "",
    securityValue: "",
    securityDocuments: null,
    collateralType: "",
    collateralValue: "",
    collateralDocuments: null,
    monthlyIncome: "",
    agreeTerms: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
    });

    if (formData.admissionLetter) {
        submissionData.append("admissionLetter", formData.admissionLetter);
    }
    if (formData.collateralDocuments) {
        submissionData.append("collateralDocuments", formData.collateralDocuments);
    }

    try {
        const response = await fetch("http://localhost:5001/api/education-loan/apply", {
            method: "POST",
            body: submissionData,
        });

        if (response.ok) {
            alert("Education Loan Application Submitted Successfully!");
        } else {
            const errorData = await response.json();
            alert("Failed to submit application: " + errorData.message);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Server error, please try again.");
    }
};

  
  return (
    <div className="edu-form-container">
      <h2>🎓 Education Loan Application</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <fieldset>
          <legend>👤 Personal Details</legend>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Marital Status:</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option>Select</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
          </select>

          <label>Mobile Number:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

          <label>Email ID:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>PAN Number:</label>
          <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required />
        </fieldset>

        {/* Academic Details */}
        <fieldset>
          <legend>📚 Academic Details</legend>
          <label>Highest Qualification:</label>
          <select name="qualification" value={formData.qualification} onChange={handleChange}>
            <option>Select</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>Diploma</option>
            <option>PhD</option>
          </select>

          <label>University/College Name:</label>
          <input type="text" name="university" value={formData.university} onChange={handleChange} required />

          <label>Course Name:</label>
          <input type="text" name="course" value={formData.course} onChange={handleChange} required />

          <label>Course Duration (Years):</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />

          <label>Upload Admission Letter:</label>
          <input type="file" name="admissionLetter" onChange={handleChange} required />
        </fieldset>

        {/* Loan Details */}
        <fieldset>
          <legend>💰 Loan Details</legend>
          <label>Loan Amount (₹):</label>
          <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

          <label>Loan Tenure (Years):</label>
          <input type="number" name="loanTenure" value={formData.loanTenure} onChange={handleChange} required />

          <label>Purpose of Loan:</label>
          <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange}>
            <option>Select</option>
            <option>Tuition Fees</option>
            <option>Hostel Fees</option>
            <option>Books & Study Material</option>
          </select>
        </fieldset>

        {/* Borrower Details */}
        <fieldset>
          <legend>🧑‍💼 Borrower Details</legend>
          <label>Employment Type:</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
            <option>Select</option>
            <option>Self-Employed</option>
            <option>Salaried</option>
            <option>Unemployed</option>
          </select>

          <label>ANNUAL Income (₹):</label>
          <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />

          <label>Company Name (if employed):</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
        </fieldset>

        {/* Collateral Details */}
        <fieldset>
          <legend>🏠 Collateral Details</legend>
          <label>Type of Collateral:</label>
          <select name="collateralType" value={formData.collateralType} onChange={handleChange}>
            <option>Select</option>
            <option>Property</option>
            <option>Fixed Deposit</option>
            <option>Gold</option>
            <option>Other</option>
          </select>

          <label>Collateral Value (₹):</label>
          <input type="number" name="collateralValue" value={formData.collateralValue} onChange={handleChange} />

          <label>Upload Collateral Documents:</label>
          <input type="file" name="collateralDocuments" onChange={handleChange} />
        </fieldset>

        {/* Declaration & Submit */}
        <fieldset>
          <legend>✅ Declaration & Submit</legend>
          <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
          <label>I agree to the terms and conditions.</label>
          
          <button type="submit">Submit Application</button>
        </fieldset>
      </form>
    </div>
  );
};

export default EducationLoanForm;