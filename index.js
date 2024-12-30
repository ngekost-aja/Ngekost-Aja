import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import webRoutes from './backend/routes/web.js'


dotenv.config()

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'frontend', 'pages'))


app.use(express.static('public'))


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



app.use('/', webRoutes)


app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running in http://${SERVER_HOST}:${SERVER_PORT}`)
})
