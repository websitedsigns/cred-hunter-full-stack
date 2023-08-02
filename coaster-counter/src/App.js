import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add this line to import axios
import CoasterForm from './components/CoasterForm';
import CoasterTable from './components/CoasterTable';
import './styles/styles.css'
import './App.css'

const App = () => {
  const [coasters, setCoasters] = useState([]);

  // Load coaster data from the backend on component mount
  useEffect(() => {
    fetchCoasters();
  }, []);

  // Fetch coaster data from the backend
  const fetchCoasters = async () => {
    try {
      const response = await fetch('/api/coasters');
      const data = await response.json();
      setCoasters(data);
    } catch (error) {
      console.error('Error fetching coasters:', error);
    }
  };

  const handleAddCoaster = async (newCoaster) => {
    const exists = coasters.some(
      (coaster) =>
        coaster.name === newCoaster.name &&
        coaster.manufacturer === newCoaster.manufacturer &&
        coaster.themePark === newCoaster.themePark
    );
  
    if (!exists) {
      // Add the new coaster with a generated _id property
      const updatedCoasters = [...coasters, { ...newCoaster, _id: Date.now().toString() }];
      setCoasters(updatedCoasters); // Update the state immediately
      try {
        const response = await axios.post('/api/coasters', newCoaster);
        if (response.status === 201) {
          // Coaster added successfully
        } else {
          // Handle error if coaster was not added to the database
          // You may also want to handle any potential error here
        }
      } catch (error) {
        console.error('Error adding coaster:', error);
        // Handle any error that occurred during the request
        // You may also want to update the state back to its previous value if there's an error
      }
    } else {
      // Display a warning to the user that the coaster already exists
      alert('Coaster already exists!');
    }
  };

  const handleRemoveCoaster = async (coasterId) => {
    try {
      console.log('Removing coaster:', coasterId);
  
      const response = await fetch(`/api/coasters/${coasterId}`, {
        method: 'DELETE',
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Coaster removed successfully:', coasterId);
        setCoasters(coasters.filter((coaster) => coaster._id !== coasterId));
      } else {
        console.log('Failed to remove coaster:', coasterId);
        // Handle error if coaster was not removed
      }
    } catch (error) {
      console.error('Error removing coaster:', error);
    }
  };
 

  return (
    <div>
      <h1 className="header">Coaster Counter</h1>
      <CoasterForm onAddCoaster={handleAddCoaster} existingCoasters={coasters} />
      <CoasterTable coasters={coasters} onRemoveCoaster={handleRemoveCoaster} />
    </div>
  );
};

export default App;
