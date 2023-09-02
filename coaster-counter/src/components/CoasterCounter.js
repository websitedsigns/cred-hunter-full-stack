import React, { useState } from 'react';
import './CoasterTable.css'; // Import the CSS file
import ReactDOM from 'react-dom';
import axios from 'axios';



const CoasterTable = ({ coasters, setCoasters, onRemoveCoaster }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
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

  const sortOptions = ['name', 'manufacturer', 'themePark'];

  // Sort the coasters based on the selected option
  const sortedCoasters = sortOption
    ? [...filteredCoasters].sort((a, b) => a[sortOption].localeCompare(b[sortOption]))
    : filteredCoasters;

  const handleRemoveClick = async (coasterId) => {
    try {
      // Your code for removing a coaster goes here
      const response = await axios.delete(`/api/coasters/${coasterId}`);
      if (response.status === 200) {
        // Remove the coaster from the frontend
        setCoasters((prevCoasters) => prevCoasters.filter((coaster) => coaster._id !== coasterId));
      } else {
        // Handle error if coaster was not removed
      }
    } catch (error) {
      console.error('Error removing coaster:', error);
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
      <div className="coaster-table-sort-container">
        <label>Sort By:</label>
        {sortOptions.map((option) => (
          <button
            key={option}
            className={sortOption === option ? 'active' : ''}
            onClick={() => handleSortChange(option)}
          >
            {option}
          </button>
        ))}
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
          {sortedCoasters.map((coaster) => (
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
