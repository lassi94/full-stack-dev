import React, { useEffect } from 'react';
import './App.css';
import { useResource, useField } from './hooks'

const App = () => {

  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  async function fetch() {
    await noteService.getAll()
    await personService.getAll()
  }


  useEffect(()=>{
    fetch()
  }, [])

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    await noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    await personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
