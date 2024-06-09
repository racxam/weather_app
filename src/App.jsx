import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './comonents/WeatherCard';
import SearchBar from './comonents/SearchBar';
import ToggleMode from './comonents/ToggleMode';
import './App.css';

const App = () => {

  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    try {
      let endpoint;
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const isZipCode = /^\d{5}(?:[-\s]\d{4})?$/.test(location);

      if (isZipCode) {
        endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=${apiKey}&units=metric`;
      } else {
        endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      }

      const response = await axios.get(endpoint);

      if (response.data && response.data.main) {

        setError(null);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (err) {
      setError('Location not found. Please enter a valid city name or zip code.');

    }
  };

  return (
    <div className="app">
      <ToggleMode />
       <div className="text-center">

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3">
        Weather App
      </h1>
       </div>



      <SearchBar onSearch={fetchWeather} />
      

    </div>
  );
};

export default App;
