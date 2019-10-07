import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { update, addComment } from '../reducers/blogReducer'
import { info } from '../reducers/notificationReducer'
import { Button, Item, Icon, Form } from 'semantic-ui-react'
import Comment from './Comment'
import { check } from '../reducers/userReducer'

const Details = (props) => {

    console.log("BLOG", props.blog)
    const [value, setValue] = useState('')

    useEffect(() => {
        props.check()
    }, [])

    const handleLike = async (id, blogs) => {
        const filter = blogs.filter(item => id===item.id)
        console.log('FILTERED', filter)

        const copyObj = {
            ...filter[0],
            likes: filter[0].likes + 1
        }

        props.update(id, copyObj)
        props.info('Update successfull!', 3000)
        //props.info('Could not update', 3000)
    }

    const handler = async (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setValue(event.target.value)

    }

    const submitComment = async (event) => {
        event.preventDefault()
        const content = {
            content: value
        }
        props.addComment(props.blog.id, content)
        props.info('Comment added successfully!', 3000)
        console.log("IIIDEEE")
    }


    if(props.blog===undefined){
        console.log("UNDEFINED")
        return(
            null
        )
    }else if(props.blog.comments !== undefined && props.blog.comments !== null ){
        console.log("RENDERED", props.blog.comments)
        return(
            <div className="blog">
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Meta>Title</Item.Meta>
                            <Item.Header>{props.blog.title}</Item.Header>
                            <Item.Meta>Url for more info</Item.Meta>
                            <Item.Description>{props.blog.url}</Item.Description>
                            <Item.Extra>
                                <Icon color='green' name='check' /> {props.blog.likes}
                                <Button onClick={() => handleLike(props.blog.id,props.blogs)}>Like</Button>
                            </Item.Extra>
                            <Item.Meta>Comments</Item.Meta>
                            <Form onSubmit={submitComment}>
                                <Form.Field>
                                    <input placeholder="Add a comment..." name="content" onChange={(event) => handler(event)}></input>
                                    <Button type="submit">Comment</Button>
                                </Form.Field>
                            </Form>
                            {props.blog.comments.map(item => <Item.Description key={item._id}>{item.content}</Item.Description>)}
                        </Item.Content>
                    </Item>
                </Item.Group>
                <Comment />
            </div>
        )
    }else{
        return(
            <div className="blog">
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Meta>Title</Item.Meta>
                            <Item.Header>{props.blog.title}</Item.Header>
                            <Item.Meta>Url for more info</Item.Meta>
                            <Item.Description>{props.blog.url}</Item.Description>
                            <Item.Extra>
                                <Icon color='green' name='check' /> {props.blog.likes}
                                <Button onClick={() => handleLike(props.blog.id,props.blogs)}>Like</Button>
                            </Item.Extra>
                            <Item.Meta>Comments</Item.Meta>
                            <Item.Description>No comments</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
                <Comment/>
            </div>)
    }
}

const mapState = (state) => {
    return{
        blogs: state.blogs
    }
}

const mapDispatch = {
    update,
    info,
    addComment,
    check
}

export default connect(mapState, mapDispatch)(Details)