const express = require('express')
const app = express()
const PORT = 8082;
app.get('/payment-list', (req, res) => {
    let response = {
        data: {
            iteam: [
                {
                    id:1,name:'payment 1'
                },
                {
                    id:2,name:'payment 2'
                }
            ]
        }
    }
    res.status(200).json(response)
})

app.get('/',(req, res)=> {
    res.status(200).json({ message: "payment called" })
})

app.get('/add',(req, res)=> {
    res.status(200).json({ message: "add payment called" })
})


app.listen(PORT, () => {
    console.log(`Payment Service is listning at http://localhost:${PORT}/payment-list/`)
})