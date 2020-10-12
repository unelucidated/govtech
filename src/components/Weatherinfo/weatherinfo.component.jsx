import React from 'react';
import './weatherinfo.styles.css';

const WeatherDisplay = props => {
    return <div className="weather-container">Current weather: {props.weather}</div>
}

export default WeatherDisplay;