import path from 'path'
import { fileURLToPath } from 'url'
import { getAllKostData, getSingleKostData } from '../repository/KostRepository.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const viewHomePage = async (req, res) => {
    let kostData = null
    try {
        kostData = await getAllKostData()
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })
    }

    const isUserLoggedIn = !!req.session.user

    res.render('general/index', { kost: kostData, user: { loginStatus: isUserLoggedIn } })
}

const viewLoginPage = (req, res) => {
    res.render('general/login')
}

const viewSignupPage = (req, res) => {
    res.render('general/signup')
}

const viewProfilPage = (req, res) => {
    const isUserLoggedIn = !!req.session.user

    if (!isUserLoggedIn) {
        res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'pages', 'general', '401-not-authorized.html'))
        return;
    }

    res.render('renter/profil')
}

const viewSearchPage = (req, res) => {
    const isUserLoggedIn = !!req.session.user

    res.render('renter/search', { user: { loginStatus: isUserLoggedIn }})
}

const view404PageNotFound = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'pages', 'general', '404-page-not-found.html'))
}

export {
    viewHomePage,
    viewLoginPage,
    viewSignupPage,
    viewProfilPage,
    viewSearchPage,
    view404PageNotFound
}