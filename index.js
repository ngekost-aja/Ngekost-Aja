import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import apiRoutes from './backend/routes/api.js'


dotenv.config()

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 8000
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static('frontend'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'general', 'index.html'));
})

app.use('/api', apiRoutes)

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running in http://${SERVER_HOST}:${SERVER_PORT}`)
})
