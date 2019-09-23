import React from 'react'
import prop from 'prop-types'

const Header = ({ header }) => {
    return(
        <>
        <h1 className="main-header">{header}</h1>
        </>
    )
}

Header.prop = {
    header: prop.func.isRequired
}


export default Header