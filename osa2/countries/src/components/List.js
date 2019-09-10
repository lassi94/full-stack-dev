import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'
import Alert from './Alert'


const List = ({country}) =>{

    console.log(country.length)

    
    if(country.length < 10 && country.length > 1){

        let array = country.map(item => <Country name={item.name} key={item.alpha2Code} id={item.alpha2Code} countryArray={country} />)

        console.log("countries", country)

        return(
            <div className="country-list">
                <ul>
                    {array}
                </ul>
            </div>
        )
    }else if(country.length === 1){
        return(
            <div className="country-list">
                <CountryDetails obj={country}/>
            </div>
        )
    }else{
        return(
            <div className="country-list">
                <Alert />
            </div>
        )
    }
  
}

export default List