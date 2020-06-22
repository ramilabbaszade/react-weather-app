import React, { useState } from "react";

const api = {
  key: "5b49b78368bef4a7280492661d6f5a2f",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          setQuery("")
          console.log(result)
        })
        .catch(err => { console.log(err) })
    }
  };

  const locationDate = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
  };
  return (
    <div className='app'>
      <main>
        {(typeof weather.main != "undefined") ?
          (
            <>
              <div className='weather-info'>
                <h1> {Math.floor(weather.main.temp)}°C</h1>
                <h2> {weather.name}, {weather.sys.country} </h2>
                <h2> {weather.weather[0].main} </h2>
              </div>
            </>
          ) : (<h2 style={{ "color": "white" }}>Comee on, it is wrong..</h2>)}

        <div className='search'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <h4>{locationDate(new Date())}</h4>
        </div>
      </main>
    </div>
  );
}

export default App;
