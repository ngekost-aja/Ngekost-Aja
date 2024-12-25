const express = require('express')
const app = express()
require('dotenv').config()


app.get('/', (req, res) => {
    res.send('Root')
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running in http://localhost:${process.env.SERVER_PORT}`)
})
