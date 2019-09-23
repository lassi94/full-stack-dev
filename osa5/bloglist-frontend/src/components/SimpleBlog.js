import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div>
        <div>
            <div className="title">{blog.title}</div>
            <div className="author">{blog.author}</div>
        </div>
        <div className="likes">
            blog has {blog.likes} likes
            <button className="button" onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog