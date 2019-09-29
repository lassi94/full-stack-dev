import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { init } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(()=>{
    props.init()
  })

  return (
    <div>
      <h2>Filter Anecdotes</h2>
      <Filter  />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </div>
  )
}

const mapDispatch = {
  init
}

export default connect(null, mapDispatch)(App)