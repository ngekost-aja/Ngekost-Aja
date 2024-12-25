const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')


dotenv.config()


app.use(express.static('frontend'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'general', 'index.html'));
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running in http://localhost:${process.env.SERVER_PORT}`)
})
