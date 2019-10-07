import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'

const Blog = ({ blog, deleteBlog, id }) => {

    const check = () => {
        const user = localStorage.getItem('signed-in')
        if(user!==undefined){
            const result = JSON.parse(user)
            if(blog.user===undefined){
                return false
            }else if(blog.user.username===result.username){
                return true
            }else{
                return false
            }
        }
        return false
    }


    return(
        <Table.Row><Table.Cell className="click"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell><Table.Cell>{blog.author}</Table.Cell><Table.Cell>{check()?<Button onClick={() => deleteBlog(id)}>Delete</Button>:''}</Table.Cell></Table.Row>
    )
}

export default Blog
