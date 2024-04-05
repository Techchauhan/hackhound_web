import React, { useState, useEffect } from 'react';
import './loan.css';
import { getDocs, collection, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Import db from firebaseConfig.js

const LoanForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    accountNumber: '',
    loanType: '',
    loanAmount: '',
    interestAmount: '',
    interestDuration: '6 months',
  });
  const [users, setUsers] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users from Firestore
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const userList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // Auto-populate account number when user is selected
    if (name === 'name') {
      const selectedUser = users.find(user => user.id === value);
      if (selectedUser) {
        setAccountNumber(selectedUser.accountNumber);
      } else {
        setAccountNumber(''); // Reset account number if user not found
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Construct the data object to be saved to Firestore
      const loanData = {
        ...formData,
        timestamp: serverTimestamp() // Add a timestamp to track when the loan was submitted
      };
      
      // Get the reference to the selected user's document
      const userDocRef = doc(db, 'users', formData.name);
      
      // Add a new document to the 'loan' subcollection with the loanData
      await setDoc(doc(userDocRef, 'loan', formData.loanType), loanData);
      
      // Reset the form after successful submission
      setFormData({
        name: '',
        gender: '',
        accountNumber: '',
        loanType: '',
        loanAmount: '',
        interestAmount: '',
        interestDuration: '6 months',
      });
      
      // Show a success message or redirect the user
      console.log('Loan submitted successfully!');
    } catch (error) {
      console.error('Error submitting loan:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <select
          name="name" // Make sure the name attribute matches the key in formData
          value={formData.name}
          onChange={handleChange}
        >
          <option value="">Select User</option> {/* Set default option */}
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Account Number:</label>
        <input
          type="text"
          name="accountNumber"
          value={accountNumber}
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
      <label>Loan Type:</label>
        <select
        
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          required
        >
         
          <option value="">Select Loan Type</option>
          <option value="home">Home Loan</option>
          <option value="car">Car Loan</option>
          <option value="study">Study Loan</option>
          <option value="other">Other</option> {/* Add one more option */}
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
          type="tel"
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
