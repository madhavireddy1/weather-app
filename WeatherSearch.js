import React, { useState } from "react";

const WeatherSearch = ({ fetchWeather }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== "") {
      fetchWeather(location);
      setLocation("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter city or village"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default WeatherSearch;
