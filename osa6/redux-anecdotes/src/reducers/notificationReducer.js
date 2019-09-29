
const initialState = 'Notification'

const reducer = (state=initialState, action) => {

    console.log("State:", state)
    console.log("actiooooon", action.data)

    switch(action.type){
        case 'INFO_NOTI':
            const newState = `${action.data}`
            return newState
        default: return state
    }
}

export const infoCreator = (info, time) => {
    return async dispatch => {
        dispatch({
            type: 'INFO_NOTI',
            data: info,
        })
        setVisibility(time*1000)
    }
}

const setVisibility = (time) => {
    
    const notifi = document.getElementById('notification')
    notifi.style.display = 'block'

    setTimeout(()=>{
      notifi.style.display = 'none'
    }, time)
  }

export default reducer