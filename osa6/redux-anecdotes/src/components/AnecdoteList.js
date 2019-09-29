import React from 'react'
import { voteReducer } from '../reducers/anecdoteReducer'
import { infoCreator } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  //const { anecdotes, filter } = props.store.getState()
  
  const vote = async (id) => {
    console.log('vote', id)
    const result = await props.anecdotes.find(item => item.id === id)
    console.log(result)
    props.voteReducer(id, result)
    props.infoCreator(`you voted ${result.content}`, 5)
}
 
    return(
      <>
      {props.filterAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </>
    )
    
}

const filterAnecdotes = ({ anecdotes, filter }) => {
  if(filter.state === 'SHOW_ALL'){
    return anecdotes
  } else if(filter.state === 'FILTER'){
      console.log("FILTER", filter)
      const show = anecdotes.filter(item => item.content.includes(filter.show))
      console.log("SHOW", show)
      return show
  }
}

const mapState = (state) => {
  return{
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter,
    filterAnecdotes: filterAnecdotes(state)
  } 
}

const mapDispatch = {
  voteReducer,
  infoCreator
}

export default connect(
  mapState,
  mapDispatch
)(AnecdoteList)