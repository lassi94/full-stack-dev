import lodash from 'lodash'
import anecdoteService from '../services/anecdoteService'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'INIT_STATE':
      console.log("dataaaa", action.data)
      const newState = action.data
      return newState
    case 'VOTE':
      const find = state.find(item => item.id === action.data.id)
      const change = {
        ...find,
        votes: find.votes + 1
      }
      const newArray = state.map(item => item.id === find.id ? change:item)
      const sorted = sort(newArray)
      return sorted
    case 'ADD_ANECDOTE':
      const added = state.concat(action.data)
      return added
    default: return state
  }
}

export const voteReducer = (id, obj) => {

  const newObj = {
    ...obj,
    votes: obj.votes + 1
  }

  return async dispatch => {
    const result = await anecdoteService.update(id, newObj)
    dispatch(
      {
        type: 'VOTE',
        data: result
    })
  }
}

export const createAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const result = await anecdoteService.create(anecdoteContent)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: result
    })
  }
}

export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_STATE',
      data: anecdotes
    })
  }
}

const sort = (array) => {
  const sorted = lodash.orderBy(array, ['votes'], ['desc'])
  return sorted
}

export default reducer