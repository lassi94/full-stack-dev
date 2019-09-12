import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Form from './components/Form'
import List from './components/List'
import Filter from './components/Filter'
import personService from './services/phonebook'
import Message from './components/Message';


const App = () =>{
    

    const [per, setPer] = useState([])

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const [show, setShow] = useState(per)
    const [errorMsg, setError] = useState(null)

    useEffect(()=>{
        console.log('effect')
        personService.getAll().then(respPer => {
            console.log(respPer)
            setPer(respPer)
            setShow(respPer)
        })
    }, [])

    console.log(per.length)

    const handler = (e) =>{

        console.log(e.target.value)
        console.log(e.target.name)

        const value = e.target.name === "email" ? setNewName(e.target.value) : setNewNum(e.target.value)
        
    }

    const filterHandler = (e) =>{
      
        if(e.target.name === "filter"){

            console.log("Filter value", e.target.value)

            const persons = per.filter(person => person.name.includes(e.target.value))

            setShow(persons)

            console.log(show)
    
        }

    }

    const addPerson = (e) =>{

        e.preventDefault()

        //check if person already exists in the phonebook

        const check = {
            name: newName,
            num: newNum
        }

        console.log(check)
            
        if(per.filter(property => property.name === newName).length === 0){
               
            const obj = {
                id: per.length+1,
                name: newName,
                num: newNum
            }

            personService.create(obj).then(upPer => {

                console.log(upPer)
                setPer(per.concat(upPer))
                setShow(per.concat(upPer))
                setError("Person added successfully!")
                setTimeout(()=>{
                    setError(null)
                }, 3000)

            }).catch(error =>{
                setError(`Add was not successfull! Error '${error}'`)
                setTimeout(()=>{
                    setError(null)
                }, 3000)
            })
                
            
            
        }else{
            const result = window.confirm(newName + ' is already added to the phonebook.Do you want to update information?')

            if(result){

                const ar = per.filter(prop => prop.name === newName)
                const objChange = {
                    ...ar[0],
                    num: newNum
                }

                console.log(objChange)
                
                personService.update(ar[0].id, objChange).then(crPer => {
                    setShow(per.map(person => person.id === ar[0].id ? crPer : person))
                    setError("Update was successfull!")
                    setTimeout(()=>{
                        setError(null)
                    }, 3000)
                }).catch(error =>{
                    setError(`Update was not successfull! Error '${error}'`)
                    setTimeout(()=>{
                        setError(null)
                    }, 3000)
                })
             
                
            }
            
        }

    }

    const deletePer = (id) =>{
        console.log(id)

        const result = window.confirm("Are you sure?")

        if(result){
            personService.dele(id).then(delePer => {
                console.log('Person deleted!', delePer)
                console.log(delePer)
    
                if(delePer === 200){
                    personService.getAll().then(getPer => {
                        console.log('Entered')
                        setPer(getPer)
                        setShow(getPer)
                        setError("Deletion was successfull!")
                        setTimeout(()=>{
                            setError(null)
                        }, 2000)
                    }).catch(error => {
                        setError(`Deletion was not succesfull! Error: '${error}'`)
                        setTimeout(()=>{
                            setError(null)
                        }, 3000)
                    })
                }
                
            }).catch(error =>{
                setError(`Deletion was not succesfull! Error: '${error}'`)
                setTimeout(()=>{
                    setError(null)
                }, 3000)
            })
        }

    }

    return(
        <div className="App">
            <Header value="Phonebook"/>
            <Message error={errorMsg}/>
            <Header value="Filter" />
            <Filter filterHandler={filterHandler}/>
            <Header value="Add new Person"/>
            <Form handler={handler} addPerson={addPerson}/>
            <Header value="Numbers"/>
            <List itemArray={show} deletePer={deletePer}/>
        </div>
    )
}

export default App