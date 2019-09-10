import React from 'react'
import Header from './Header'
import Weather from './Weather'

const CountryDetails = ({obj}) =>{

    console.log(obj)

    if(Array.isArray(obj)){
        let array = obj[0].languages.map(item => <li className="country" key={item.name}> {item.name} </li>)

        return(
            <div className="country">
                <Header value={obj[0].name} />
                <p className="capital">
                    Capital: {obj[0].capital}
                </p>
                <p className="capital">
                    Population: {obj[0].population}
                </p>
                <Header value="Languages" />
                <ul className="countries">
                    {array}
                </ul>
                <div className="flag">
                    <img src={obj[0].flag}></img>
                </div>
                <Weather capital={obj[0].capital}/>
            </div>
        )

    }else{

        let lang = obj.languages.map(item => <li className="country" key={item.name}> {item.name} </li>)

        return(
            <div className="country">
                <Header value={obj.name} />
                <p className="capital">
                    Capital: {obj.capital}
                </p>
                <p className="capital">
                    Population: {obj.population}
                </p>
                <Header value="Languages" />
                <ul className="countries">
                    {lang}
                </ul>
                <div className="flag">
                    <img src={obj.flag}></img>
                </div>
                <Weather capital={obj.capital}/>
            </div>
        )
    }

}

export default CountryDetails