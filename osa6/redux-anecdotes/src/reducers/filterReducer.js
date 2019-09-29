

const filterReducer = (state={state: 'SHOW_ALL', show: ''}, action) => {
    switch(action.type){
        case 'SHOW_ALL':
            return state
        case 'FILTER':
            state = {state: 'FILTER', show: action.data}
            return state
        default: return state
    }
}

export const filterCreator = (passedData) => {
    return{
        type: 'FILTER',
        data: passedData
    }
}

export default filterReducer