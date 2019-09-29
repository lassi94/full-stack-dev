import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    display: 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style} id="notification">
        {props.notification}
    </div>
  )
}
const mapState = (state) => {
    return{
      notification: state.notification
    }
}

export default connect(mapState, null)(Notification)