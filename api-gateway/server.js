
const gateway = require('fast-gateway')
const PORT = 9001;

const checkAuth = (req, res, next) => {
    if (req.headers.tokens && req.headers.tokens != '') {
        next()
    } else {
        res.setHeader('content-type', 'application/json')
        res.statusCode = 401;
        res.end(JSON.stringify({status:401,message:'Authentication Fail'}))
    }
}

const server = gateway({
    routes: [
        {
            prefix: '/order',
            target: 'http://localhost:8081/',
            hooks: {
            }
        },
        {
            prefix: '/pmt',
            target: 'http://localhost:8082/', 
            methods: ['GET','POST'],
            hooks: {
            }
        }
    ]
})

server.get('/mytesting',(req, res) => res.send('yes called gateway'))

server.start(PORT).then(server => {
    console.log(`Api Gateway Service is running at http://localhost:${PORT}`)
})