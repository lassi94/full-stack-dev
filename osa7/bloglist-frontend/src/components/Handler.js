import React from 'react'
import Header from './Header'
import prop from 'prop-types'
import { connect } from 'react-redux'

const Handler = (props) => {

    if(props.users === undefined || props.users === null || props.users === ''){
        return(
            <>
                <Header header='Please login'/>
            </>
        )
    }else{
        return(
            <>
                <Header header="Welcome!"/>
            </>
        )
    }
}

/* <div className="info">
                    <p>You are logged in as {props.users.username}</p>
                    <Button type="submit" onClick={props.logout}>Logout</Button>
</div> */

Handler.prop = {
    logout: prop.func.isRequired
}

const mapState = (state) => {
    return{
        users: state.users
    }
}

export default connect(mapState, null)(Handler)