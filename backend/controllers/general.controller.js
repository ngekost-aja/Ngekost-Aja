import { getAllKostData, getSingleKostData } from '../repository/KostRepository.js'

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

export {
    viewHomePage,
    viewLoginPage
}