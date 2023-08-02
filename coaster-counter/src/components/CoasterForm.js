import React, { useState, useRef } from 'react';
import { manufacturerTypes } from './manufacturerTypes';
import { themeParks } from './themeParks';

const CoasterForm = ({ onAddCoaster }) => {
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [themePark, setThemePark] = useState('');
  const nameInputRef = useRef(null);
  const themeParkInputRef = useRef(null);
  const [isThemeParkDropdownOpen, setIsThemeParkDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && manufacturer && themePark) {
      onAddCoaster({ name, manufacturer, themePark });
      setName('');
      setManufacturer('');
      setThemePark('');
      nameInputRef.current.focus();
    }
  };

  const handleThemeParkChange = (selectedThemePark) => {
    setThemePark(selectedThemePark);
    setIsThemeParkDropdownOpen(false);
  };

  const handleThemeParkKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Coaster Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        ref={nameInputRef}
      />
      <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
        <option value="">Select Manufacturer</option>
        {manufacturerTypes.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          placeholder="Theme Park"
          value={themePark}
          onChange={(e) => setThemePark(e.target.value)}
          onFocus={() => setIsThemeParkDropdownOpen(true)}
          onBlur={() => setIsThemeParkDropdownOpen(false)}
          onKeyPress={handleThemeParkKeyPress}
          ref={themeParkInputRef}
        />
        {isThemeParkDropdownOpen && (
          <ul className="theme-park-dropdown">
            {themeParks.map((themePark) => (
              <li key={themePark} onClick={() => handleThemeParkChange(themePark)}>
                {themePark}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Add Coaster</button>
    </form>
  );
};

export default CoasterForm;
