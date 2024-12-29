import path from 'path'
import { fileURLToPath } from 'url'
import { getAllKostData, getAllKostByKeyword, getSingleKostDataByID } from '../repository/KostRepository.js'
import { USER_TYPE } from '../config/user-type.js'


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

const viewProfilPage = async (req, res) => {
    const isUserLoggedIn = !!req.session.user

    if (!isUserLoggedIn) {
        res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'pages', 'general', '401-not-authorized.html'))
        return;
    }

    let profilPage = null
    switch (req.session.user.role) {
        case USER_TYPE.penyewa:
            profilPage = 'renter/profil'
            break;
        case USER_TYPE.pemilik:
            profilPage = 'owner/profil'
            break;
        case USER_TYPE.pengelola:
            profilPage = 'manager/profil'
            break;
    }

    res.render(profilPage, {
        user: req.session.user
    })
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

const viewDetailKost = async (req, res) => {
    const kostID = req.params.id

    let kostData = null
    try {
        kostData = await getSingleKostDataByID(kostID)
    } catch (error) {
        console.error(error)
    }

    if (kostData.length == 0) {
        res.status(404)
        kostData = null
    } else {
        kostData = kostData[0]
    }

    const isUserLoggedIn = !!req.session.user


    res.render('renter/detail-kost', {
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
    viewDetailKost,
    view404PageNotFound
}