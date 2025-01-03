import path from 'path'
import { fileURLToPath } from 'url'
import { getAllKostData, getAllKostByKeyword, getSingleKostDataByID } from '../repository/kost.repository.js'
import { USER_TYPE } from '../models/User.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



export const viewHomePage = async (req, res) => {
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

export const viewLoginPage = (req, res) => {
    res.render('general/login')
}

export const viewSignupPage = (req, res) => {
    res.render('general/signup')
}

export const viewProfilPage = async (req, res) => {
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

export const viewSearchPage = async (req, res) => {
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

export const viewDetailKost = async (req, res) => {
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

export const viewPengajuanSewa = (req, res) => {
    const isUserLoggedIn = !!req.session.user

    res.render('renter/pengajuan-sewa', {
        user: {
            loginStatus: isUserLoggedIn
        }
    })
}

export const view404PageNotFound = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'pages', 'general', '404-page-not-found.html'))
}
