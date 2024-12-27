import express from 'express'
import session from 'express-session'
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET || 'not_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.ENV === 'production',   
        httpOnly: true,
        sameSite: 'strict',
    },
    name: 'SESSION_ID_NGEKOST_AJA',
    rolling: true,
}))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'general', 'index.html'));
})

app.use('/api', apiRoutes)

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running in http://${SERVER_HOST}:${SERVER_PORT}`)
})
