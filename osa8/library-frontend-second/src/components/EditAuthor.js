import React, { useState }  from 'react'
import Select from 'react-select'

const EditAuthor = (props) => {

    const [author, setAuthor] = useState({})
    const [born, setBorn] = useState('')

    console.log(props.authors)
    
    const options = props.authors.allAuthors.map(item => { 
        return {value: item.name, label: item.name}
    })

    const handleOption = (author) => {
        setAuthor(author)
        console.log(author.value)
    }

    const submit = async (event) => {
        
        event.preventDefault()
        
        console.log('HELLOO', born)

        try{
            await props.authorEdit({
                    variables: {  name: author.value, born: Number(born) }
                })
        }catch(error){
            console.log(error)
        }
        
        setAuthor('')
        setBorn('')
    }

    if (!props.show) {
        return null
    }

    return(
        <form onSubmit={submit}>
            <Select value={author} onChange={handleOption} options={options}></Select>
            Born: <input type="text" onChange={ ({target}) => setBorn(target.value)}></input>
            <button type="submit">Edit</button>
        </form>
       
    )
}

export default EditAuthor