import { useState } from "react"

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const API_KEY = "7d6ba60291e78dce9e91353a3be39839"

  const fetchWeather = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await res.json()
      if (data.cod !== 200) throw new Error("City not found")
      setWeather(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Weather App</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
               placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App;
