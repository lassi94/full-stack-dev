import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, id, handleLike, blogs }) => {

    const [info, setInfo] = useState(false)

    const show = {
        display: info ? '':'none'
    }

    const toggleInfo = () => {

        console.log('EVENT')
        console.log(info)

        setInfo(!info)
    }

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
        <tbody className="item">
            <tr><td className="click" onClick={() => toggleInfo()}>{blog.title}</td><td>{blog.author}</td><td>{check()?<button onClick={() => deleteBlog(id)}>Delete</button>:''}</td></tr>
            <tr className="hidden" style={show}><td>url: {blog.url}</td><td>likes: {blog.likes}</td><td><button onClick={() => handleLike(id,blogs)}>Like</button></td></tr>
            <tr className="hidden" style={show}><td><div>Added by: {blog.user!==undefined?blog.user.username:'Not shown'}</div></td></tr>
        </tbody>
    )
}

export default Blog
