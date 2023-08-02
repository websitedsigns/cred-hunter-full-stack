import React, { useState, useEffect } from 'react';
import CoasterForm from './components/CoasterForm';
import CoasterTable from './components/CoasterTable';
import CoasterCounter from './components/CoasterCounter';
import axios from 'axios';
import './styles/styles.css';
import './App.css';

const App = () => {
  const [coasters, setCoasters] = useState([]);

  // Load coaster data from the backend on component mount
  useEffect(() => {
    fetchCoasters();
  }, []);

  // Fetch coaster data from the backend
  const fetchCoasters = async () => {
    try {
      const response = await axios.get('/api/coasters');
      setCoasters(response.data);
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
        if (response.status !== 201) {
          // Handle error if coaster was not added to the database
          // You may also want to handle any potential error here
        }
      } catch (error) {
        console.error('Error adding coaster:', error);
        // Handle any error that occurred during the request
        // You may also want to update the state back to its previous value if there's an error
      }

      // Scroll back to the top of the page after adding a coaster
      window.scrollTo(0, 0);
    } else {
      // Display an error message or toast notification that the coaster already exists
      alert('Coaster already exists!');
    }
  };

  const handleRemoveCoaster = async (coasterId) => {
    try {
      const response = await axios.delete(`/api/coasters/${coasterId}`);
      if (response.status === 200) {
        setCoasters(coasters.filter((coaster) => coaster._id !== coasterId));
      } else {
        // Handle error if coaster was not removed
      }
    } catch (error) {
      console.error('Error removing coaster:', error);
    }
  };

  return (
    <div>
      <h1 className="header">Coaster Counter</h1>
      <CoasterCounter totalCount={coasters.length} />
      <CoasterForm onAddCoaster={handleAddCoaster} existingCoasters={coasters} />
      <CoasterTable coasters={coasters} onRemoveCoaster={handleRemoveCoaster} />
    </div>
  );
};

export default App;
