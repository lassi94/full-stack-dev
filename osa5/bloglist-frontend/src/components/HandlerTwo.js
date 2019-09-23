import React from 'react'
import Login from './Login'
import Blog from './Blog'
import Add from './Add'
import Togglable from './Togglable'

const HandlerTwo = ({ currUser, blogs, handle, username, pass, setUser, setPass, handlePost, titleHandler, authorHandler, urlHandler, deleteBlog, handleLike }) => {

    if(currUser === undefined || currUser === null){
        return(
            <>
            <Login handleLogin={handle} setUser={setUser} setPass={setPass} username={username} password={pass} />
            </>
        )
    }else{

        if(blogs.length>0){
            //console.log(blogs)
            const arrayOfBlogs = blogs.map(item => <Blog key={item.id} blog={item} id={item.id} deleteBlog={deleteBlog} handleLike={handleLike} blogs={blogs} />)

            return(
                <>
                 <div className="add-blog">
                     <Togglable label="Show">
                         <Add submit={handlePost} title={titleHandler} author={authorHandler} url={urlHandler}/>
                     </Togglable>
                 </div>
                <div className="blogposts">
                    <div className="header">
                        <p>Blog posts</p>
                    </div>
                    <table className="blog-table">
                        {arrayOfBlogs}
                    </table>
                </div>
                </>
            )

        }

        return(
            <>
            </>
        )
    }
}

export default HandlerTwo