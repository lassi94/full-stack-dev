import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Weather = ({capital})=>{

    const [countryCapital, setCapital] = useState({})

    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${capital}`).then(response =>{
            console.log(response.data)
            setCapital(response.data)
        })  
    }, [])

    if(countryCapital.current !== undefined){

        console.log('hello')
        console.log(countryCapital.current)
        return (
            <div className="weather">
                <h2 className="weather-header">
                    Weather in {capital}
                </h2>
                <p>Temperature: {countryCapital.current.temperature}</p>
                <div className="flag">
                    <img src={countryCapital.current.weather_icons[0]}></img>
                </div>
                <p className="wind">Wind: {countryCapital.current.wind_speed}</p>
            </div>
        )
    }else{
        return(
            <div className="weather">
                
            </div>
        )
    }
    
}

export default Weather