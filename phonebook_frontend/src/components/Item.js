import React from 'react'


const Item = ({name, number, deletePer, id}) =>{

    console.log(id)

    console.log(number)

    console.log("delete", deletePer)

    return(
        <>
            <li className="item">{name} {number} <button onClick={()=>deletePer(id)}>delete</button></li>
        </>
    )
}


export default Item