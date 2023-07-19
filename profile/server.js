const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

const user = {
    id: 1,
    email: 'test@test.com',
    username: 'test'
}

const secretKey = 'secretKey'

app.get('/', (req, resp) => {
    resp.json({
        message: 'sample code'
    })
})

app.post('/login', verifyToken, (req, resp) => {
    const user = {
        id: 1,
        username: "null",
        email: "abc@test.com"
    }
    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
        resp.json({
            token
        })
    })
})

app.post('/profile', verifyToken, (req, resp) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            resp.send({ result: "invalid token" })
        } else {
            resp.json({
                message: "profile accessed",
                authData
            })
        }
    })
})


function verifyToken(req, resp, next){
    console.log(req.headers)
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if(bearerHeader != undefined){
        req.token = bearerHeader.split(' ')[1]
        next()
    }else{
        resp.send({
            result: 'Token is invalid'
        })
    }
}

app.listen(3000, () => console.log('app started'))