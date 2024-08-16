import React, { useEffect, useState } from "react";
import SearchBar from "../searchbar";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("New York");

  const API_KEY = "5143b84ba362327b5c0b96a14502b073";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(cityName);
  }, [cityName]);

  const handleCitySearch = (city) => {
    setCityName(city);
  };

  return (
    <div className="m-5">
      <div className="m-3 rounded-lg border border-gray-300">
        <SearchBar onSearch={handleCitySearch} />
      </div>
      <div className="rounded-xl border border-black m-5 p-5">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {weather ? (
          <>
            <p>City: {weather.city}</p>
            <p>Current Weather: {weather.temperature} °C</p>
            <p>Condition: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.windSpeed} m/s</p>
          </>
        ) : (
          !loading && <p>No weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
