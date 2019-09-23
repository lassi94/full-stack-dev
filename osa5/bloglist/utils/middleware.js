

const getAuth = (req, resp, next) => {

    const auth = req.get('authorization')

    if(!auth || !auth.toLowerCase().startsWith('bearer')){
        return resp.status(401).json({error: 'unauthorized'})
    }

    const tokenReq = auth.substring(7)

    console.log(tokenReq)

    req.token = tokenReq

    console.log("request token", req.token)

    next()
}

const errorHandler = (req, resp, ) => {

   resp.status(404).send({error: 'not found'})
}

const validation = (error, req, resp, next) => {
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return resp.status(400).send({ error: 'malformatted id' })
    }
    if(error.name==='ValidationError'){
        resp.status(400).send({error: 'missing data'})
    }

    next(error)
}

const webtokenError = (error, req, resp, next) => {
    if(error.name==="JsonWebTokenError"){
        return resp.status(401).json({error: "token missing"})
    }
    next(error)
}

module.exports = {
    errorHandler,
    validation,
    webtokenError,
    getAuth
}