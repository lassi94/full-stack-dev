const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRoute = require('express').Router()



userRoute.get('/', async (req, resp, next) => {
    try{
        const result = await User.find({}).populate('blogs', {id:1, title:1, url: 1})
        resp.json(result)
    }catch(error){
        next(error)
    }
})

userRoute.post('/', async (req, resp, next) => {
    try{
        const body = req.body

        console.log(body)

        if( (body.password.length >= 8) && body.username ){

            const hash = await bcrypt.hash(body.password, 10)

            const newUser = new User({
                username: body.username,
                name: body.name,
                passwordHash: hash
            })
    
            const result = await newUser.save()
    
            resp.json(result)
        }

        return resp.status(400).send({error: 'password is missing or its too short'})

    }catch(error){
        next(error)
    }
})

module.exports = userRoute

