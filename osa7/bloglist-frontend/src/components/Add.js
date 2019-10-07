import React from 'react'
import propTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'


const Add = ({ submit, title, author, url }) => {

    return(
        <div className="add-form">
            <Form onSubmit={submit}>
                <Form.Field>
                    <label>Title</label>
                    <input type="text" name="title" { ...title[0] }></input>
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <input type="text" name="author" { ...author[0] }></input>
                </Form.Field>
                <Form.Field>
                    <label>Url</label>
                    <input type="text" name="url" { ...url[0] }></input>
                </Form.Field>
                <Button type="submit">Create</Button>
            </Form>
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