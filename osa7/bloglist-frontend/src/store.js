import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import userStateReducer from './reducers/userStateReducer'

const store = createStore(combineReducers({
    blogs: blogReducer,
    users: userReducer,
    notification: notificationReducer,
    userCount: userStateReducer

}), applyMiddleware(thunk))

export default store