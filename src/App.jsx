import { useEffect, useState } from 'react'
import './App.css'
import propTypes from 'prop-types';
/* Images */
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/sunny.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/windy.png";
import snowIcon from "./assets/snowy.png";
import humidityIcon from "./assets/humidity.png";

const WeatherDetails = ({icon, temp, city, country, lat, log, humidity, wind}) => {
 return (
  <>
  <div className='image'>
    <img src={icon} alt="clear Icon" />
    
  </div>

  <div className='temp'> {temp} °C</div>
  <div className='location'> {city}</div>
  <div className='country'> {country}</div>
  <div className='cord'> 
    <div>
      <span className='lat'>Latitude</span>
      <span> {lat}</span>
    </div>
    <div>
      <span className='log'>Longtitute</span>
      <span> {log}</span>
    </div>


   </div>

   <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} alt="image" className='icon' />

        <div className='data'>
          <div className='humidity-percentage'>{humidity} %</div>
          <div className='text'>Humidity</div>
        </div>
      </div>

      <div className='element'>
        <img src={windIcon} alt="image" className='icon' />

        <div className='data'>
          <div className='wind-percentage'> {wind} km/h</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>


   </div>
</>
 );
};



WeatherDetails.propTypes = {
  Icon: propTypes.string.isRequired,
  temp: propTypes.number.isRequired,
  city: propTypes.string.isRequired,
  country: propTypes.string.isRequired,
  humidity: propTypes.number.isRequired,
  wind: propTypes.number.isRequired,
  lat: propTypes.number.isRequired,
  log: propTypes.number.isRequired,

};

function App() {
  let api_key = "30b19682996ebbdd4c7f9c900c863a08";

  const [text, setText] = useState("Karaikudi");
   const [icon, setIcon] = useState(snowIcon);
   const [temp, setTemp] = useState(0);
   const [city, setCity] = useState();
   const [country, setCountry] = useState();
   const [lat, setLat] = useState(0);
   const [log, setLog] = useState(0);
   const [humidity, setHumidity] = useState(0);
   const [wind, setWind] = useState(0);
   const [cityNotFound, setCityNotFound] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

    const weatherIconMap = {
      "01d": clearIcon,
      "01n": clearIcon,
      "02d": cloudIcon,
      "02n": cloudIcon,
      "03d": drizzleIcon,
      "03d": drizzleIcon,
      "03n": drizzleIcon,
      "04d": drizzleIcon,
      "04n": drizzleIcon,
      "09d": rainIcon,
      "09n": rainIcon,
      "10d": rainIcon,
      "10n": rainIcon,
      "13d": snowIcon,
      "13n": snowIcon,
    };

   const search = async ()=>{    
    setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
try{
  let res = await fetch(url);
  let data = await res.json();

  if(data.cod === "404"){
    console.error("City Not Found");
    setCityNotFound(true);
    setLoading(false);
    return;
  }
  setHumidity(data.main.humidity);
  setWind(data.wind.speed);
  setLog(data.coord.lon);
  setLat(data.coord.lat);
  setCountry(data.sys.country);
  setCity(data.name);
  setTemp(Math.floor(data.main.temp));
  setIcon(data.wind.speed);
  const weatherIconCode = data.weather[0].icon;
  setIcon(weatherIconMap[weatherIconCode] || clearIcon);
  setCityNotFound(false);
}
catch{
  console.error("An error occurred:", error.message);
  setError("An Error Occur While Fetching Data");
}
finally{
  setLoading(false);
}

    };

    const handleCity= (e)=>{
        setText(e.target.value);
    };

    const handleKeyDown= (e)=>{
      if(e.key === "Enter" ){
        search();
      }
  };

useEffect(function (){
  search();
}, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity} value={text} />
          <div className='search-icon' onClick={()=> search()}>
            <img src={searchIcon} alt="search" onKeyDown={handleKeyDown} />
          </div>
        </div>
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city= {city} country= {country} lat= {lat} log= {log} humidity={humidity} wind={wind}  />  }
        

        {loading && <div className='loading-message'>Loading....</div>}
        {error && <div className='error-message'>Error</div>}
       {cityNotFound &&  <div className='citynot-found'>City Not Found</div>}
      </div>
    </>
  )
}

export default App
