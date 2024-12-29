import bcrypt from 'bcrypt'
import { getUserByEmail } from '../repository/UserRepository.js'



const checkUserAuth = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "user don't have the appropriate session ID"
        })
    }

    res.status(200).json({
        message: "user have valid session ID",
    })
}

const userLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "email or password field is missing"
        })
    }

    try {
        const result = await getUserByEmail(email)

        if (result.length === 0) {
            return res.status(404).json({
                message: "data not found"
            })
        }

        const isMatch = await bcrypt.compare(password, result[0]['password'])

        if (!isMatch) {
            return res.status(401).json({
                message: "password is invalid"
            })
        }


        req.session.user = {
            id: result[0]['email'],
            username: result[0]['nama'],
            password: result[0]['password'],
            role: result[0]['role']
        }
        res.status(200).json({
            message: "success",
            redirect: '/profil'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "database server error!",
        })
    }
}

const userLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' })
        }
        res.clearCookie('SESSION_ID_NGEKOST_AJA')
        res.status(200).json({ message: 'Logout successful' })
    })
}

export {
    checkUserAuth,
    userLogin,
    userLogout
}
