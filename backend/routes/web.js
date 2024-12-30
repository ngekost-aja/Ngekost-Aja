import express from 'express'
import { view404PageNotFound, viewDetailKost, viewHomePage, viewLoginPage, viewProfilPage, viewSearchPage, viewSignupPage } from '../controllers/general.controller.js'
import { userLogin, userLogout } from '../controllers/user.controller.js'
import { viewDashboard, viewPengelola, viewTambahAset, viewTambahPengelola } from '../controllers/owner.controller.js'


const router = express.Router()

router.get('/', viewHomePage)
router.get('/login', viewLoginPage)
router.get('/signup', viewSignupPage)
router.get('/profil', viewProfilPage)
router.get('/search', viewSearchPage)
router.get('/detail-kost/:id', viewDetailKost)

router.post('/user/login', userLogin)
router.post('/logout', userLogout)


router.get('/dashboard', viewDashboard)
router.get('/pengelola', viewPengelola)
router.get('/tambah-aset', viewTambahAset)
router.get('/tambah-pengelola', viewTambahPengelola)


router.get('/*', view404PageNotFound)

export default router
