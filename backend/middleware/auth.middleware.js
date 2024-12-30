import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const checkUserAuth = role => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).sendFile(path.join(__dirname, '..', '..', 'frontend', 'pages', 'general', '401-not-authorized.html'))
        }

        if (req.session.user.role !== role) {
            return res.status(403).sendFile(path.join(__dirname, '..', '..', 'frontend', 'pages', 'general', '403-forbidden.html'))
        }

        next()
    }
}

export {
    checkUserAuth
}
