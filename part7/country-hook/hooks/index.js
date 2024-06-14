
import axios from 'axios'
import { useEffect, useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {

    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          if (response.data.status === 404) {
            setCountry({ found: false })
          } else {
            const newCountry = {
              found: true,
              data: response.data
            }
            
            setCountry(newCountry)
          }
        }).catch(error => {
          setCountry({ found: false })
        })
    }
  }, [name])

  return country
}

export { useField, useCountry }