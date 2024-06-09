import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return null;
  }

  // Define background styles based on weather condition
  const getBackgroundStyle = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return {
          background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
          color: '#000',
        };
      case 'Clouds':
        return {
          background: 'linear-gradient(135deg, #d3cce3 0%, #e9e4f0 100%)',
          color: '#000',
        };
      case 'Rain':
        return {
          background: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)',
          color: '#000',
        };
      case 'Thunderstorm':
        return {
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: '#fff',
        };
      case 'Snow':
        return {
          background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
          color: '#000',
        };
      default:
        return {
          background: '#e0f7fa',
          color: '#000',
        };
    }
  };

  const backgroundStyle = getBackgroundStyle(weather.weather[0]?.main);

  // Function to format date and time
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);
    const timeString = date.toLocaleTimeString('en-US');
    return { date: dateString, time: timeString };
  };

  const { date, time } = formatDate(weather.dt); // Assuming dt is the UNIX timestamp

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto', ...backgroundStyle }}>
      <CardContent>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px'
          }}
        >
          <Typography variant="h3" component="div" sx={{
            marginBottom: '16px', marginTop: '0px', fontWeight: 'bold', fontSize: '2rem',
          }}>
            {weather.name || 'Unknown Location'}
          </Typography>
          <Typography variant="p" component="div" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '1.2rem' }}>
            <EventIcon sx={{ marginRight: '8px', color: '#607d8b' }} />
            Date: {date || 'N/A'}
          </Typography>
          <Typography variant="p" component="div" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '1.2rem' }}>
            <AccessTimeIcon sx={{ marginRight: '8px', color: '#607d8b' }} />
            Time: {time || 'N/A'}
          </Typography>
          <Typography variant="p" component="div" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '1.2rem' }}>
            <ThermostatIcon sx={{ marginRight: '8px', color: '#ff5722' }} />
            Temperature: {weather.main?.temp || 'N/A'} °C
          </Typography>
          <Typography variant="p" component="div" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '1.2rem' }}>
            <WbSunnyIcon sx={{ marginRight: '8px', color: '#ffeb3b' }} />
            Weather: {weather.weather[0]?.main || 'N/A'}
          </Typography>
          <Typography variant="p" component="div" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize          : '1.2rem' }}>
            <OpacityIcon sx={{ marginRight: '8px', color: '#03a9f4' }} />
            Humidity: {weather.main?.humidity || 'N/A'} %
          </Typography>
          <Typography variant="p" component="div" sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
            <AirIcon sx={{ marginRight: '8px', color: '#8bc34a' }} />
            Wind Speed: {weather.wind?.speed || 'N/A'} m/s
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
