import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Header from './components/Header'
import Handler from './components/Handler'
import HandlerTwo from './components/HandlerTwo'
import Message from './components/Message'
import lodash from 'lodash'
import { useChange } from './hooks'

const App = () => {

    const [blog, setBLog] = useState([])
    const [currUser, setUser] = useState(null)
    const [message, setMessage] = useState('')

    const username = useChange('')
    const pass = useChange('')
    const title = useChange('')
    const author = useChange('')
    const url = useChange('')

    //without custom hooks

    //const [username, setUsername] = useState('')
    //const [pass, setPass] = useState('')
    //const [title, setTitle] = useState('')
    //const [author, setAuthor] = useState('')
    //const [url, setUrl] = useState('')


    const sortArray = (blog) => {
        var prep = blog
        prep = lodash.orderBy(prep, ['likes'], ['desc'])
        return prep
    }

    async function fetch() {
        let result = await blogService.getAll()
        let sorted = sortArray(result)
        setBLog(sorted.map(item => item))
    }

    useEffect(() => {
        const local = window.localStorage.getItem('signed-in')
        console.log('Here is the value: ', local)

        if(local){
            const current = JSON.parse(local)
            console.log(current)
            setUser(current)
            blogService.setJWT(current.sign)

            fetch(current)
        }

    }, [])

    const handle = async (event) => {
        event.preventDefault()

        try{
            const result = await loginService.login({ username, pass })
            if(result !== null){

                localStorage.setItem('signed-in', JSON.stringify(result))
                blogService.setJWT(result.sign)
                setUser(result)
                username.reset()
                pass.reset()

                const blogs = await blogService.getAll()
                setBLog(sortArray(blogs))
            }

        }catch(error){
            setMessage('Wrong username or password!')

            setTimeout(() => {
                setMessage('')
            }, 3000)
        }

    }

    const logout = () => {
        localStorage.removeItem('signed-in')
        blogService.setJWT(null)
        setUser(null)
    }

    const handlePost = async (event) => {

        event.preventDefault()

        const obj = {
            title: title.value,
            author: author.value,
            url: url.value
        }

        try{

            await blogService.postBlog(obj)
            setMessage(`Post ${obj.title} by ${obj.author} added`)
            setTimeout(() => {
                setMessage('')
                console.log(url)
                console.log(author)
                console.log(title)
            }, 3000)

            url.reset()
            author.reset()
            title.reset()


        }catch(error){

            setMessage('Post was not added!')

            setTimeout(() => {
                setMessage('')
            }, 3000)
        }

        try{
            const newBlogs = await blogService.getAll()
            setBLog(sortArray(newBlogs.map(item => item)))

        }catch(error){
            console.log(error)
        }
    }

    const deleteBlog = async (id) => {

        if(window.confirm('Are you sure?')){
            console.log('Deleting...', id)
            try{
                await blogService.deleteBlog(id)
                const newBlogs = await blogService.getAll()
                setBLog(sortArray(newBlogs.map(item => item)))

                setMessage('Post deleted!')
                setTimeout(() => {
                    setMessage('')
                }, 3000)
            }catch(error){
                setMessage('Could not delete post')
                setTimeout(() => {
                    setMessage('')
                }, 3000)
            }
        }
    }

    const handleLike = async (id, blogs) => {
        try{
            const filter = blogs.filter(item => id===item.id)
            console.log('FILTERED', filter)

            const copyObj = {
                ...filter[0],
                likes: filter[0].likes + 1
            }

            await blogService.likeBlog(id, copyObj)

            const result = await blogService.getAll()
            setBLog(sortArray(result.map(item => item)))

            setMessage('Update successfull!')

            setTimeout(() => {
                setMessage('')
            }, 3000)

        }catch(error){
            setMessage('Could not update')

            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }
    //without hooks
    /*
    const userHandler = (event) => {
        setUsername(event.target.value)
    }

    const passHandler = (event) => {
        setPass(event.target.value)
    }

    const titleHandler = (event) => {
        setTitle(event.target.value)
    }

    const authorHandler = (event) => {
        setAuthor(event.target.value)
    }

    const urlHandler = (event) => {
        setUrl(event.target.value)
    }*/


    return (
        <div className="main">
            <div className="wrapper">
                <div className="header">
                    <Header header='Blog application'/>
                    <Handler currentUser={currUser} logout={logout}/>
                    <Message message={message} />
                </div>
                <div className="login">
                    <HandlerTwo
                        currUser={currUser}
                        blogs={blog} handle={handle}
                        username={username}
                        pass={pass}
                        setUser={username}
                        setPass={pass}
                        handlePost={handlePost}
                        titleHandler={title}
                        authorHandler={author}
                        urlHandler={url}
                        deleteBlog={deleteBlog}
                        handleLike={handleLike} />
                </div>
            </div>
        </div>
    )
}

export default App
