import React, { useState } from 'react'

const Togglable = (props) => {

    const [vis, setVis] = useState(false)

    const hidden = { display: vis ? 'none':'' }
    const show = { display: vis ? '':'none' }

    const toggle = () => {
        setVis(!vis)
    }

    return(
        <div className="addition">
            <div style={hidden}>
                <button onClick={toggle}>{props.label}</button>
            </div>
            <div style={show}>
                {props.children}
                <button onClick={toggle}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable