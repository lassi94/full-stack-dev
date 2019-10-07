import React, { useEffect } from 'react'
import Login from './Login'
import Blog from './Blog'
import Add from './Add'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { init } from '../reducers/blogReducer'
import { setSign, check } from '../reducers/userReducer'
import { Table } from 'semantic-ui-react'

const HandlerTwo = (props) => {

    useEffect(() => {
        props.check()
        props.init()
    }, [])

    console.log("HANDLERuses",props.users)
    console.log(typeof(props.users))
    if(props.users === undefined || props.users === null || props.users === ''){
        console.log("RENDERED")
        return(
            <>
            <Login handleLogin={props.handle} setUser={props.setUser} setPass={props.setPass} username={props.username} password={props.pass} />
            </>
        )
    }else{
        console.log(props.blogs)
        if(props.blogs.length>0){
            //console.log(blogs)
            const arrayOfBlogs = props.blogs.map(item => <Blog key={item.id} blog={item} id={item.id} deleteBlog={props.deleteBlog} />)

            return(
                <>
                 <div className="add-blog">
                     <Togglable label="Show">
                         <Add submit={props.handlePost} title={props.titleHandler} author={props.authorHandler} url={props.urlHandler}/>
                     </Togglable>
                 </div>
                <div className="blogposts">
                    <div className="header">
                        <h2>Blog posts</h2>
                    </div>
                    <Table striped celled>
                        <Table.Body>
                            {arrayOfBlogs}
                        </Table.Body>
                    </Table>
                </div>
                </>
            )

        }

        return(
            <>
            </>
        )
    }
}

const mapState = (state) => {
    return{
        blogs: state.blogs,
        users: state.users
    }
}

const mapDispatch = {
    init,
    setSign, check
}

export default connect(mapState, mapDispatch)(HandlerTwo)