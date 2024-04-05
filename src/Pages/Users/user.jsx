import React, { useState, useEffect } from 'react';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Import db from firebaseConfig.js
import './user.css'

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
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

  const handleSelectChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const fetchUserDetails = async () => {
    try {
      // Fetch entire user details from Firestore based on selected user
      const userDoc = await getDoc(doc(db, 'users', selectedUser));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Convert timestamp to a human-readable format
        const userDetailsWithHumanReadableDate = {
          ...userData,
          dateOfBirth: userData.dateOfBirth.toDate().toString(),
        };
        setUserDetails(userDetailsWithHumanReadableDate);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  

  return (
    <div>
      <h1>Select User</h1>
      <select
        value={selectedUser}
        onChange={handleSelectChange}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.fullName}
          </option>
        ))}
      </select>
      <button onClick={fetchUserDetails}>Fetch Details</button>
      {userDetails && (
        <div>
          <h2>User Details</h2>
          <table>
            <tbody>
              {Object.entries(userDetails).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{typeof value === 'object' ? value.toString() : value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
