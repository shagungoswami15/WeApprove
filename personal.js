const mongoose = require("mongoose");

const personalLoanSchema = new mongoose.Schema(
  {
    fullName: String,
    dob: String,
    gender: String,
    maritalStatus: String,
    mobile: String,
    email: String,
    Pan: String,
    employmentType: String,
    companyName: String,
    designation: String,
    income: Number,
    experience: Number,
    loanAmount: Number,
    tenure: Number,
    downPayment: Number,
    loanPurpose: String,
    currentAddress: String,
    permanentAddress: String,
    state: String,
    pincode: String,
    bankName: String,
    accountNumber: String,
    ifsc: String,
    branchName: String,
    accountType: String,
    idProof: String, // Store file path if needed
    addressProof: String, // Store file path if needed
    incomeProof: String, // Store file path if needed
    agreeTerms: Boolean,
  },
  { collection: "personalloanform" } // Matches MongoDB collection name
);

module.exports = mongoose.model("PersonalModel", personalLoanSchema);
