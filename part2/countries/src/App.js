import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) =>
  <p>
    Find countries: <input onChange={onChange} value={value} />
  </p>


const Country = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
      unit: 'm'
    }
    
    axios.get('http://api.weatherstack.com/current', { params })
      .then(response => {
        console.log('fetch');
        const dataResponse = response.data;;
        setWeather([dataResponse])
      })
  }, [])
  
  console.log(weather);
  if (weather.length > 0) {
    const currentWeather = weather[0]

    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
        <img class="country" src={country.flag} alt="Flag" />
        <div>
          <h2>Weather in {currentWeather.location.name}</h2>
          <p>Temperature {currentWeather.current.temperature} Celsius</p>
          <img src={currentWeather.current.weather_icons[0]} alt={currentWeather.current.weather_descriptions[0]} />
          <p><b>Wind:</b> {currentWeather.current.wind_speed} mph direction {currentWeather.current.wind_direction}</p>
        </div>
      </div>
    )
  }
}

const Countries = ({ filteredCountries, setFilteredCountries }) =>
  <div>
    {filteredCountries.map(country =>
      <p key={country.alpha3Code}>{country.name} 
        <button onClick={() => setFilteredCountries([country])} >Show</button>
      </p>
    )}
  
  </div>

const Content = ({ filteredCountries, setFilteredCountries }) => {
  console.log(filteredCountries.length)
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return <Countries filteredCountries={filteredCountries} setFilteredCountries={ setFilteredCountries }/>
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  console.log(process.env.REACT_APP_API_KEY);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    if (newFilter) {
      const regex = new RegExp(newFilter, 'i');
      const filteredCountries = countries.filter((country) => {
        return country.name.match(regex);
      });
      setFilteredCountries(filteredCountries)
    }
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Content filteredCountries={filteredCountries} setFilteredCountries={ setFilteredCountries } />
    </div>
  )
   
}

export default App