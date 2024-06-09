import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard'; // Import the WeatherCard component

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
      const response = await axios.get(endpoint);
      setWeatherData(response.data);
      console.log(response.data);
      

    } catch (error) {
      setError('Error fetching weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query) {
      fetchWeather();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name or zip code"
          className="search-input"
        />
        <button
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      <div className="weather-card-container">
        <WeatherCard weather={weatherData} />
      </div>
    </div>
  );
};

export default SearchBar;
