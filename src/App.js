import logo from './logo.svg';
import './App.css'; 
import React, { useState } from 'react'
 

const api = {
  key: "d34ccb77d87c6379d872c08e8d64c1c0",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setquery] = useState('');
  const [weather, setweather] = useState({});

  const fetchSearch = evt => {
    if (evt.key === "Enter") {
      //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setweather(result)
        setquery('');
        console.log(result);
      });

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? (
        (weather.main.temp > 16) ? 'app warm' : 'app'
      ) : 'app'
    }>
      <main>
        <div className="search-div">
          <input
            type="text"
            className="search-input"
            placeholder="Where?..."
            onChange={e => setquery(e.target.value)}
            value={query}
            onKeyPress={fetchSearch}
            ></input>
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
              
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>

        ) : (
          <div>Search a place, please ;)</div>

        ) }


      </main>
    </div>
    
  );
}

export default App;
