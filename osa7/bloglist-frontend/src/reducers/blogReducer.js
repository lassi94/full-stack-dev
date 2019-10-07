/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import lodash from 'lodash'

const reducer = (state=[], action) => {
    switch(action.type){
    case 'INIT':
        const init = action.data.map(item => item)
        //console.log(init)
        const sorted = sortArray(init)
        return sorted
    case 'ADD':
        console.log(action.data)
        const result = action.data
        const addition = state.concat(result)
        return addition
    case 'UPDATE':
        const update = sortArray(action.data.map(item => item))
        return update
    case 'DELETE':
        const deletion = sortArray(action.data.map(item => item))
        return deletion
    case 'ADD_COMMENT':
        const comment = action.data
        console.log("HERE IS THE STATE", comment)

        const newObj = {
            ...comment,
            comments: comment.comments
        }

        const updatedArray = state.map(item => item.id === action.id ? newObj:item)

        console.log(updatedArray)

        return updatedArray
    case 'ERROR':
        const error = action.data
        return error
    default: return state
    }
}

export const init = () => {
    return async dispatch => {
        try{
            const result = await blogService.getAll()
            dispatch({
                type: 'INIT',
                data: result
            })
        }catch(error){
            dispatch({
                type: 'ERROR',
                data: error
            })
        }
    }
}

export const add = (obj) => {
    return async dispatch => {
        try{
            const result = await blogService.postBlog(obj)
            dispatch({
                type: 'ADD',
                data: result
            })
        }catch(error){
            dispatch({
                type: 'ERROR',
                data: error
            })
        }
    }
}

export const update = (id, obj) => {
    return async dispatch => {
        try{
            const result = await blogService.likeBlog(id, obj)
            console.log(result)
            const afterupdate = await blogService.getAll()
            dispatch({
                type: 'UPDATE',
                data: afterupdate
            })
        }catch(error){
            dispatch({
                type: 'ERROR',
                data: error
            })
        }
    }
}

export const deleteWithID = (id) => {
    return async dispatch => {
        try{
            const result = await blogService.deleteBlog(id)
            console.log(result)
            const after = await blogService.getAll()
            dispatch({
                type: 'DELETE',
                data: after
            })
        }catch(error){
            dispatch({
                type: 'ERROR',
                data: error
            })
        }
    }
}

export const addComment = (id, content) => {
    return async dispatch => {
        const result = await blogService.postComment(id, content)
        dispatch({
            type: 'ADD_COMMENT',
            data: result,
            id: id
        })
    }
}

const sortArray = (blog) => {
    var prep = blog
    prep = lodash.orderBy(prep, ['likes'], ['desc'])
    return prep
}

export default reducer