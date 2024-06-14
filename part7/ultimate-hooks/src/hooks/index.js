import axios from "axios"
import { useEffect, useState } from "react"

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }, [baseUrl])
  

  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    const newResources = [...resources, response.data]
    setResources(newResources)
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

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

export { useResource, useField }