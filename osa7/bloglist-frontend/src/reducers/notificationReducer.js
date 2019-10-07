/* eslint-disable no-case-declarations */

const reducer = (state='', action) => {
    switch(action.type){
    case 'INFO_NOTI':
        const content = `${action.data}`
        return content
    default:  return state
    }
}

export const info = (value, time) => {
    return async dispatch => {
        dispatch({
            type: 'INFO_NOTI',
            data: value
        })

        setVisibility(time)
    }
}

const setVisibility = (time) => {
    const notifi = document.getElementById('notification')
    notifi.style.display = 'block'

    setTimeout(() => {
        notifi.style.display = 'none'
    }, time)
}

export default reducer