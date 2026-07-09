function WeatherCard({ weather }) {
  return (
    <div className="weather-info">

      <h2>{weather.name}</h2>

      <p>🌡 Temperature : {weather.main.temp} °C</p>

      <p>💧 Humidity : {weather.main.humidity}%</p>

      <p>🌬 Wind : {weather.wind.speed} m/s</p>

      <p>☁ Weather : {weather.weather[0].main}</p>

      <p>🌡 Feels Like : {weather.main.feels_like} °C</p>

      <p>🌍 Country : {weather.sys.country}</p>
      <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="Weather Icon"
/>

    </div>
  );
}

export default WeatherCard;