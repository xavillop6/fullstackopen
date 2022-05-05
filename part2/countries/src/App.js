import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) =>
  <p>
    Find countries: <input onChange={ onChange } value={ value } />
  </p>

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img src={ country.flag } alt="Flag" />
    </div>
  )
}

const Countries = ({ filteredCountries }) =>
  <div>
    {filteredCountries.map(country => <p key={country.alpha3Code}>{ country.name }</p>)}
  </div>

const Content = ({ filteredCountries }) => {
  console.log(filteredCountries.length)
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return <Countries filteredCountries={filteredCountries} />
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

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
      <Content filteredCountries={ filteredCountries } />
    </div>
  )
   
}

export default App