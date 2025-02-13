import React, { useState } from "react";
import axios from "axios";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [background, setBackground] = useState("default");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (location) => {
    const API_KEY = "6f779c572f062eef0e043b8cf9ab31b1"; // Replace with your OpenWeatherMap API key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    setLoading(true); // Set loading state
    setError(""); // Clear previous errors

    try {
      const response = await axios.get(URL);
      setWeatherData(response.data);
      setError("");

      // Change background based on weather condition
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      if (weatherCondition.includes("clear")) setBackground("clear");
      else if (weatherCondition.includes("clouds")) setBackground("cloudy");
      else if (weatherCondition.includes("rain")) setBackground("rainy");
      else if (weatherCondition.includes("snow")) setBackground("snowy");
      else setBackground("default");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again.");
      } else {
        setError("Unable to fetch weather data. Please check your connection.");
      }
      setWeatherData(null);
      setBackground("default");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className={`App ${background}`}>
      <h1>Weather Forecast</h1>
      <WeatherSearch fetchWeather={fetchWeather} />
      {loading && <p className="loading">Fetching weather data...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
};

export default App;
