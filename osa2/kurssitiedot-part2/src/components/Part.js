import React from 'react'

const Part = ({courseProps}) =>{

    return(
        <div className="part">
            <p className="name">{courseProps.name} {courseProps.ex}</p>
        </div>
    )
}

export default Part