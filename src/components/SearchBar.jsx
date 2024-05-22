import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearchResultsUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState(null);

  const apiUrl = 'https://api.openbrewerydb.org/v1/breweries';
  
  const fetchSearchResults = async () => {
    try {
      let apiEndpoint = `${apiUrl}?by_name=${searchTerm}&by_city=${searchCity}`;
      
      if (searchType !== null) {
        apiEndpoint += `&by_type=${searchType}`;
      }

      const response = await fetch(apiEndpoint);
      const data = await response.json() 




      if (Array.isArray(data)) {
        onSearchResultsUpdate(data); // Pass the data to the parent component
      } else {
        onSearchResultsUpdate([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm, searchCity, searchType]);

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout clicked');
    window.location.href = './';
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by City..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <select onChange={handleTypeChange} value={searchType || ''}>
        <option value="">Select Type</option>
        <option value="micro">Micro</option>
        <option value="nano">Nano</option>
        <option value="regional">Regional</option>
        <option value="brewpub">Brewpub</option>
        <option value="large">Large</option>
        <option value="planning">Planning</option>
        <option value="bar">Bar</option>
        <option value="contract">Contract</option>
        <option value="proprietor">Proprietor</option>
        <option value="closed">Closed</option>
      </select>

      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>


    </div>
  );
};

export default SearchBar;
