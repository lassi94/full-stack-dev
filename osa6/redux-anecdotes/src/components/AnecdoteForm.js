import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { infoCreator } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    //const store = props.store

    //const getId = () => (100000 * Math.random()).toFixed(0)

    const addAnecdote = async (event) => {
        event.preventDefault()
        const value = await event.target.anecdote.value

        const obj = {
            content: value,
            votes: 0
        }
        console.log(obj)
        props.createAnecdote(obj)
        props.infoCreator(`you added ${obj.content}`, 5)

        //event.target.anecdote.value = ''
    }
      
    return(
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </>
    )
}

const mapDispatch = {
    createAnecdote,
    infoCreator
}

export default connect(
    null, 
    mapDispatch
)(AnecdoteForm)