/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state='', action) => {
    switch(action.type){
    case 'LOGIN':
        console.log(action.data)
        const newstate = action.data
        console.log(newstate)
        return newstate
    case 'SET':
        const sign = action.data
        return sign
    case 'LOGOUT':
        const logout = action.data
        return logout
    case 'CHECK':
        const check = action.data
        console.log(check)
        return check
    default: return state
    }
}

export const login = (obj) => {
    return async dispatch => {
        try{
            const result = await loginService.login(obj)
            if(result !== null){
                localStorage.setItem('signed-in', JSON.stringify(result))
                blogService.setJWT(result.sign)
                console.log(result.sign)
                dispatch({
                    type: 'LOGIN',
                    data: result
                })
            }
        }catch(error){
            console.log("helo", error)
            dispatch({
                type: 'LOGOUT',
                data: null
            })
        }
    }

}

export const setSign = (current) => {
    return async dispatch => {
        blogService.setJWT(current.sign)
        dispatch({
            type: 'SET',
            data: current
        })
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('signed-in')
        blogService.setJWT(null)
        dispatch({
            type: 'LOGOUT',
            data: null
        })
    }
}

export const check = () => {
    return async dispatch => {
        const result = localStorage.getItem('signed-in')
        console.log("result", result)
        if(result !== null){
            const check = JSON.parse(result)
            blogService.setJWT(check.sign)
            dispatch({
                type: 'CHECK',
                data: check
            })
        }
    }
}



export default reducer