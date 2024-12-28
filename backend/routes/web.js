import express from 'express'
import { viewHomePage, viewLoginPage, viewProfilPage } from '../controllers/general.controller.js'
import { userLogin } from '../controllers/user.controller.js'


const router = express.Router()

router.get('/', viewHomePage)
router.get('/login', viewLoginPage)
router.get('/profil', viewProfilPage)

router.post('/user/login', userLogin)

export default router
