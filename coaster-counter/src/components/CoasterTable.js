import React, { useState } from 'react';
import './CoasterTable.css'; // Import the CSS file

const CoasterTable = ({ coasters, onRemoveCoaster }) => {
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
    } catch (error) {
      console.error('Error removing coaster:', error);
    }
  };

  return (
    <div className="coaster-table-container">
      <div className="coaster-table-filter-container">
        {/* Your code for search and filter goes here */}
      </div>
      <div className="coaster-table-sort-container">
        {/* Your code for sort options goes here */}
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
          {/* Your code for rendering the coasters goes here */}
        </tbody>
      </table>
    </div>
  );
};

export default CoasterTable;
