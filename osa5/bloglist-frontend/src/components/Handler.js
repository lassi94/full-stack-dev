import React from 'react'
import Header from './Header'
import prop from 'prop-types'

const Handler = ({ currentUser, logout }) => {

    if(currentUser === undefined || currentUser === null){
        return(
            <>
                <Header header='Please login'/>
            </>
        )
    }else{
        return(
            <>
                <div className="info">
                    <p>You are logged in as {currentUser.username}</p>
                    <button type="submit" onClick={logout}>Logout</button>
                </div>
            </>
        )
    }
}

Handler.prop = {
    currentUser: prop.func.isRequired,
    logout: prop.func.isRequired
}

export default Handler