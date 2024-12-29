import path from 'path'
import { fileURLToPath } from 'url'
import { getAllKostData, getAllKostByKeyword } from '../repository/KostRepository.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const viewHomePage = async (req, res) => {
    let kostData = null
    try {
        kostData = await getAllKostData()
    } catch (error) {
        console.error(error)
    }

    const isUserLoggedIn = !!req.session.user

    res.render('general/index', {
        kost: kostData,
        user: {
            loginStatus: isUserLoggedIn
        }
    })
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

const viewSearchPage = async (req, res) => {
    const { keyword } = req.query

    let kostData = null
    try {
        kostData = await getAllKostByKeyword(keyword)
    } catch (error) {
        console.error(error)
    }

    const isUserLoggedIn = !!req.session.user

    res.render('renter/search', {
        kost: kostData,
        user: {
            loginStatus: isUserLoggedIn
        }
    })
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