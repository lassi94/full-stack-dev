import React from 'react'
import { filterCreator } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    //const store = props.store

    const handler = (event) => {
        const value = event.target.value
        props.filterCreator(value)
    }

    return(
        <div className="filter">
            <div className="input">
                <input type="text" name='filter' onChange={handler}></input>
            </div>
        </div>
    )
}


export default connect(null, { filterCreator })(Filter)