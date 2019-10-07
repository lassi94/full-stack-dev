const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')


router.get('/', async (req,resp,next)=>{
    try{
        const result = await Blog.find({}).populate('user', {username:1, name: 1, id: 1})
        resp.json(result)
    }catch(error){
        next(error)
    }
})

router.post('/', async (req,resp,next) => {
    try{

        const authentication = req.token

        if(authentication !== undefined){

            const verify = jsonwebtoken.verify(authentication, process.env.SECRET)

            if(!verify || !verify.id){
                return resp.status(401).json({error: 'unauthorized'})
            }

            const foundUser = await User.findById(verify.id)

            const newBlog = new Blog({
                title: req.body.title,
                author: req.body.author,
                url: req.body.url,
                user: foundUser._id
            })

            const result = await newBlog.save()
            foundUser.blogs = foundUser.blogs.concat(result._id)
            await foundUser.save()
            resp.status(201).json(result)
        }

        return resp.status(401).json({error: 'unauthorized'})

    }catch(error){
        next(error)
    }
})

router.delete('/:id', async(req, resp, next) => {

    const id = req.params.id
    console.log(id)

    const authentication = req.token
    
    if(authentication !== undefined){

        const verify = jsonwebtoken.verify(authentication, process.env.SECRET)

        if(!verify || !verify.id){
            return resp.status(401).json({error: 'unauthorized'})
        }
            try{    
                const first = await User.findById(verify.id)
                const blogs = first.blogs

                console.log(blogs)

                const authBlog = blogs.filter(item => {
                    
                    console.log(typeof id)
                    console.log(typeof item.toString())
                    
                    
                    return item.toString() === id
                
                })
                
                console.log(authBlog)

                if(!(authBlog.length === 0)){

                        try{
                            const result = await Blog.findByIdAndDelete(id)
                    
                            if(result === null){
                                resp.status(404).json({error: 'not found'})
                            }else{
                                resp.status(200).json({success: 'item deleted', item: result})
                            }
                            
                        }catch(error){
                            console.log(error)
                            next(error)
                        }
                    }

                return resp.status(401).json({error: 'unauthorized'})

            }catch(error){
                next(error)
            }
        }
})

router.get('/:id', async (req,resp,next) => {

    const reqId = req.params.id
    console.log(reqId)

    try{
        const result = await Blog.findById(reqId)
        resp.status(200).send(result)
    }catch(error){
        console.log(error)
        next(error)
    }
    
})

router.put('/:id', async (req, resp, next) =>  {

    const id = req.params.id
    const body = req.body.likes

    console.log(body)
    
    try{
        const result = await Blog.findByIdAndUpdate(id, {likes: body}, {new: true})
        resp.status(200).send(result)
    }catch(error){
        next(error)
    }
})

router.get('/user/:id', async (req, resp, next) => {

    const id = req.params.id
    console.log(id)

    const authentication = req.token

    if(authentication !== undefined){

        const verify = jsonwebtoken.verify(authentication, process.env.SECRET)

        if(!verify || !verify.id){
            return resp.status(401).json({e})
        }
        try{
            

            const result = await User.findById(verify.id).populate('blogs', {title: 1, author: 1, url:1, likes: 1})

            console.log(result)

            resp.status(200).json(result.blogs)

        }catch(error){
            next(error)
        }
    }
})

router.put('/:id/comments', async (req, resp, next) => {

    const id = req.params.id
    const body = req.body.content
    console.log("helloo", body)


    try{

        const authentication = req.token

        if(authentication !== undefined){

            const verify = jsonwebtoken.verify(authentication, process.env.SECRET)

            if(!verify || !verify.id){
                return resp.status(401).json({error: 'unauthorized'})
            }

            const blog = await Blog.findById(id)

            const newComment = {
                content: body
            }
            
            console.log(blog.comments)
            const commentsOfBlog = blog.comments.concat(newComment)

            console.log(commentsOfBlog)

            const result = await Blog.findByIdAndUpdate(id, {comments: commentsOfBlog}, {new: true})
            resp.status(200).json(result)
        }

        return resp.status(401).json({error: 'unauthorized'})

    }catch(error){
        next(error)
    }
})


/*
router.get('/', (req, resp, next) => {
     Blog.find({}).then(item => {
        resp.json(item)
    }).catch(error => next(error))
})

router.post('/', (req, resp, next) => {
    const body = req.body

    if(body){

        const blog = new Blog(body)

        blog.save().then(item=>{
            resp.status(201).json(item)
        }).catch(error => next(error))
    }
})*/

module.exports = router