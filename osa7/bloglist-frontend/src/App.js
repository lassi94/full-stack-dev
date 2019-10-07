import React, { useEffect } from 'react'
import Header from './components/Header'
import Handler from './components/Handler'
import HandlerTwo from './components/HandlerTwo'
import Message from './components/Message'
import { useChange } from './hooks'
import { init, add, deleteWithID, update } from './reducers/blogReducer'
import { login, logout, setSign, check } from './reducers/userReducer'
import { connect } from 'react-redux'
import { info } from './reducers/notificationReducer'
import { setUsers } from './reducers/userStateReducer'
import MenuComp from './components/Menu'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Details from './components/Details'
import { Container } from 'semantic-ui-react'

const App = (props) => {

    const username = useChange('')
    const pass = useChange('')
    const title = useChange('')
    const author = useChange('')
    const url = useChange('')

    const handle = async (event) => {
        event.preventDefault()
        console.log("users",props.users)
        await props.login({ username: username[0].value, pass: pass[0].value })
        username[1].reset()
        pass[1].reset()
        props.init()
        console.log("hellooo", props.users)
        if(props.users === null){
            console.log("wrong username or pass")
            props.info('Wrong username or password!', 3000)
        }
    }

    const logout = () => {
        console.log("logout")
        props.logout()
    }

    const handlePost = async (event) => {

        event.preventDefault()

        const obj = {
            title: title[0].value,
            author: author[0].value,
            url: url[0].value
        }

        props.add(obj)
        url[1].reset()
        author[1].reset()
        title[1].reset()
        console.log(props.blogs)
        if(props.blogs.includes('error')){
            props.info('Post was not added!', 3000)
        }else{
            props.info(`Post ${obj.title} by ${obj.author} added`, 3000)
        }
    }

    const deleteBlog = async (id) => {

        if(window.confirm('Are you sure?')){
            console.log('Deleting...', id)
            props.deleteWithID(id)
            if(props.blogs.includes('error')){
                props.info('Could not delete post', 3000)
            }else{
                props.info('Post deleted!', 3000)
            }
        }
    }

    const handleLike = async (id, blogs) => {
        const filter = blogs.filter(item => id===item.id)
        console.log('FILTERED', filter)

        const copyObj = {
            ...filter[0],
            likes: filter[0].likes + 1
        }

        props.update(id, copyObj)
        props.info('Update successfull!', 3000)
        props.info('Could not update', 3000)
    }

    const findById = (id) => {
        return props.blogs.find(item => item.id===id)
    }

    const userById = (id) => {
        console.log(props.userCount)
        return props.userCount.find(item => item.id===id)
    }
    return (
        <Container>
            <div className="main">
                <Router>
                    <MenuComp logout={logout}/>
                    <div className="wrapper">
                        <div className="header">
                            <Header header='Blog application'/>
                            <Handler logout={logout}/>
                            <Message />
                        </div>
                        <div className="content">
                            <Route exact path="/" render={() =>
                                <HandlerTwo
                                    handle={handle}
                                    username={username}
                                    pass={pass}
                                    setUser={username}
                                    setPass={pass}
                                    handlePost={handlePost}
                                    titleHandler={title}
                                    authorHandler={author}
                                    urlHandler={url}
                                    deleteBlog={deleteBlog}
                                    handleLike={handleLike} />}/>
                            <Route exact path="/users" render={() =>
                                props.users !== null ? <Users /> :<Redirect to="/"/>}/>
                            <Route exact path='/users/:id' render={( { match } ) => <User user={userById(match.params.id)}/>}/>
                            <Route exact path='/blogs/:id' render={( { match }) => <Details blog={findById(match.params.id )}/>}/>
                        </div>
                    </div>
                </Router>
            </div>
        </Container>
    )
}

const mapState = (state) => {
    return{
        users: state.users,
        userCount: state.userCount,
        blogs: state.blogs
    }
}

const mapDispatch = {
    init,
    info,
    add,
    deleteWithID,
    update,
    login,
    logout,
    setSign,
    setUsers,
    check
}

export default connect(mapState, mapDispatch)(App)
