import React from 'react'

const Form = ({addPerson, handler}) =>{
    return(
        <div className="form">
            <form onSubmit={addPerson}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input name="email" onChange={handler}></input></td>
                        </tr>
                        <tr>
                            <td>Number:</td>
                            <td><input name="num" onChange={handler}></input></td>
                        </tr>
                        <tr>
                            <td><button type="submit">Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        
    )
}

export default Form