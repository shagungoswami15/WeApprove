const axios = require("axios"); // To call the ML model

exports.predictLoanApproval = async (req, res) => {
    try {
        const formData = req.body;

        // Convert form data to model's expected format
        const formattedData = {
            income: parseInt(formData.income),
            loan_amount: parseInt(formData.loanAmount),
            credit_history: formData.creditHistory || 1,  // Default value if missing
            dependents: parseInt(formData.dependents) || 0, 
            education: formData.education === "Graduate" ? 1 : 0,  
            loan_term: parseInt(formData.tenure),
        };

        // Call the ML model
        const response = await axios.post("http://127.0.0.1:5000/predict", formattedData);
        res.json({ prediction: response.data.prediction });

    } catch (error) {
        console.error("Error in loan prediction:", error);
        res.status(500).json({ error: "Loan prediction failed" });
    }
};