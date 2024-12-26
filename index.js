import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'


dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static('frontend'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'general', 'index.html'));
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running in http://localhost:${process.env.SERVER_PORT}`)
})
