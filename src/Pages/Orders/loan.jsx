import React, { useState } from 'react';
import './loan.css'

const LoanForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    loanAmount: '',
    interestAmount: '',
    interestDuration: '6 months'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here before submitting the form
    // For simplicity, we'll just log the form data
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Gender:</label>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Loan Amount:</label>
        <input 
          type="number" 
          name="loanAmount" 
          value={formData.loanAmount} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Interest Amount:</label>
        <input 
          type="tell" 
          name="interestAmount" 
          value={formData.interestAmount} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Interest Duration:</label>
        <select 
          name="interestDuration" 
          value={formData.interestDuration} 
          onChange={handleChange} 
          required
        >
          <option value="6 months">6 months</option>
          <option value="12 months">12 months</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanForm;
