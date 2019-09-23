import React from 'react'
import propTypes from 'prop-types'


const Add = ({ submit, title, author, url }) => {

    return(
        <div className="add-form">
            <form onSubmit={submit}>
                <table>
                    <tbody>
                        <tr><td>title:</td><td><input type="text" name="title" { ...title[0] }></input></td></tr>
                        <tr><td>author:</td><td><input type="text" name="author" { ...author[0] }></input></td></tr>
                        <tr><td>url:</td><td><input type="text" name="url" { ...url[0] }></input></td></tr>
                        <tr><td><button type="submit">Create</button></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

Add.propTypes = {
    submit: propTypes.func.isRequired,
    title: propTypes.array.isRequired,
    author: propTypes.array.isRequired,
    url: propTypes.array.isRequired
}

export default Add