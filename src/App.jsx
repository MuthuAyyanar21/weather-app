import { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

import { getWeatherData } from "./services/weatherService";

function App() {

  const [city, setCity] = useState("");

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  async function getWeather() {

    if (city === "") {
      alert("Enter a city");
      return;
    }

    setLoading(true);

    const data = await getWeatherData(city);

    setLoading(false);

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    setWeather(data);
  }

  return (
    <div className="container">

      <div className="weather-card">

        <h1>Weather</h1>


        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
        />

        {loading && <div className="spinner"></div>}

        {!loading && weather && (
          <WeatherCard weather={weather} />
        )}

      </div>

    </div>
  );
}

export default App;