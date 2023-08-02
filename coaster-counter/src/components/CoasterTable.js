import React, { useState } from 'react';
import './CoasterTable.css'; // Import the CSS file

const CoasterTable = ({ coasters, onRemoveCoaster }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredCoasters = coasters.filter((coaster) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    if (filterBy === 'name') {
      return coaster.name.toLowerCase().includes(searchTermLowerCase);
    } else if (filterBy === 'manufacturer') {
      return coaster.manufacturer.toLowerCase().includes(searchTermLowerCase);
    } else if (filterBy === 'themePark') {
      return coaster.themePark.toLowerCase().includes(searchTermLowerCase);
    } else {
      return true;
    }
  });

  const sortedCoasters = filteredCoasters.slice().sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'manufacturer') {
      return a.manufacturer.localeCompare(b.manufacturer);
    } else if (sortBy === 'themePark') {
      return a.themePark.localeCompare(b.themePark);
    }
    return 0;
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
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="name">Name (A-Z)</option>
          <option value="manufacturer">Manufacturer (A-Z)</option>
          <option value="themePark">Theme Park (A-Z)</option>
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
