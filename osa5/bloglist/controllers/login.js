const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')


loginRouter.post('/', async (req, resp, next) => {

    try{
        const body = req.body

        console.log(body.username)
        console.log(body.pass)

        const user = await User.findOne({username:body.username})

        if(user){
            const cmp = await bcrypt.compare(body.pass, user.passwordHash)
            if(cmp !== false){
                const tokenProps = {
                    id: user.id,
                    username: user.username
                }
                const sign = jsonwebtoken.sign(tokenProps, process.env.SECRET)
                return resp.status(200).json({username: tokenProps.username, id: tokenProps.id, sign})
            }

            return resp.status(401).json({error: 'Wrong username or password'})
        }

        return resp.status(401).json({error: 'Wrong username or password'})
    
    }catch(error){
        next(error)
    }
})

module.exports = loginRouter