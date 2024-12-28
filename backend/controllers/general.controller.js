import { getAllKostData, getSingleKostData } from '../repository/KostRepository.js'

const viewHomePage = async (req, res) => {
    let data = null
    try {
        data = await getAllKostData()
    } catch (error) {
        return res.status(500).json({
            message: "server error!"
        })
    }

    res.render('general/index', { data: data})
}

const viewLoginPage = (req, res) => {
    res.render('general/login')
}

export {
    viewHomePage,
    viewLoginPage
}