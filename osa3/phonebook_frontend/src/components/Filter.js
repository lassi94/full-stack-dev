import React from 'react'

const Filter = ({filterHandler}) =>{
    return(
        <div className="filter">
            <p>Filter with:</p>
            <input name="filter" placeholder="Filter" onChange={filterHandler}></input>
        </div>
    )
}

export default Filter