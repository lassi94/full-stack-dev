import React from 'react'
import Item from './Item'


const List = ({itemArray, deletePer}) =>{

    //console.log(itemArray)

    const array = []


    itemArray.forEach(element => {
        array.push(<Item name={element.name} number={element.num} key={element.id} id={element.id} deletePer={deletePer} />)
    });

    return(
        <div className="list">
            <ul>
                {array}
            </ul>
        </div>
    )
}

export default List