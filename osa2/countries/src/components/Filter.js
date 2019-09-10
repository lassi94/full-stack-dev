import React from 'react'

const Filter = ({handler}) =>{
    return(
        <div className="filter">
            <p>Filter countries:</p>
            <input name="filter" placeholder="Filter countries" onChange={handler}></input>
        </div>
    )
}


export default Filter