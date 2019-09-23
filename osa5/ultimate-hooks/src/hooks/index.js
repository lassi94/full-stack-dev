import { useState } from 'react'
import axios from 'axios'

export const useResource= (url) => {

    const [value, setValue] = useState([])
    
    const baseUrl = url
    
    const getAll = async () => {
      console.log(baseUrl)
      const request = await axios.get(baseUrl)
      setValue(request.data)
    }
    
    const create = async newObject => {
  
      const response = await axios.post(baseUrl, newObject)
       setValue(value.concat(response.data))
    }
    
    return [ value, { getAll, create } ]
}

export const useField = (type) => {

    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return{
        type, value, onChange
    }
}