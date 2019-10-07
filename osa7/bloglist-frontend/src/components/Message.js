import React from 'react'
import { connect } from 'react-redux'

const Message = (props) => {

    if(props.notification !== null || undefined){
        return(
            <>
                <div className="message" id="notification">
                    <p>{props.notification}</p>
                </div>
            </>
        )
    }
}

const mapState = (state) => {
    return{
        notification: state.notification
    }
}

export default connect(mapState, null)(Message)