import React, { useState } from 'react';
import './CoasterTable.css'; // Import the CSS file


const CoasterTable = ({ coasters, onRemoveCoaster }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const filteredCoasters = coasters.filter((coaster) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    
    // Filter by the selected option (name, manufacturer, or theme park)
    if (filterBy === 'name') {
      return coaster.name.toLowerCase().includes(searchTermLowerCase);
    } else if (filterBy === 'manufacturer') {
      return coaster.manufacturer.toLowerCase().includes(searchTermLowerCase);
    } else if (filterBy === 'themePark') {
      return coaster.themePark.toLowerCase().includes(searchTermLowerCase);
    } else {
      return true; // Show all coasters if no filter is selected
    }
  });

  const handleRemoveClick = (coasterId) => {
    if (window.confirm('Are you sure you want to remove this coaster?')) {
      onRemoveCoaster(coasterId);
    }
  };

  return (
    <div className="coaster-table-container">
    <div className="coaster-table-filter-container">
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" value={searchTerm} onChange={handleSearchChange} />
      <label htmlFor="filter">Filter By:</label>
      <select id="filter" value={filterBy} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="name">Name</option>
        <option value="manufacturer">Manufacturer</option>
        <option value="themePark">Theme Park</option>
      </select>
    </div>
    <table className="coaster-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Theme Park</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoasters.map((coaster) => (
            <tr key={coaster._id}>
              <td>{coaster.name}</td>
              <td>{coaster.manufacturer}</td>
              <td>{coaster.themePark}</td>
              <td>
                <button onClick={() => handleRemoveClick(coaster._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoasterTable;
