import React from 'react'
import propTypes from 'prop-types'


const Add = ({ submit, title, author, url }) => {

    return(
        <div className="add-form">
            <form onSubmit={submit}>
                <table>
                    <tbody>
                        <tr><td>title:</td><td><input type="text" value={title.value} name="title" onChange={title.onChange}></input></td></tr>
                        <tr><td>author:</td><td><input type="text" value={author.value} name="author" onChange={author.onChange}></input></td></tr>
                        <tr><td>url:</td><td><input type="text" value={url.value} name="url" onChange={url.onChange}></input></td></tr>
                        <tr><td><button type="submit">Create</button></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

Add.propTypes = {
    submit: propTypes.func.isRequired,
    title: propTypes.object.isRequired,
    author: propTypes.object.isRequired,
    url: propTypes.object.isRequired
}

export default Add