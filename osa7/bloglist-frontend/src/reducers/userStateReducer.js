/* eslint-disable no-case-declarations */
import userService from '../services/users'

const reducer = (state=[], action) => {
    switch(action.type){
    case 'INIT':
        const result = action.data
        console.log("USERS", result)
        return result
    case 'FIND':
        const find = action.data
        return find
    default: return state
    }
}

export const setUsers = () => {
    return async dispatch => {
        const result = await userService.getAll()
        dispatch({
            type: 'INIT',
            data: result
        })
    }
}

export const setUser = (id) => {
    return async dispatch => {
        const result = await userService.findById(id)
        dispatch({
            type: 'FIND',
            data: result
        })
    }
}

export default reducer