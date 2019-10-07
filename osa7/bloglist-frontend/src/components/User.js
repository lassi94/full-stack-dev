import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { List, Segment } from 'semantic-ui-react'
import { check } from '../reducers/userReducer'
import { setUser } from '../reducers/userStateReducer'

const User = (props) => {

    useEffect(() => {
        props.check()
        props.setUser()
    }, [])

    //const found = userById(id)

    console.log("FOUND", props.user)

    if(props.user === undefined || props.user === null || props.user === ''){
        console.log("HELLOO")
        return null
    }else if(props.user.blogs.length > 0){
        return(
            <div className="user">
                <h2>{props.user.name}</h2>
                <h3>Added blogs</h3>
                <Segment inverted>
                    <List divided inverted relaxed>
                        {props.user.blogs.map(item =>
                            <List.Item key={item.id}><List.Content as={ Link } to={`/blogs/${item.id}`}>{item.title}</List.Content></List.Item>)}
                    </List>
                </Segment>
            </div>
        )
    }else if(props.user.blogs.length === 0){
        return(
            <div className="user">
                <h2>{props.user.name}</h2>
                <p>User has no blogs</p>
            </div>
        )
    }
}

const mapDispatch = {
    check,
    setUser
}


export default connect(null, mapDispatch)(User)