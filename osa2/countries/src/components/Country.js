import React, {useState} from 'react'
import CountryDetails from './CountryDetails';

const Country = ({name, id, countryArray}) =>{

    const [show, setShow] = useState()
    
    const showCountry = () =>{

        const identifier = id

        console.log(identifier)
        console.log(countryArray)

        countryArray.filter(item => {
            if(id === item.alpha2Code){

                console.log(item)

                setShow(<CountryDetails obj={item}/>)
            }
        })
    
    }

    const close = () =>{
        setShow('')
    }
   
    return(
        <>
            <li className="country-list-item" id={id}>{name} <button onClick={showCountry}>Show</button><button onClick={close}>Close</button></li>
            {show}
        </>
    )
}

export default Country