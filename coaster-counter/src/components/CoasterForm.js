import React, { useState } from 'react';
import { manufacturerTypes } from './manufacturerTypes';
import { themeParks } from './themeParks';

const CoasterForm = ({ onAddCoaster }) => {
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [themePark, setThemePark] = useState('');

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && manufacturer && themePark) {
      const capitalizedCoaster = {
        name: capitalizeFirstLetter(name),
        manufacturer: capitalizeFirstLetter(manufacturer),
        themePark: capitalizeFirstLetter(themePark),
      };
      onAddCoaster(capitalizedCoaster);
      setName('');
      setManufacturer('');
      setThemePark('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Coaster Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
        <option value="">Select Manufacturer</option>
        {manufacturerTypes.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {capitalizeFirstLetter(manufacturer)}
          </option>
        ))}
      </select>
      <select value={themePark} onChange={(e) => setThemePark(e.target.value)}>
        <option value="">Select Theme Park</option>
        {themeParks.map((themePark) => (
          <option key={themePark} value={themePark}>
            {capitalizeFirstLetter(themePark)}
          </option>
        ))}
      </select>
      <button type="submit">Add Coaster</button>
    </form>
  );
};

export default CoasterForm;
