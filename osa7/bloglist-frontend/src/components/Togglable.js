import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

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
                <Button type="button" onClick={toggle}>{props.label}</Button>
            </div>
            <div style={show}>
                {props.children}
                <Button type="button" onClick={toggle}>Cancel</Button>
            </div>
        </div>
    )
}

export default Togglable