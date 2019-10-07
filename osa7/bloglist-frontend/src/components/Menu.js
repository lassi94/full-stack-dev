import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userStateReducer'

const MenuComp = (props) => {

    useEffect(() => {
        props.setUser()
    },[])

    if(props.users === null || props.users === undefined || props.users === ''){
        return(
            <Menu pointing>
                <Menu.Item as={ Link } name='Users' to="/users"></Menu.Item>
                <Menu.Item as={ Link } name='Blogs' to="/"></Menu.Item>
            </Menu>)
    }else{
        return(
            <Menu pointing>
                <Menu.Item as={ Link } name='Users' to="/users"></Menu.Item>
                <Menu.Item as={ Link } name='Blogs' to="/"></Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        {props.users.username}
                    </Menu.Item>
                    <Menu.Item>
                        <Button type="submit" onClick={props.logout}>Logout</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapState = (state) => {
    return{
        users: state.users
    }
}

const mapDispatch = {
    setUser
}

export default connect(mapState, mapDispatch)(MenuComp)