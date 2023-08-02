import React, { useState, useEffect } from 'react';
import CoasterForm from './components/CoasterForm';
import CoasterTable from './components/CoasterTable';
import axios from 'axios';
import './styles/styles.css'; // Import the CSS file
import './App.css'; // Import the CSS file for background image

const App = () => {
  const [coasters, setCoasters] = useState([]);

  // Fetch coaster data from the backend API and update state
  const fetchCoasters = async () => {
    try {
      const response = await axios.get('/api/coasters');
      setCoasters(response.data);
    } catch (error) {
      console.error('Error fetching coasters:', error);
      // Handle any error that occurred during the request
    }
  };

  useEffect(() => {
    fetchCoasters();
  }, []);

  const handleAddCoaster = (newCoaster) => {
    const exists = coasters.some(
      (coaster) =>
        coaster.name === newCoaster.name &&
        coaster.manufacturer === newCoaster.manufacturer &&
        coaster.themePark === newCoaster.themePark
    );

    if (!exists) {
      // Add the new coaster with a generated _id property
      setCoasters([...coasters, { ...newCoaster, _id: Date.now().toString() }]);
    } else {
      // Show a confirmation dialog before adding a duplicate coaster
      if (window.confirm('This coaster already exists in the list. Do you want to add it again?')) {
        setCoasters([...coasters, { ...newCoaster, _id: Date.now().toString() }]);
      }
    }
  };



  const handleRemoveCoaster = (coasterId) => {
    setCoasters(coasters.filter((coaster) => coaster._id !== coasterId));
  };
  

  return (
    <div>
      <div className="header">
        <h1>Coaster Counter</h1>
        <div className="coaster-counter-badge">
          <span>Total Coasters: {coasters.length}</span>
        </div>
      </div>
      <CoasterForm onAddCoaster={handleAddCoaster} existingCoasters={coasters} />
      <CoasterTable coasters={coasters} onRemoveCoaster={handleRemoveCoaster} />
    </div>
  );
};


export default App;
