import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import List from './components/List'
import axios from 'axios'


const App = () =>{

    const [countries, setCountries] = useState([])
    const [show, setShow] = useState([])
    const [country, setCountry] = useState({})

    useEffect(()=>{
        axios.get('https://restcountries.eu/rest/v2/all').then(response =>{
            console.log(response.data)
            setCountries(response.data)
        })
    }, [])

    const handler = (e) =>{

        console.log(e.target.value)

        const target = e.target.value

        const amount = countries.filter(item => item.name.includes(target))

        console.log(amount)

        if(amount.length < 10){

            setShow(amount)
            
        }else{
            setShow([])
        }


    }


  

  
    return(
        <div className="App">
            <Header value="Find countries" />
            <Filter handler={handler} />
            <List country={show} />
        </div>
    )
}

export default App