import React, {useState, useEffect } from 'react'
import axios from 'axios'


const Country = (props) => {
  const [ weather, setWeather ] = useState([])
  
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    console.log('effect, weather')
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + props.capital)
      .then(response => {
        console.log('promise fulfilled, weather')
        setWeather(response.data)
      })
  }, [props.capital])

  console.log(weather)


  if (weather.length === 0) {
    return (
      <div>
        <h1>{props.name}</h1>
        <div>capital {props.capital}</div>
        <div>population {props.population}</div>
        <br></br>
        <div>
          <h2>Spoken languages</h2>
          {props.languages.map(language =>
            <li key={language.name} > {language.name}</li>)}
        </div>
        <img src={props.flag} alt="flag" width="150" height="100"/>
        
      </div>
    )}

    
    else {
      return (
        <div>
        <h1>{props.name}</h1>
        <div>capital {props.capital}</div>
        <div>population {props.population}</div>
        <br></br>
        <div>
          <h2>Spoken languages</h2>
          {props.languages.map(language =>
            <li key={language.name} > {language.name}</li>)}
        </div>
        <img src={props.flag} alt="flag" width="150" height="100"/>
        
    
        <h2>Weather in {props.capital} </h2>
        <div>
          <strong>temperature </strong>
          {weather.current.temperature} Celsius
          <div>
          <img src={weather.current.weather_icons} alt="weather icon"/>
          </div>
          <strong>wind </strong>
          {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </div>
      </div>
      )
    }
  
}

// currently is only ever used to show only one country, but can be extended to show multiple
const CountryView = (props) => {
  const countries = props.countries

  return (
     <div>
      {countries.map(country => 
         <Country  name={country.name} 
                   capital={country.capital}
                   population={country.population}
                   languages={country.languages}
                   flag={country.flag}
                   key={country.name}
         />
      )}
    </div>
  )
}

  


const App = (props) => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length)

  console.log('filter', filter)

  const filteredCountries = countries.filter((str) => {
    return str.name.toLowerCase().includes(filter.toLowerCase())
  })
  
  console.log('filtered countries', filteredCountries.length)

  // Over 10 countries in filter
  if (filteredCountries.length >= 10) {
    return (
      
      <div>
        <form>
          find countries <input value = {filter} onChange = {handleFilterChange} />
        </form>
        Too many matches, specify another filter  
      </div>
    )
  } 
  // Less than 10 countries but over 1: show list
  else if (filteredCountries.length > 1) {
    return (
      <div>
        <form>
          find countries <input value = {filter} onChange = {handleFilterChange} />
        </form>
        
        {filteredCountries.map(country => 
          <div key={country.name}>
            {country.name}
            <button onClick={() => setFilter(country.name)}> show </button>
          </div>)}
  
      </div>
    )
  } 
  // Only one country, show information
  else {
    return (
      <div>
        <form>
          find countries <input value = {filter} onChange = {handleFilterChange} />
        </form>
          <CountryView countries={filteredCountries}/>
      </div>
    )
  }
}

export default App 